import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Header from "../Components/Header";
import { addPet } from "../Features/PetSlice";

const AddPet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.users.user.email);

  const [petName, setPetName] = useState("");
  const [category, setCategory] = useState("Dog");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("Female");
  const [age, setAge] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [healthInfo, setHealthInfo] = useState("");
  const [vaccinated, setVaccinated] = useState(false);
  const [trained, setTrained] = useState(false);
  const [spayed, setSpayed] = useState(false);
  const [description, setDescription] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [location, setLocation] = useState("Muscat");
  const [image, setImage] = useState("");

  const handleImage = (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();

    const petData = {
      petName,
      category,
      breed,
      gender,
      age,
      color,
      weight,
      healthInfo,
      vaccinated,
      trained,
      spayed,
      description,
      ownerName,
      ownerPhone,
      location,
      image,
      createdByEmail: email,
    };

    dispatch(addPet(petData));
    alert("Pet added successfully.");
    navigate("/adoption");
  };

  return (
    <>
      <Header />

      <div className="form-page">
        <div className="form-card large-form">
          <h2>Add Pet for Adoption</h2>
          <p>Fill in the pet details to help them find a loving home.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input
                type="text"
                placeholder="Pet Name"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                required
              />

              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Dog</option>
                <option>Cat</option>
              </select>

              <input
                type="text"
                placeholder="Breed / Type e.g. Persian Cat"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
              />

              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option>Female</option>
                <option>Male</option>
              </select>

              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
              />

              <input
                type="number"
                placeholder="Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <input
                type="text"
                placeholder="Owner Name"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Owner Phone"
                value={ownerPhone}
                onChange={(e) => setOwnerPhone(e.target.value)}
                required
              />
            </div>

            <textarea
              placeholder="Health Information"
              value={healthInfo}
              onChange={(e) => setHealthInfo(e.target.value)}
            />

            <textarea
              placeholder="Describe your pet..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="check-row">
              <label>
                <input
                  type="checkbox"
                  checked={vaccinated}
                  onChange={(e) => setVaccinated(e.target.checked)}
                />
                Vaccinated
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={trained}
                  onChange={(e) => setTrained(e.target.checked)}
                />
                House Trained
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={spayed}
                  onChange={(e) => setSpayed(e.target.checked)}
                />
                Spayed
              </label>
            </div>

            <input type="file" accept="image/*" onChange={handleImage} />

            {image && <img src={image} alt="preview" className="image-preview" />}

            <button className="auth-btn" type="submit">
              Add Pet
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPet;