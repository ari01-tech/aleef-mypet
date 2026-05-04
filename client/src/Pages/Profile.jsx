import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Header from "../Components/Header";

const Profile = () => {
  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();

  const [tab, setTab] = useState("profile");
  const [myPets, setMyPets] = useState([]);
  const [myLostPets, setMyLostPets] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3001/myPets/${user.email}`)
        .then((res) => setMyPets(res.data.pets));

      axios
        .get(`http://localhost:3001/myLostPets/${user.email}`)
        .then((res) => setMyLostPets(res.data.pets));
    }
  }, [user]);

  const deletePet = async (id) => {
    await axios.delete(`http://localhost:3001/deletePet/${id}`);
    setMyPets(myPets.filter((p) => p._id !== id));
  };

  const deleteLost = async (id) => {
    await axios.delete(`http://localhost:3001/deleteLostPet/${id}`);
    setMyLostPets(myLostPets.filter((p) => p._id !== id));
  };

  return (
    <>
      <Header />

      <div className="profile-page">
        <div className="profile-sidebar">
          <button
            className={tab === "profile" ? "active" : ""}
            onClick={() => setTab("profile")}
          >
            Profile
          </button>

          <button
            className={tab === "posts" ? "active" : ""}
            onClick={() => setTab("posts")}
          >
            My Posts
          </button>
        </div>

        <div className="profile-content">
          {tab === "profile" && (
            <div className="profile-card">
              <h2>{user?.name}</h2>
              <p>{user?.email}</p>
              <p>{user?.phone}</p>
              <p>{user?.location || "Muscat, Oman"}</p>
            </div>
          )}

          {tab === "posts" && (
            <>
              <h3>Adoption Posts</h3>

              {myPets.map((pet) => (
                <div key={pet._id} className="post-card">
                  <img src={pet.image} alt={pet.petName} />

                  <div>
                    <h4>{pet.petName}</h4>
                    <p>{pet.breed}</p>
                  </div>

                  <div className="post-actions">
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/edit-pet/${pet._id}`)}
                    >
                      Update
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deletePet(pet._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              <h3 style={{ marginTop: "30px" }}>Lost Pets</h3>

              {myLostPets.map((pet) => (
                <div key={pet._id} className="post-card">
                  <img src={pet.image} alt={pet.petName} />

                  <div>
                    <h4>{pet.petName}</h4>
                    <p>{pet.lastSeenLocation}</p>
                  </div>

                  <div className="post-actions">
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/edit-lost/${pet._id}`)}
                    >
                      Update
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteLost(pet._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;