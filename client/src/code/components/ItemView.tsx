// React imports.
import React from "react";

// Material-UI imports.
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";


/**
 * itemView.
 */
const itemView = ({ state }) => (

  <form>

    <TextField margin="dense" id="itemName" label="Name" value={ state.itemName } variant="outlined"
      InputProps={{ style : { color : "#000000" } }} disabled={ state.currentView === "item" } style={{ width:260 }}
      onChange={ state.fieldChangeHandler } />
    <br />
    <TextField margin="dense" id="itemEmail" label="Email" value={ state.itemEmail } variant="outlined"
      InputProps={{ style : { color:"#000000" } }} disabled={ state.currentView === "item" } style={{ width:520 }}
      onChange={ state.fieldChangeHandler } />
    <br />
    { /* Hide.show buttons as appropriate.  Note that we have to use this form of onClick() otherwise the event  */ }
    { /* object would be passed to additem() and the branching logic would fail. */ }
    { state.currentView === "itemAdd" &&
      <Button variant="contained" color="primary" size="small" style={{ marginTop:10 }}
        onClick={ state.saveitem }>
        Save
      </Button>
    }
    { state.currentView === "item" &&
      <Button variant="contained" color="primary" size="small" style={{ marginTop:10, marginRight:10 }}
        onClick={ state.deleteitem }>
        Delete
      </Button>
    }
    { state.currentView === "item" &&
      <Button variant="contained" color="primary" size="small" style={{ marginTop:10 }}
      onClick={ () => state.showComposeMessage("item") }>Send Email</Button>
    }

  </form>

); /* itemView. */


export default itemView;