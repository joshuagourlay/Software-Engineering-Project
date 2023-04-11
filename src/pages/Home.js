import "./home.css"
import Footer from "./Footer.js"
import About from "../images/user.png"
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
      <div className="text-align:center">
      
        <h2> About US-</h2>
        
    </div>    
    <div className="text-margin:center">
        <h3> Maintech Flowers by the Bay:</h3>
    </div>    
    <div className="des-text">
        <p> A national garden and premier horticultural attraction for local and international visitors,
            Gardens by the Bay is a showpiece of horticulture and garden artistry that presents the plant kingdom in a 
            whole new way, entertaining while educating 
            visitors with plants seldom seen in this part of 
            the world, ranging from species in cool, temperate climates to tropical 
            forests and habitats.</p>
              <a className="aboutimg" href="home">
              <img src={About} alt=""> 
              </img>
              </a> 
      </div>

      <div><Footer/> </div>
    </div> 
    );
  }