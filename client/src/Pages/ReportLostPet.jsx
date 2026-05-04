import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Header from "../Components/Header";
import { addLostPet } from "../Features/LostPetSlice";

const ReportLostPet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.users.user.email);

  const [petName, setPetName] = useState("");
  const [category, setCategory] = useState("Cat");
  const [breed, setBreed] = useState("");
  const [lastSeenLocation, setLastSeenLocation] = useState("");
  const [region, setRegion] = useState("");
  const [daysMissing, setDaysMissing] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [image, setImage] = useState("");

  // 📍 Location API (Activity 11)
  useEffect(() => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );

      const data = await response.json();

      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.state;

      setRegion(city);
    } catch (error) {
      console.log("Location error:", error);
      setRegion("Unknown");
    }
  });
}, []);

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
const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    petName,
    category,
    breed,
    lastSeenLocation,
    region,
    daysMissing,
    ownerName,
    ownerPhone,
    image,
    createdByEmail: email,
  };

  await dispatch(addLostPet(data));

  alert("Lost pet reported successfully");

  navigate("/lost");

  // 🔥 هذا السطر تحطه هنا
  setTimeout(() => {
    window.location.reload();
  }, 300);
};
  return (
    <>
      <Header />

      <div className="form-page">
        <div className="form-card large-form">
          <h2>Report Lost Pet</h2>
          <p>Help us find your pet by providing details</p>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input
                placeholder="Pet Name"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                required
              />

              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Cat</option>
                <option>Dog</option>
              </select>

              <input
                placeholder="Breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />

              <input
                placeholder="Last Seen Location"
                value={lastSeenLocation}
                onChange={(e) => setLastSeenLocation(e.target.value)}
                required
              />

              <input
                placeholder="Region (auto)"
                value={region}
                readOnly
              />

              <input
                type="number"
                placeholder="Days Missing"
                value={daysMissing}
                onChange={(e) => setDaysMissing(e.target.value)}
                required
              />

              <input
                placeholder="Owner Name"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                required
              />

              <input
                placeholder="Owner Phone"
                value={ownerPhone}
                onChange={(e) => setOwnerPhone(e.target.value)}
                required
              />
            </div>

            <input type="file" onChange={handleImage} />

            {image && <img src={image} className="image-preview" />}

            <button className="auth-btn">Report Lost Pet</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReportLostPet;