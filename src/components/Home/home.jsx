import React from 'react';
import '../Home/home.css';
import BannerImage from '../../assets/banner/banner-img.jpg';



export default function Home() {

    

  return (
    <>
    <section id="home">
        <div className="banner_image"></div>
        <div className="container">
            <div className="banner_outer">
                <div className="col">
                    <h3 className="title">
                        WE PROMOTE YOUR <span>BUSINESS</span>
                    </h3>
                    <p>Nemo enim ipsam oluptatem quia reoluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eosqui ratione.</p>
                    <div className="btn_wrapper">
                        <a className="btn" href="/">Register</a>
                    </div>
                </div>
                <div className="col">
                    <div className="sub_banner_image">
                        <img src={BannerImage} alt="Banner_image" />
                    </div>
                    
                    
                </div>
            </div>
        </div>
    </section>
    </>
  )
}
