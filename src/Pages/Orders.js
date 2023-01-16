import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import OrdersTable from './OrdersTable';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    console.log(orders)

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setOrders(data)
                console.log(data)
            })

    }, [user?.email]);

    const handleDelete = id => {
        const proced = window.confirm('Do you want to delete this order?')
        if (proced) {
            fetch(`http://localhost:5000/orders/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        const remaining = orders.filter(ord => ord._id !== id)
                        setOrders(remaining)
                    }
                })
        }
    }

    const handleStatusUpdate = (id) => {
        fetch(`http://localhost:5000/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'Approved' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    const remaining = orders.filter(ord => ord._id !== id);
                    const approving = orders.find(ord => ord._id === id);
                    approving.status = 'Approved';

                    const newOrders = [approving, ...remaining,]
                    setOrders(newOrders)
                    console.log(newOrders)
                }
            })
    }

    return (
        <div>
            <h1>You have {orders.length} orders</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    Delete
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>

                        {

                            orders?.map(order => <OrdersTable
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                                handleStatusUpdate={handleStatusUpdate}
                            ></OrdersTable>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;