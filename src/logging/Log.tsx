const BASE = 'rm-react-site';
const COLOURS = {
    error: 'red',
    info: 'green',
    trace: 'blue',
    warn: 'pink'
}; // choose better colours :)

export class Log {
    private readonly source:string = "unknown";
    constructor(source:string){
        this.source = source;
    }
    public generateMessage(level:string, message:string) {
        // Set the prefix which will cause debug to enable the message
        const debug = require('debug');
        const namespace = `${BASE}:${level}`;
        const createDebug = debug(namespace);

        // Set the colour of the message based on the level
        createDebug.color = COLOURS[level];

        if(this.source) { createDebug(this.source, message); }
        else { createDebug(message); }
    }

    public debug(message:string) {
        return this.generateMessage('trace', message);
    }

    public info(message:string) {
        return this.generateMessage('info', message);
    }

    public warn(message:string) {
        return this.generateMessage('warn', message);
    }

    public error(message:string) {
        return this.generateMessage('error', message);
    }
}