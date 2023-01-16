import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ item }) => {
    const {_id, image, title, price, rating, color, description } = item;
    return (
        <div className="card w-auto bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{description}</p>
                <p><span className='font-bold'>Color:</span> {color}</p>
                <p><span className='font-bold'>Price:</span> ${price}</p>
                <p>Rating:{rating}</p>
                <div className="card-actions justify-center">
                    <Link to={`/checkout/${_id}`}>
                        <button className='btn btn-secondary w-full'>Add to cart</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;