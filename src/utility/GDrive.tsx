import 'whatwg-fetch';
import {Log} from "../logging/Log"

export class GDrive {
    public static driveApiUrl: string = "https://content.googleapis.com/drive/v3/files";
    public static imageFileUrl: string = "https://lh3.googleusercontent.com/u/0/d/";
    public static log: Log = new Log(GDrive.name);

    public static getFileList(apiKey: string, rootId?: string, mimeType?: string): Promise<IGDrive|void> {
        GDrive.log.debug("Searching for files under folder:" + rootId);
        const folder: string = "'" + rootId + "' in parents";
        return window.fetch(this.driveApiUrl + "?q=" + folder + "&corpora=user&key=" + apiKey)
            .then(this.checkResponseStatusCode)
            .then(this.readFileListResponse)
            .catch(this.getFileListFail);

    }

    public static mapGDriveFileToURLStringArray = (gdriveFile:IGDriveFile) => {
      return gdriveFile.url;
    };


    private static checkResponseStatusCode = (data: Response): Promise<string> => {
        if (data.status === 200) {
            GDrive.log.debug("Received Success Response:" + data.status);
            return data.text();
        } else {
            GDrive.log.debug("Error response from Google: " + data.status);
            return Promise.reject("Error response from Google: " + data.status);
        }
    };

    private static getFileListFail = (err: Error): void => {
        if (null != err) {
            GDrive.log.error("Failed to retrieve google list: " + err);
            throw new Error("Failed to retrieve google list: " + err);
        }
        return;
    };

    private static readFileListResponse = (jsonString: string): Promise<IGDrive> => {
        if (jsonString !== null) {
            const jsonObj = JSON.parse(jsonString);
            if (jsonObj.files && jsonObj.files.length > 0) {
                const response:IGDrive = {
                    files: jsonObj.files.map(
                        (file: IGDriveFile) => {
                            file.url = GDrive.imageFileUrl + file.id;
                            return file;
                        }),
                    nextPageToken: jsonObj.nextPageToken
                };
                return Promise.resolve(response);
            }
        }
        return Promise.reject("Cannot get list of google files.");

    }
}

export interface IGDriveFile {
    id:string,
    name:string,
    mimeType:string,
    kind:string,
    url:string
}

export interface IGDrive {
    files:IGDriveFile[],
    nextPageToken?:string
}
