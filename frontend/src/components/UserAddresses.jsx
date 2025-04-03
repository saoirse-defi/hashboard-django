// src/components/UserAddresses.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ACCESS_TOKEN } from "../constants";

function UserAddresses() {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const token = localStorage.getItem(ACCESS_TOKEN);

    useEffect(() => {
        setLoading(true);
        axios.get('http://127.0.0.1:8000/api/user-addresses/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            setAddresses(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching addresses:', error);
            setError('Failed to load addresses.');
            setLoading(false);
        });
    }, [token, refreshTrigger]);

    const handleRefresh = () => {
        setRefreshTrigger(refreshTrigger + 1); // Cause refreshTrigger to change.
    };

    if (loading) {
        return <div>Loading addresses...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Stored Eth Addresses</h2>
            <ul>
                {addresses.map((address) => (
                    <li key={address.id}>
                        {address.address}
                    </li>
                ))}
            </ul>
            {addresses.length === 0 && <div>No Addresses stored.</div>}
            <button onClick={handleRefresh}>Refresh Addresses</button>
        </div>
    );
}

export default UserAddresses;