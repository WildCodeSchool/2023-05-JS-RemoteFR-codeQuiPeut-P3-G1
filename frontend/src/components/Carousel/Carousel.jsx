import React from 'react'
import "./Carousel.scss"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import hexagoneSVG from '../../assets/icon-carousel/hexagone.svg';
import profilcontainerSVG from '../../assets/icon-carousel/profilcontainer.svg'

const Carousel = () => {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
  return (

    <div className="carousel">
        <img className="hexagone" src={hexagoneSVG} alt="Hexagone" />
        <h2>They <span className='titlecarou'>tested</span>, they <span className="titlecarou">find</span> their guild and they <span className='titlecarou'>like it</span></h2>
      <Slider {... settings}>

      <div className="box">
       <div className="imageContainer">
          <img className="imageProfile" src={profilcontainerSVG} alt="profilcontainer" />
      </div>
      <div className="contentContainer">
        <div className="titleline-container">
          <div className="titleline">
           <h3>ABDOU</h3>
          </div>
       </div>
         <div className="pcarou">
           wesh alors, sors ta beuh ta plaquette gros, je suis dans le game en claquette gros
         </div>
     </div>
</div>
        <div className="box">
            <h3>MEHDI</h3>
            <hr></hr>
        </div>
        <div className="box">
            <h3>MEHDY</h3>
            <hr></hr>
        </div>
        <div className="box">
            <h3>JOHANNA</h3>
            <hr></hr>
        </div>
        <div className="box">
            <h3>REMEHDI</h3>
            <hr></hr>
        </div>
      </Slider>
    </div>
  )
}

export default Carousel