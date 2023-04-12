import "./home.css"
import Footer from "./Footer.js"

export default function Home(props) {
    return(  
    <div className={props.cName}>
      <img src={props.heroImg} alt="HerpImg"/>


      <div className="hero-text">
        <h1>{props.title}</h1>
        <p> {props.text}</p>
        <a href={props.url}  className={props.btnClass}>
        {props.buttonText}
        </a>
      </div>
    <div className="des-text">
        <h2> About US</h2>
        <h2> Maintech Flowers by the Bay</h2>
        <p> A national garden and premier horticultural attraction for local and international visitors,
            Gardens by the Bay is a showpiece of horticulture and garden artistry that presents the plant kingdom in a 
            whole new way, entertaining while educating 
            visitors with plants seldom seen in this part of 
            the world, ranging from species in cool, temperate climates to tropical 
            forests and habitats.</p>
              <a className="aboutimg" href="true">
              <img src={About} alt=""> 
              </img>
              </a> 
      </div>
      <div className="businesshours">
          <h2 style={{paddingBottom: 10, color: "black"}}>Business Hours</h2>
          <p>Monday - Friday:</p>
          <p> 9am - 5pm</p>
          <p>Saturday:</p>
          <p> 8am - 2pm</p>
          <p>Sunday:  Closed</p>
      </div>
      </div>

      <div><Footer/> </div>
    </div> 
    );
  }