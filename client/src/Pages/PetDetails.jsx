import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import Header from "../Components/Header";
import { getPet } from "../Features/PetSlice";

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pet = useSelector((state) => state.pets.pet);
  const user = useSelector((state) => state.users.user);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    dispatch(getPet(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (pet?.savedBy?.includes(user?.email)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [pet, user]);

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <>
      <Header />

      <div className="details-page">
        <button className="back-btn" onClick={() => navigate("/adoption")}>
          ← Back
        </button>

        <div className="details-layout">
          <div className="details-left">
            <img src={pet?.image} alt={pet?.petName} />

            <div className="details-buttons">
              <button onClick={handleSave}>{saved ? "❤️ Saved" : "♡ Save"}</button>
              <button>↗ Share</button>
            </div>
          </div>

          <div className="details-right">
            <div className="details-title-row">
              <div>
                <h2>{pet?.petName}</h2>
                <p>{pet?.breed}</p>
                <span>📍 {pet?.location}</span>
              </div>
              <span className="pet-badge static-badge">{pet?.category}</span>
            </div>

            <div className="details-box">
              <h4>Details</h4>
              <div className="details-grid">
                <p><strong>Age</strong><br />{pet?.age} years</p>
                <p><strong>Gender</strong><br />{pet?.gender}</p>
                <p><strong>Weight</strong><br />{pet?.weight} kg</p>
                <p><strong>Color</strong><br />{pet?.color}</p>
              </div>
            </div>

            <div className="details-box">
              <h4>Health & Care</h4>
              {pet?.vaccinated && <p className="green-check">✓ Vaccinated</p>}
              {pet?.spayed && <p className="green-check">✓ Spayed</p>}
              {pet?.trained && <p className="green-check">✓ House Trained</p>}
            </div>

            <div className="details-box">
              <h4>About {pet?.petName}</h4>
              <p>{pet?.description}</p>
            </div>

            <div className="details-box">
              <h4>Owner Information</h4>
              <p>Contact: {pet?.ownerName}</p>
              <p className="orange-text">{pet?.ownerPhone}</p>
            </div>

            <div className="action-buttons">
              <button className="primary-btn">📅 Schedule Visit</button>
              <button className="secondary-btn">Adopt Me</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetDetails;