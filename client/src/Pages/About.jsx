import { FaHeart } from "react-icons/fa";
import "../App.css";
import Header from "../Components/Header";

const About = () => {
  return (
    <>
      <Header />

      <div className="about-page">
        <div className="about-hero">
          <h1>About Aleef</h1>
          <p>
            Connecting loving families with pets in need since 2020. We believe
            every pet deserves a forever home.
          </p>
        </div>

        <div className="mission-section">
          <div className="mission-text">
            <h2>Our Mission</h2>
            <p>
              Aleef was founded with a simple yet powerful mission: to make pet
              adoption accessible, transparent, and joyful for everyone. We
              connect caring families with pets in need of loving homes across
              Oman.
            </p>
            <p>
              Through our platform, we’ve facilitated thousands of successful
              adoptions and reunited countless lost pets with their families.
              We’re committed to animal welfare and responsible pet ownership.
            </p>
          </div>
          <div className="mission-card">
            <FaHeart />
          </div>
        </div>

        <div className="team-section">
          <div className="team-card">
            <div className="team-icon">👩‍💻</div>
            <div>
              <h3>Ariam Al Hasani</h3>
              <h5>Lead Developer & Designer</h5>
            </div>
          </div>

          <div className="team-card">
            <div className="team-icon">👨‍💻</div>
            <div>
              <h3>Anwar Al Daeri</h3>
              <h5>Web Developer</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
