
import React from "react";
import LostItems from "./Card";
import Toolbar from "./Toolbar";



const App: React.FC = () => {
  return (
    <div className="app">
      <h1 className="title">Lost & Found</h1>
      <Toolbar />
      <LostItems />
    </div>
  );
};

export default App;

