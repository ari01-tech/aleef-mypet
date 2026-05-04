import { FaHeart } from "react-icons/fa";
import "../App.css";
import Header from "../Components/Header";

const Home = () => {
  return (
    <>
      <Header />

      <div className="home-container">
        {/* LEFT SIDE */}
        <div className="home-left">
          <h1>
            Find Your Perfect <br />
            <span>Furry Friend</span>
          </h1>

          <p>
            Aleef connects loving families with pets in need of a home.
            Start your adoption journey today.
          </p>

          <div className="home-buttons">
            <button className="primary-btn">Browse Pets</button>
            <button className="secondary-btn">Report Lost Pet</button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="home-right">
          <div className="home-card">
            <div className="circle">
              <FaHeart />
            </div>

            <div className="icons">
              <span>🐶</span>
              <span>🐱</span>
              <span>🐾</span>
            </div>

            <p>Find your perfect companion</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;