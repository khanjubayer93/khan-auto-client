import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const Product = () => {
    const [allItem, setAllItem] = useState([]);
    // console.log(allItem)
    

    useEffect(() => {
        fetch('http://localhost:5000/cars')
            .then(res => res.json())
            .then(data => setAllItem(data))
    }, [])
    return (
        <div>
            <div className='grid grid-cols-3 gap-5 mx-40 my-10'>
                {
                    allItem?.map(item => <ProductCard
                        key={item?._id}
                        item={item}
                    ></ProductCard>)
                }
            </div>
        </div>
    );
};

export default Product;