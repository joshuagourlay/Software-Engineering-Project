import "./inventory.css"
import Card from "./Card.js"

export default function Inventory(props) {
    return(  
      <div className={`hero-in ${props.cName}`}>
      <img src={props.heroImg} alt="HerpImg"/>


      <div className="hero-text">
        <h1>{props.title}</h1>
        <p> {props.text}</p>
        <a href={props.url} className={props.btnClass}>
        {props.buttonText}
        </a>
      </div>
      <div className="wrapper"> 
            
              <Card
                  title='Red Rose'
                  imageUrl="https://images.all-free-download.com/images/graphicwebp/red_rose_204835.webp"
                  body='A classic and romantic choice for any occasion.
                        Price: $2/stem'/>         
              <Card
                  title="Pink Carnation"
                  imageUrl="https://c1.wallpaperflare.com/preview/773/806/331/carnation-flower-nature-spring.jpg"
                  body='A classic and romantic choice for any occasion.'/>
               <Card
                  title="White Lily"
                  imageUrl="https://img.freepik.com/free-photo/white-lily-garden-field_1357-36.jpg?w=1480&t=st=1680069042~exp=1680069642~hmac=9e59c2ca7c262407acf33caf1cb8209aa8027aeaa3ae5fb828c079b44ce46df1"
                  body='A classic and romantic choice for any occasion.'/>
                <Card
                  title="Yellow Sunflower"
                  imageUrl="https://i.etsystatic.com/8218820/r/il/01ac40/1577281449/il_1588xN.1577281449_6522.jpg"
                  body='Bright and cheerful, a symbol of summer.'/>
                <Card
                  title="Blue Hydrangea"
                  imageUrl="https://www.thetreecenter.com/c/uploads/nikko-blue-hydrangea-3.jpg"
                  body='Bright and cheerful, a symbol of summer.
                  Price: $3 per stem'
                  />
                <Card
                  title="Purple Iris"
                  imageUrl="https://i.etsystatic.com/23280238/r/il/c3d2bd/2477336437/il_1588xN.2477336437_7hzj.jpg"
                  body='Bright and cheerful, a symbol of summer.'/>
                
          </div>
      </div>
            
      );
  }