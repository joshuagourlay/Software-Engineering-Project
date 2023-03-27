import "./home.css"
import Footer from "./Footer.js"


export default function Home(props) {
    return(  
    <div className={props.cName}>
      <img src={props.heroImg} alt="HerpImg"/>


      <div className="hero-text">
        <h1>{props.title}</h1>
        <p> {props.text}</p>
        <a href={props.url} className={props.btnClass}>
        {props.buttonText}
        </a>
      </div>
      <div className="Description"> 
      <h2> Spring famous items!</h2>
    </div>
      <div><Footer/> </div>
    </div> 
    );
  }