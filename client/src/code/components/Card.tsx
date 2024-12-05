import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div style={{ padding: "20px" }}>
      <h1>Lost Items</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {items.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
            }}
          >
            {item.imagePath && (
              <img
                src={item.imagePath}
                alt={item.name}
                style={{ maxWidth: "100%", borderRadius: "10px" }}
              />
            )}
            <h2>{item.name}</h2>
            {item.description && <p>{item.description}</p>}
            <p><strong>Contact:</strong> {item.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LostItems;