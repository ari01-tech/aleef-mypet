import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Header from "../Components/Header";
import { getPets } from "../Features/PetSlice";

const Adoption = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pets = useSelector((state) => state.pets?.pets || []);
  const user = useSelector((state) => state.users?.user || {});

  useEffect(() => {
    dispatch(getPets());
  }, [dispatch]);

  return (
    <>
      <Header />

      <div className="adoption-page">
        <div className="adoption-top">
          <div>
            <h2>Find Your New Best Friend</h2>
            <p>Browse pets available for adoption</p>
          </div>

          {user?.email && (
            <button className="primary-btn" onClick={() => navigate("/add-pet")}>
              + Add Pet
            </button>
          )}
        </div>

        <div className="adoption-content">
          <div className="filter-box">
            <h4>Filters</h4>

            <input placeholder="Search by name..." />

            <div className="filter-group">
              <label>Type</label>
              <select>
                <option>All Types</option>
                <option>Dog</option>
                <option>Cat</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Gender</label>
              <select>
                <option>All Genders</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <button className="secondary-btn full-btn">Reset Filters</button>
          </div>

          <div className="pet-grid">
            {pets.map((pet) => (
              <div
                key={pet._id}
                className="pet-card"
                onClick={() => navigate(`/pet/${pet._id}`)}
              >
                <div className="pet-image-wrapper">
                  <img src={pet.image} alt={pet.petName} />
                  <span className="pet-badge">{pet.category}</span>
                </div>

                <div className="pet-info">
                  <h5>{pet.petName}</h5>
                  <p>{pet.breed}</p>

                  <span className="pet-meta">
                    {pet.age} years • {pet.gender}
                  </span>

                  <span className="pet-location">📍 {pet.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Adoption;