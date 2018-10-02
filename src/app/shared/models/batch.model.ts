// Document Model
export class Document {
    constructor(
        public set_id: number,
        public doc_id: number,
        public name: string,
        public status: string,
        public uploader: string,
        public preview_url: string,
        public date_uploaded: string) { }
}

// Batch Model
export class  Batch {
    public id: number;
    public set_id: number;
    public name: string;
    public status: string;
    public documents: Document[];
    public date_uploaded: string;

    constructor (
    id: number,
    set_id: number,
    name: string,
    status: string,
    documents: Document[],
    date_uploaded: string
    ) {
        this.id = id;
        this.set_id = set_id;
        this.name = name;
        this.status = status;
        this.documents = documents;
        this.date_uploaded = date_uploaded
     }
}

