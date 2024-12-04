// React imports.
import React from "react";

// Material-UI imports.
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Person from "@mui/icons-material/Person";
import ListItemText from "@mui/material/ListItemText";


/**
 * Items.
 */
const ItemList = ({ state }) => (

  <List>

    {state.items.map(value => {
      return (
        <ListItem key={value}>
          <ListItemButton onClick={() => state.showItem(value._id, value.name, value.email)}>
          </ListItemButton>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={ `${value.name}` } />
        </ListItem>
      );
    })}

  </List>

); 


export default ItemList;