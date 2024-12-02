import * as path from "path";
const Datastore = require("nedb"); 

export interface IItem{
    _id?: number, name: string, description?: string, imagePath?: string, email: string
}

export class Worker{
    private db: Nedb;

    constructor(){
        this.db = new Datastore({ 
            filename: path.join(__dirname, "LostItems.db"),
            autoload: true
        });
    }

    public listItems(): Promise<IItem[]> {
        return new Promise((inResolve, inReject) => {
            this.db.find({ }, 
                (inError: Error | null, inDocs: IItem[]) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inDocs);
                    }
                }
            );
        });
    }

    public addItem(inItem: IItem): Promise<IItem> {
        return new Promise((inResolve, inReject) =>{
            this.db.insert(inItem, 
                (inError: Error | null, inNewDoc: IItem) => {
                    if(inError) {
                        inReject(inError);
                    } else {
                        inResolve(inNewDoc);
                    }
                }
            );
        });
    }

    public deleteItem(inID: string): Promise<void> {
        return new Promise((inResolve, inReject) =>{
            this.db.remove({_id : inID}, { }, 
                (inError: Error | null, inNumRemoved: number) => {
                    if(inError){
                        inReject(inError);
                    } else {
                        inResolve();
                    }
                }
            );
        });
    }
}