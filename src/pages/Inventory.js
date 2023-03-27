import "./inventory.css"
import Card from "./Card.js"
import "./Card.css"
export default function Inventory(props) {
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
      <div className="Card">
        <Card
          title='Red Rose'
          imageUrl="https://images.all-free-download.com/images/graphicwebp/red_rose_204835.webp"
          body='A classic and romantic choice for any occasion.'/>
            </div>
            
    </div> 
      );
  }