import path from "path";
import express, {Express,NextFunction,Request,Response} from "express";

import {serverInfo} from "./serverinfo";
import * as SMTP from "./SMTP";
import * as Items from "./items";
import {IItem} from "./items";

const app: Express = express(); 


app.use(express.json()); 

app.use("/", 
    express.static(path.join(__dirname, "../../client/dist"))
);

app.use(function(inRequest: Request, inResponse: Response, inNext: NextFunction){
    inResponse.header("Access-Control-Allow-Origin", "*"); 
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS"); 
    inResponse.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept"); 
    inNext();//chama o próximo middleware
});

app.post("/notifications", async (inRequest:Request, inResponse: Response) => {
    try{
        const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
        await smtpWorker.sendMessage(inRequest.body);
        inResponse.send("ok");
    } catch (inError){
        inResponse.send("error");
    }
});

app.get("/lost-items", async(inRequest: Request, inResponse: Response) => {
    try{
        const itemsWorker: Items.Worker = new Items.Worker();
        const items: IItem[] = await itemsWorker.listItems();
        inResponse.json(items);
    } catch(inError){
        inResponse.send("error");
    }
});

app.post("/lost-items", async (inRequest: Request, inResponse: Response) => {
    try{
        const itemsWorker: Items.Worker = new Items.Worker();
        const item: IItem = await itemsWorker.addItem(inRequest.body);
        inResponse.json(item);
    } catch(inError){
        inResponse.send("error");
    }
})

app.delete("/lost-items/:id", async(inRequest: Request, inResponse: Response) =>{
    try{
        const itemsWorker: Items.Worker = new Items.Worker();
        await itemsWorker.deleteItem(inRequest.params.id);
        inResponse.send("ok");
    } catch(inError){
        inResponse.send("error");
    }
})

app.listen(8080);