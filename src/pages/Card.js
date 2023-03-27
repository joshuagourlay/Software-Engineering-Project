import React from "react";

export default function Card({title,imageUrl,body})
{
    return(
        <div className="card-container">
            <div className="image-container" class="card h-100">
                <img src={imageUrl} alt=""/>
            </div>
            <div className="card-content"  class="card h-100">
                <div className="card-title"  class="card h-100">
                <h3>{title}</h3> 
                <div className="card-body"  class="card h-100">
                    <p>{body}</p>
                </div>
                <div className="btn">
                    <button>
                        <a> View More</a>
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
}