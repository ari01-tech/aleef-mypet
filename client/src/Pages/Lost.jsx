import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Header from "../Components/Header";
import { getLostPets } from "../Features/LostPetSlice";

const Lost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pets = useSelector((state) => state.lost?.pets || []);
  const user = useSelector((state) => state.users?.user || {});

  const [selectedRegion, setSelectedRegion] = useState("All");

  useEffect(() => {
    dispatch(getLostPets());
  }, [dispatch]);

  const regions = ["All", ...new Set(pets.map((p) => p.region))];

  const filteredPets =
    selectedRegion === "All"
      ? pets
      : pets.filter((pet) => pet.region === selectedRegion);

  return (
    <>
      <Header />

      <div className="lost-page">
        <div className="lost-top">
          <div>
            <h2>Lost & Found</h2>
            <p>Help reunite lost pets with their families</p>
          </div>

          {user?.email && (
            <button
              className="primary-btn"
              onClick={() => navigate("/report-lost-pet")}
            >
              + Report Lost Pet
            </button>
          )}
        </div>

        <div className="lost-layout">
          <div className="lost-locations">
            <div className="pin-icon">⌖</div>
            <h4>Locations of lost pets</h4>

            <div className="locations-grid">
              {regions.map((loc) => (
                <div
                  key={loc}
                  className={
                    selectedRegion === loc
                      ? "location-card active-location"
                      : "location-card"
                  }
                  onClick={() => setSelectedRegion(loc)}
                >
                  <span>📍</span>
                  <strong>{loc}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="lost-posts">
            {filteredPets.map((pet) => (
              <div key={pet._id} className="lost-card">
                <img src={pet.image} alt={pet.petName} />

                <div className="lost-info">
                  <h5>{pet.petName}</h5>
                  <p>{pet.breed} • {pet.category}</p>
                  <span>📍 Last seen: {pet.lastSeenLocation}</span>
                  <span>🕒 {pet.daysMissing} day ago</span>
                  <hr />
                  <p>Contact Owner:</p>
                  <p className="orange-text">{pet.ownerPhone}</p>
                </div>

                <span className="lost-badge">Lost</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Lost;