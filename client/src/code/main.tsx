// Style imports
import "normalize.css";
import "../css/main.css";
// React imports
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App"
//import BaseLayout from "./components/BaseLayout";
import * as Items from "./LostItems";
import BaseLayout from "./components/BaseLayout";


const baseComponent = ReactDOM.render(<BaseLayout />, document.body);

//baseComponent.state.showHidePleaseWait(true);

async function getLostItems() {
    const itemsWorker: Items.Worker = new Items.Worker();
    const items: Items.IItem[] = await itemsWorker.listItems();
    items.forEach((inItem) => {
      baseComponent.state.addItemToList(inItem);
    });
}

getLostItems().then();

//() => baseComponent.state.showHidePleaseWait(false)
