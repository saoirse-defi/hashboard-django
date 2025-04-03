// src/components/EthBalance.js

import React, { useState } from 'react';
import axios from 'axios';
import { ACCESS_TOKEN } from "../constants";

function ExternalApiRequest() {
    const [addressId, setAddressId] = useState('');
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState(null);

    const token = localStorage.getItem(ACCESS_TOKEN);

    const handleInputChange = (e) => {
        setAddressId(e.target.value);
    };

    const handleGetBalance = () => {
        console.log("Retrieved Token:", token);
        axios.post('http://127.0.0.1:8000/api/eth-balance/', { addressId }, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token
            }, 
        }) // Replace with your Django API URL
            .then((response) => {
                if (response.data.status === '1') {
                    console.log(response.data)
                    // Etherscan returns balance as a string, convert to ether and display.
                    const balanceInWei = response.data.result;
                    const balanceInEther = balanceInWei / 10**18;
                    setBalance(balanceInEther);
                    setError(null);
                } else {
                    setError(response.data.result); //Etherscan returns error message in result.
                    setBalance(null);
                }
            })
            .catch((error) => {
                console.error('Error fetching balance:', error);
                setError('An error occurred.');
                setBalance(null);
            });
    };

    return (
        <div>
            <input type="text" value={addressId} onChange={handleInputChange} placeholder="Ethereum Address" />
            <button onClick={handleGetBalance}>Get Balance</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {balance !== null && <p>Balance: {balance} ETH</p>}
        </div>
    );
}

export default ExternalApiRequest;