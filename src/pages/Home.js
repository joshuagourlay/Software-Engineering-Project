import { useEffect, useState, useRef } from "react";
import "./home.css";
import Footer from "./Footer.js";

export default function Home(props) {
  const [imageHeight, setImageHeight] = useState(null);
  const aboutRef = useRef(null);
  const businessHoursRef = useRef(null);

  useEffect(() => {
    const heroImage = new Image();
    heroImage.src = props.heroImg;

    heroImage.onload = () => {
      setImageHeight(heroImage.height);
    };

    const parallax = () => {
      const heroImage = document.querySelector(".hero img");
      const aboutSection = document.querySelector(".des-text");
      const businessHoursSection = document.querySelector(".businesshours");
      const scrollPosition = window.pageYOffset;
      const imgHeight = heroImage.offsetHeight;

      // Calculate translate value for hero image
      if (scrollPosition < imgHeight) {
        heroImage.style.transform = `translateY(-${scrollPosition * 0.5}px)`;
      } else {
        heroImage.style.transform = `translateY(-${imgHeight * 0.5}px)`;
      }

      // Calculate translate value for About Us section
      const aboutRect = aboutSection.getBoundingClientRect();
      const aboutSectionHeight = aboutRect.height;
      const aboutSectionTop = aboutRect.top + window.pageYOffset;
      const aboutSectionBottom = aboutSectionTop + aboutSectionHeight;
      const parallaxStart = aboutSectionTop - window.innerHeight;
      const parallaxEnd = aboutSectionBottom - aboutSectionHeight;
      const parallaxRange = parallaxEnd - parallaxStart;
      const parallaxPercent = (scrollPosition - parallaxStart) / parallaxRange;
      const parallaxTranslate = -parallaxPercent * 100;
      const root = document.documentElement;
      root.style.setProperty("--about-translate", `${parallaxTranslate}px`);

      // Calculate translate value for Business Hours section
      const businessHoursRect = businessHoursSection.getBoundingClientRect();
      const businessHoursSectionHeight = businessHoursRect.height;
      const businessHoursSectionTop = businessHoursRect.top + window.pageYOffset;
      const businessHoursSectionBottom = businessHoursSectionTop + businessHoursSectionHeight;
      const businessHoursParallaxStart = businessHoursSectionTop - window.innerHeight;
      const businessHoursParallaxEnd = businessHoursSectionBottom - businessHoursSectionHeight;
      const businessHoursParallaxRange = businessHoursParallaxEnd - businessHoursParallaxStart;
      const businessHoursParallaxPercent = (scrollPosition - businessHoursParallaxStart) / businessHoursParallaxRange;
      const businessHoursTranslate = -businessHoursParallaxPercent * 100;
      root.style.setProperty("--businesshours-translate", `${businessHoursTranslate}px`);
    };

    window.addEventListener("scroll", parallax);

    return () => {
      window.removeEventListener("scroll", parallax);
    };
  }, [props.heroImg]);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.querySelector(".des-text");
      const businessHoursSection = document.querySelector(".businesshours");

      const aboutRect = aboutSection.getBoundingClientRect();
      const businessHoursRect = businessHoursSection.getBoundingClientRect();

      const fadeInTrigger = window.innerHeight * 0.60;

      if (aboutRect.top < fadeInTrigger) {
        aboutSection.classList.add("visible");
      } else {
        aboutSection.classList.remove("visible");
      }

      if (businessHoursRect.top < fadeInTrigger) {
        businessHoursSection.classList.add("visible");
      } else {
        businessHoursSection.classList.remove("visible");
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`hero ${props.cName}`} style={{ height: imageHeight ? `${imageHeight}px` : '65vh' }}>
        <div className="hero-container">
          <div className="img-wrapper" style={{ height: imageHeight ? `${imageHeight}px` : '65vh' }}>
            <img src={props.heroImg} alt="HerpImg" />
          </div>
          <div className="hero-text">
            <h2>{props.title}</h2>
            <p> {props.text}</p>
            <a href={props.url} className="btn btn-two">
              {props.buttonText}
            </a>
          </div>
        </div>
      </div>
      <div className="maindisplay">
        <div
          className="des-text fade-in"
          ref={aboutRef}
          style={{
            transform: `translateY(var(--about-translate))`,
          }}
        >
          <h2>About Us</h2>
          <p></p>
          <p>
          At Maintech Flowers by the Bay, we take pride in being a local 
          flower shop that has been serving our community for 25 years. We 
          believe in the power of flowers to brighten up anyone's day and 
          make special occasions even more memorable. Whether you're looking 
          to surprise a loved one on their birthday or want to make a statement 
          at your wedding, our team of experienced florists is here to help.
          </p>
          <p>
          Our dedication to quality and customer service has earned us a 
          reputation as a trusted provider of beautiful floral arrangements 
          in our community. We source our flowers locally whenever possible, 
          ensuring that our customers receive the freshest blooms available. 
          We also offer same-day delivery for orders placed before noon, 
          making it easy for our customers to surprise their loved ones 
          with a beautiful bouquet.
          </p>
          <p>
          At Maintech Flowers by the Bay, we are more than just a flower shop
           - we are a part of the community. We are proud to support local 
           events and organizations, and we love seeing our flowers bring joy 
           to the people around us. Come visit us today and discover why we 
           have been a beloved part of our community for 25 years.
          </p>
        </div>
        <div
          className="businesshours des-text fade-in"
          ref={businessHoursRef}
          style={{
            transform: `translateY(var(--businesshours-translate))`,
          }}
        >
          <h2 style={{ paddingBottom: 10, color: "black" }}>Business Hours</h2>
          <p>Monday - Friday:</p>
          <p className="time">9am - 5pm</p>
          <p>Saturday:</p>
          <p className="time">8am - 2pm</p>
          <p>Sunday: </p>
          <p className="time">Closed</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
