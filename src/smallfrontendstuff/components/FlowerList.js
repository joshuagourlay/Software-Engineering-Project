import React, { useEffect, useState } from 'react';
import api from '../services';
import PurchaseForm from './PurchaseForm';
import './FlowerList.css';

function FlowerList() {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    api.get('/flowers')
      .then((response) => {
        setFlowers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching flowers:', error);
      });
  }, []);

  return (
    <div  className="main">
          {flowers.map((flower) => (
            <th key={flower.fid} className="card">
              <div className='image'>
                  {(() => {
                    if (flower.name === "Red Rose") {
                    return (
                      <img src="https://images.all-free-download.com/images/graphicwebp/red_rose_204835.webp" alt='dd'></img>
                    )
                    } else if (flower.name === "Pink Carnation") {
                    return (
                      <img src="https://c1.wallpaperflare.com/preview/773/806/331/carnation-flower-nature-spring.jpg" alt='dd'></img>
                    )
                    } else if (flower.name === "White Lily") {
                    return (
                            <img src='https://img.freepik.com/free-photo/white-lily-garden-field_1357-36.jpg?w=1480&t=st=1680069042~exp=1680069642~hmac=9e59c2ca7c262407acf33caf1cb8209aa8027aeaa3ae5fb828c079b44ce46df1' alt='dd'></img>
                    )
                    } else if (flower.name === "Yellow Sunflower") {
                      return (
                              <img src='https://images.pexels.com/photos/1169084/pexels-photo-1169084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='dd'></img>
                      )
                    } else if (flower.name === "Blue Hydrangea") {
                      return (
                              <img src='https://www.thetreecenter.com/c/uploads/nikko-blue-hydrangea-3.jpg' alt='dd'></img>
                      )
                    } else if (flower.name === "Purple Iris") {
                      return (
                              <img src='https://i.etsystatic.com/23280238/r/il/c3d2bd/2477336437/il_1588xN.2477336437_7hzj.jpg' alt='dd'></img>
                      )
                    }else if (flower.name === "Orange Gerbera") {
                      return (
                              <img src='https://c4.wallpaperflare.com/wallpaper/534/582/377/flowers-gerbera-flower-hd-wallpaper-preview.jpg' alt='dd'></img>
                      )
                    }else if (flower.name === "Green Chrysanthemum") {
                      return (
                              <img src='https://www.saga.co.uk/contentlibrary/saga/publishing/verticals/home-and-garden/gardening/garden-ideas/planting/colour/green-chrysanthemum-flowers.jpg' alt='dd'></img>
                      )
                    }else if (flower.name === "Pink Peony") {
                      return (
                              <img src='https://gardenerspath.com/wp-content/uploads/2021/04/How-to-Grow-Peonies-Cover.jpg' alt='dd'></img>
                      )
                    }
                    else {
                      return (
                              <img alt='Growing Soon!'></img>
                      )
                    }

                    
                  })()}
              </div>
              <div className='caption'>
                <h1>{flower.name}</h1>
                <p>{flower.description}</p>
                <h2>${flower.price.toFixed(2)}/pc</h2>
                <div className='dropdown'>
                <span className='view'>View Details</span>
                <div class="dropdown-content">
                  <p>Color: {flower.color}</p>
                  <p>Shelf life: {flower.shelf_life}</p>
                  <p>Availability: {flower.availability}</p>
                  <p>Minimum Order: {flower.min_order_quantity}</p>
                  <p>ID: {flower.fid}</p>
                </div>
                </div>
              </div>
              <PurchaseForm flowerId={flower.fid} />
            </th>
          ))}
    </div>
  );
}

export default FlowerList;
