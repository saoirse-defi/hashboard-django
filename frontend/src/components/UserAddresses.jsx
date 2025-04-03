// src/components/UserAddresses.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ACCESS_TOKEN } from "../constants";

function UserAddresses() {
    const [addresses, setAddresses] = useState([]);
    const token = localStorage.getItem(ACCESS_TOKEN);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/user-addresses/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setAddresses(response.data.addresses);
            })
            .catch((error) => {
                console.error('Error fetching addresses:', error);
            });
    }, [token]);

    return (
        <div>
            <h2>Stored Eth Addresses</h2>
            <ul>
                {addresses.map((address) => (
                    <li key={address.id}>
                        {address}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserAddresses;