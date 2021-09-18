import React from 'react';
import { baseImageUrl } from '../../config';
import './batchitem.css';

export default function Batchitem(props) {
    return (
        <div onClick={() => props.onClick(props.id)} className="item">
            <img src={baseImageUrl + props.img} alt="Not Loaded.." />
            <div className="batchInfo">
                <h7 className="title">{props.title}</h7>
                {props.mrp ? <p className="price"><span className="originalPrice">&#8377;{props.mrp}</span > <span className="discountPrice">  &#8377;{props.price}</span> <span className="discount">{parseInt(100 - (((props.price) / props.mrp) * 100)) + "% off"}</span></p> : <p className="price"><span className="discountPrice">  &#8377;{props.price}</span></p>
                }
            </div>
        </div>
    )
}
