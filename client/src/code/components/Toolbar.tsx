// React imports.
import React from "react";

// Material-UI imports.
import Button from "@mui/material/Button";
import NewContactIcon from "@mui/icons-material/ContactMail";


/**
 * Toolbar.
 */
const Toolbar = ({ state }) => (
  <div>
    <Button variant="contained" color="primary" size="small" style={{ marginRight:10 }}
      onClick={ state.showAddItem } >
      <NewContactIcon style={{ marginRight:10 }} />Post Lost Item
    </Button>
  </div>
);


export default Toolbar;