import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/main.css";
import Button from "@mui/material/Button";

interface IItem {
  _id?: number;
  name: string;
  description?: string;
  imagePath?: string;
  email: string;
}

const LostItems: React.FC = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch items from the server
    const fetchItems = async () => {
      try {
        const response = await axios.get<IItem[]>("/lost-items");
        setItems(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch items");
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="lost-items-container">
      {error && <p className="error-message">{error}</p>}
      <div className="items-grid">
        {items.map((item) => (
          <div className="item-card" key={item._id}>
              {item.imagePath && <img className="item-image" src={item.imagePath} alt={item.name} />}
              <h2>{item.name}</h2>
              {item.description && <p>{item.description}</p>}
              <p><strong>Contact:</strong> {item.email}</p>
              <Button className="card-button" variant="contained" color="primary" size="small" style={{ marginTop:10 }}>
                I FOUND IT!
              </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LostItems;