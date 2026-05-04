import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import Header from "../Components/Header";

const EditLostPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/getLostPets`).then((res) => {
      const found = res.data.pets.find((p) => p._id === id);
      setPet(found || {});
    });
  }, [id]);

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:3001/updateLostPet/${id}`, pet);

    alert("Updated successfully");
    navigate("/profile");
  };

  return (
    <>
      <Header />

      <div className="form-page">
        <div className="form-card">
          <h2>Edit Lost Pet</h2>

          <form onSubmit={handleSubmit}>
            <input
              name="petName"
              value={pet.petName || ""}
              onChange={handleChange}
              placeholder="Pet Name"
            />

            <input
              name="lastSeenLocation"
              value={pet.lastSeenLocation || ""}
              onChange={handleChange}
              placeholder="Last Seen"
            />

            <input
              name="daysMissing"
              value={pet.daysMissing || ""}
              onChange={handleChange}
              placeholder="Days Missing"
            />

            <button className="auth-btn">Update</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditLostPet;