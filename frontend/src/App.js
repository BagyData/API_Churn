import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Items List</h1>
      <table>
        <thead>
          <tr>
            <th>Shop ID</th>
            <th>Customer ID</th>
            <th>User ID</th>
            <th>Type</th>
            <th>Code</th>
            <th>Token</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Subtotal</th>
            <th>Discount</th>
            <th>Tax</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Payment Status</th>
            <th>Fulfillment Status</th>
            <th>Device</th>
            <th>User Agent</th>
            <th>Customer IP</th>
            <th>Send Email</th>
            <th>Is Subscription</th>
            <th>Checkout Started At</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.shop_id}</td>
              <td>{item.customer_id}</td>
              <td>{item.user_id}</td>
              <td>{item.type}</td>
              <td>{item.code}</td>
              <td>{item.token}</td>
              <td>{item.quantity}</td>
              <td>{item.total}</td>
              <td>{item.subtotal}</td>
              <td>{item.discount}</td>
              <td>{item.tax}</td>
              <td>{item.cost}</td>
              <td>{item.status}</td>
              <td>{item.payment_status}</td>
              <td>{item.fulfillment_status}</td>
              <td>{item.device}</td>
              <td>{item.extra.user_agent}</td>
              <td>{item.extra.customer_ip}</td>
              <td>{item.send_email ? 'Yes' : 'No'}</td>
              <td>{item.is_subscription}</td>
              <td>{new Date(item.checkout_started_at).toLocaleString()}</td>
              <td>{new Date(item.created_at).toLocaleString()}</td>
              <td>{new Date(item.updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
