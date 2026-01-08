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
          <div className="col left_col">
            <h1 className="title">
              WELCOME TO <span>KUMAR VARSH</span>
            </h1>

            <p className="subtitle">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
              fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi.
            </p>

            <Link to="/register" className="btn">
              Register
            </Link>
          </div>

          {/* Right image */}
          <div className="col right_col">
            <div className="sub_banner_image">
              <img src={BannerImage} alt="Banner" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
