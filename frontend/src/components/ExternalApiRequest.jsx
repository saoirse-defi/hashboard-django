// src/components/EthBalance.js

import React, { useState } from 'react';
import axios from 'axios';
import { ACCESS_TOKEN } from "../constants";

function ExternalApiRequest() {
    // const [formData, setFormData] = useState({
    //     content: '', //Address content
    // });
    const [addressId, setAddressId] = useState('');
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState(null);

    const token = localStorage.getItem(ACCESS_TOKEN);

    const handleInputChange = (e) => {
        console.log("Event:", e);
        setAddressId(e.target.value);
        // setFormData({ ...formData, [e.target.name]: e.target.value });
        // console.log("Updated formData:", formData);
    };

    const handleGetBalance = () => {
        // e.preventDefault();
        console.log("Retrieved Token:", token);
        console.log("Sending data:", addressId);
        axios.post('http://127.0.0.1:8000/api/save-address/', { address: addressId }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            if (response.status === 201) {
                axios.post('http://127.0.0.1:8000/api/eth-balance/', { addressId }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    if (response.data.status === '1') {
                        console.log(response.data);
                        const balanceInWei = response.data.result;
                        const balanceInEther = balanceInWei / 10**18;
                        setBalance(balanceInEther);
                        setError(null);
                    } else {
                        setError(response.data.result);
                        setBalance(null);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching balance:', error);
                    setError('An error occurred fetching the balance.');
                    setBalance(null);
                });
            } else {
                console.error('Error saving address: Unexpected status code', response.status);
                setError('An error occurred while saving the address.');
            }
        })
        .catch((error) => {
            console.error('Error saving address:', error);
            setError('An error occurred while saving the address.');
        });
    };

    return (
        <div>
            <h2>Submit Ethereum Address for Analysis</h2>
            <input type="text" value={addressId} onChange={handleInputChange} placeholder="Ethereum Address" />
            <button onClick={handleGetBalance}>Get Balance</button>
            

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {balance !== null && <p>Balance: {balance} ETH</p>}
        </div>
    );
}

export default ExternalApiRequest;