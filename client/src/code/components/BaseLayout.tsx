// React imports.
import React, { Component } from "react";

// Library imports.
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// App imports.
import Toolbar from "./Toolbar";
import ItemList from "./ItemList";
import ItemView from "./ItemView";
import { createState } from "../state";


/**
 * BaseLayout.
 */
class BaseLayout extends Component {


  /**
   * State data for the app.  This also includes all mutator functions for manipulating state.  That way, we only
   * ever have to pass this entire object down through props (not necessarily the best design in terms of data
   * encapsulation, but it does have the benefit of being quite a bit simpler).
   */
  state = createState(this);

  handleClose = (event, reason) => { if (reason === "backdropClick") return; this.setState({ pleaseWaitVisible: false }); };
  
  /**
   * Render().
   */
  render() {

    return (
      (<div className="appContainer">
        <Dialog
          open={ this.state.pleaseWaitVisible }
          disableEscapeKeyDown={ true }
          transitionDuration={ 0 }>
          <DialogTitle style={{ textAlign:"center" }}>Please Wait</DialogTitle>
          <DialogContent><DialogContentText>...iteming server...</DialogContentText></DialogContent>
        </Dialog>
        <div className="toolbar"><Toolbar state={ this.state } /></div>
        <div className="centerArea">
         <div className="centerViews">
           { (this.state.currentView === "item" || this.state.currentView === "itemAdd") &&
             <ItemView state={ this.state } />
           }
         </div>
        </div>
        <div className="itemList"><ItemList state={ this.state } /></div>
      </div>)
    );

  } /* End render(). */


} /* End class. */


export default BaseLayout;