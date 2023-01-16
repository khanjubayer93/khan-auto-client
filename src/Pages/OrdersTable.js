import React, { useEffect, useState } from 'react';

const OrdersTable = ({ order, handleDelete, handleStatusUpdate }) => {
    const { _id, serviceName, customer, service, status } = order;
    const [orderCars, setOrderCard] = useState({})

    useEffect(() => {
        fetch(`http://localhost:5000/cars/${service}`)
            .then(res => res.json())
            .then(data => {
                setOrderCard(data)
            })
    }, [service]);



    return (
        <tr>
            <th>
                <button onClick={() => handleDelete(_id)} className="btn btn-circle btn-outline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="rounded-full w-24 h-24">
                            {
                                orderCars?.image &&
                                <img src={orderCars.image} alt="Avatar Tailwind CSS Component" />}
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{serviceName}</div>
                        <div className="text-sm opacity-50">{customer}</div>
                    </div>
                </div>
            </td>
            <td>
                Zemlak, Daniel and Leannon
                <br />
                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
            </td>
            <td>Purple</td>
            <th>
                <button
                    onClick={() => handleStatusUpdate(_id)}
                    className="btn btn-ghost btn-xs">{status ? status : 'Pending...'}
                </button>
            </th>
        </tr>
    );
};

export default OrdersTable;