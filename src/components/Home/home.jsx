import React from "react";
import "./Home.css";
import BannerImage from "../../assets/banner/banner-img.jpg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section id="home">
      <div className="banner_image"></div>

      <div className="container">
        <div className="banner_outer">
          {/* Left content */}
          <div className="col">
            <h1 className="title">
              WE PROMOTE YOUR <span>BUSINESS</span>
            </h1>

            <p>
              Nemo enim ipsam oluptatem quia reoluptas sit aspernatur aut odit aut
              fugit, sed quia consequuntur magni dolores eosqui ratione.
            </p>

            <Link to="/register" className="register_btn">
              Register
            </Link>
          </div>

          {/* Right image */}
          <div className="col">
            <div className="sub_banner_image">
              <img src={BannerImage} alt="Banner" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
