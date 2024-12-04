// Library imports.
import axios, { AxiosResponse } from "axios";

// App imports.
import { config } from "./config";

//Note that we'll only have an _id field when retrieving or adding, so
// it has to be optional.
export interface IItem{
    _id?: number, name: string, description?: string, imagePath?: string, email: string
}

export class Worker {
    
  public async listItems(): Promise<IItem[]> {

    console.log("Items.Worker.listItems()");

    const response: AxiosResponse = await axios.get(`${config.serverAddress}/lost-items`);
    return response.data;

  } 

  public async addItem(inItem: IItem): Promise<IItem> {

    console.log("Items.Worker.addItem()", inItem);

    const response: AxiosResponse = await axios.post(`${config.serverAddress}/lost-items`, inItem);
    return response.data;

  } 

  public async deleteItem(inID): Promise<void> {

    console.log("Items.Worker.deleteItem()", inID);

    await axios.delete(`${config.serverAddress}/lost-items/${inID}`);

  } 

} 