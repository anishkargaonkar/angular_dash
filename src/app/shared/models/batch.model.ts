// Document Model
export class Document {
    constructor(
        public set_id: number,
        public doc_id: number,
        public name: string,
        public status: string,
        public uploader: string,
        public preview_url: string,
        public date_uploaded: Date) { }
}

// Batch Model
export class  Batch {
    public set_id: number;
    public name: string;
    public status: string;
    public documents: Document[];
    public date_uploaded: string;

    constructor (
    set_id: number,
    name: string,
    status: string,
    documents: Document[],
    date_uploaded: string
    ) {
        this.set_id = set_id;
        this.name = name;
        this.status = status;
        this.documents = documents;
        this.date_uploaded = date_uploaded
     }
}

