import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const Checkout = () => {
    const { _id, title, price } = useLoaderData();
    const { user } = useContext(AuthContext);

    const handlePlaceOrder = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unknown';
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Order placed successfully');
                    form.reset();
                }
                console.log(data)
            })
            .catch((error) => console.error(error))
    }

    return (
        <form onSubmit={handlePlaceOrder} className='w-1/3 ml-80'>
            <h1>{title}</h1>
            <div className='flex justify-between mb-5 mx-5 items-center'>
                <label htmlFor="">First name:</label>
                <input name='firstName' type="text" placeholder="first name" className="input input-bordered input-primary w-full max-w-xs" />
            </div>
            <div className='flex justify-between mb-5 mx-5 items-center'>
                <label htmlFor="">Last name:</label>
                <input name='lastName' type="text" placeholder="last name" className="input input-bordered input-primary w-full max-w-xs" />
            </div>
            <div className='flex justify-between mb-5 mx-5 items-center'>
                <label htmlFor="">Email:</label>
                <input 
                name='email' 
                type="email" 
                placeholder="email"
                defaultValue={user?.email}
                readOnly 
                className="input input-bordered input-primary w-full max-w-xs" />
            </div>
            <div className='flex justify-between mb-5 mx-5 items-center'>
                <label htmlFor="">Phone:</label>
                <input name='phone' type="text" placeholder="phone" className="input input-bordered input-primary w-full max-w-xs" />
            </div>
            <div className='flex justify-between mb-5 mx-5 items-center'>
                <label htmlFor="">Message:</label>
                <textarea name='message' type='message' className="textarea textarea-primary w-full max-w-xs" placeholder="Bio"></textarea>
            </div>
            <div className='text-center'>
                <button className='btn btn-secondary'>Submit</button>
            </div>
        </form>
    );
};

export default Checkout;