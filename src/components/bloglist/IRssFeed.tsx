export interface IFeedItem {
    [key: string]: any;
    link?: string;
    guid?: string;
    title?: string;
    pubDate?: string;
    creator?: string;
    content?: string;
    isoDate?: string;
    categories?: string[];
    contentSnippet?: string;
};

export interface IFeed {
    [key: string]: any;
    link?: string;
    title?: string;
    items: IFeedItem[];
    feedUrl?: string;
    description?: string;
    itunes?: {
        [key: string]: any;
        image?: string;
        owner?: {
            name?: string;
            email?: string;
        };
        author?: string;
        summary?: string;
        explicit?: string;
    };
};
