import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/main.css";
import Button from "@mui/material/Button";
import { config } from "../config"

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

  const handleFoundClick = async (item: IItem) => {
    try {
      await axios.post(`${config.serverAddress}/notifications`, {
        from: `Lost and Found Team`,
        to: item.email,
        subject: `Good news! Someone found your lost item: ${item.name}`,
        text: `Hello,
Someone has reported that they found your lost item: ${item.name}.
Please follow up with them to retrieve it.
Best regards,
Lost & Found Team`
      });
      alert(`Notification sent to ${item.email}`);
    } catch (err) {
      console.error(err);
      alert("Failed to send notification. Please try again.");
    }
  };

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
            <Button
              className="card-button"
              variant="contained"
              color="primary"
              size="small"
              style={{ marginTop: 10 }}
              onClick={() => handleFoundClick(item)}
            >
              I FOUND IT!
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LostItems;
