import path from "path";
import fs from "fs";

export interface IServerInfo {
    smtp : {
        host : string, port : number,
        auth: { user: string, pass: string}
    }
}

export let serverInfo: IServerInfo;

const rawInfo: string = fs.readFileSync(path.join(__dirname, "../smtpInfo/info.json"),"utf8");

serverInfo = JSON.parse(rawInfo);