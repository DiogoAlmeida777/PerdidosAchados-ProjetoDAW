import path from "path";
import express, {Express,NextFunction,Request,Response} from "express";
import multer from "multer";
import {serverInfo} from "./serverinfo";
import * as SMTP from "./SMTP";
import * as Items from "./items";
import {IItem} from "./items";

const app: Express = express(); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname + uniqueSuffix)
    }
})
  
const upload = multer({ storage: storage })



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

app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

app.post("/notifications", async (inRequest: Request, inResponse: Response) => {
    try {
      const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
  
      // Map the body field to text
      const emailOptions = {
        to: inRequest.body.to,
        subject: inRequest.body.subject,
        text: inRequest.body.body, // Use "text" for the email content
      };
  
      await smtpWorker.sendMessage(emailOptions);
      inResponse.send("ok");
    } catch (inError) {
      console.error(inError);
      inResponse.status(500).send("error");
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

app.post("/lost-items", upload.single('image') ,async (inRequest: Request, inResponse: Response) => {
    try{
        const itemsWorker: Items.Worker = new Items.Worker();
        const {name, description, email} = inRequest.body;
        const item: IItem = {
            name,
            description,
            email,
            imagePath: inRequest.file ? `/uploads/${inRequest.file.filename}`: undefined
        }
        
        const savedItem: IItem = await itemsWorker.addItem(item);
        inResponse.json(savedItem);
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