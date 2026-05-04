import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import Header from "../Components/Header";

const EditPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/getPet/${id}`).then((res) => {
      setPet(res.data.pet);
    });
  }, [id]);

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:3001/updatePet/${id}`, pet);

    alert("Updated successfully");
    navigate("/profile");
  };

  return (
    <>
      <Header />

      <div className="form-page">
        <div className="form-card">
          <h2>Edit Pet</h2>

          <form onSubmit={handleSubmit}>
            <input
              name="petName"
              value={pet.petName || ""}
              onChange={handleChange}
              placeholder="Pet Name"
            />

            <input
              name="breed"
              value={pet.breed || ""}
              onChange={handleChange}
              placeholder="Breed"
            />

            <input
              name="age"
              value={pet.age || ""}
              onChange={handleChange}
              placeholder="Age"
            />

            <input
              name="color"
              value={pet.color || ""}
              onChange={handleChange}
              placeholder="Color"
            />

            <button className="auth-btn">Update</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPet;