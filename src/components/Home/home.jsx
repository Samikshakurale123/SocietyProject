import BannerImage from "../../assets/banner/banner-img.jpg";

<section id="home">
  <div className="banner_image"></div>

  <div className="container">
    <div className="banner_outer">
      
      <div className="col">
        <h3 className="title">
          WE PROMOTE YOUR <span>BUSINESS</span>
        </h3>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
        </p>
        <a className="btn" href="/register">Register</a>
      </div>

      <div className="col">
        <div className="sub_banner_image">
          <img src={BannerImage} alt="banner" />
        </div>
      </div>

    </div>
  </div>
</section>
