import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import TagBubblesStatic from "./TagBubblesStatic";
import "../styles/SpotsListPublic.css";

export default function SpotListPublic() {
  const [spots, setSpots] = useState([]);
  const spotCollectionRef = collection(db, "spots");

  useEffect(() => {
    const getSpots = async () => {
      const data = await getDocs(spotCollectionRef);
      setSpots(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getSpots();
  }, []);

  return (
    <div className="SpotsListPublic">
      <h2>Spots List</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Spot Name</th>
              <th>Spot Description</th>
              <th>Tags</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            {spots.map((spot) => (
              <tr key={spot.id}>
                <td>{spot.name}</td>
                <td>{spot.description}</td>
                <td>
                  <TagBubblesStatic tags={spot.tags} />
                </td>
                <td>{Number(spot.lat).toFixed(4)}</td>
                <td>{Number(spot.lng).toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
