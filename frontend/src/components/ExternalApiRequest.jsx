// src/components/EthBalance.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ACCESS_TOKEN } from "../constants";

function ExternalApiRequest() {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addressId, setAddressId] = useState('');
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState(null);
    const [postSuccess, setPostSuccess]  = useState(false);

    const token = localStorage.getItem(ACCESS_TOKEN);

    const getUserAddresses = async () => {
        setLoading(true);
        try{
            const response = await axios.get('http://127.0.0.1:8000/api/user-addresses/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status >= 200 && response.status < 300) {
                setAddresses(response.data);
                setLoading(false);
            }else {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
        }
        catch (e) {
            console.error("Error fetching items:", e);
            setError("Failed to load items.");
          } finally {
            setLoading(false);
          }
    }

    const handleInputChange = (e) => {
        console.log("Event:", e);
        setAddressId(e.target.value);
        // setFormData({ ...formData, [e.target.name]: e.target.value });
        // console.log("Updated formData:", formData);
    };

    const handleGetBalance = () => {
        const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;

        if (!addressId || !ethAddressRegex.test(addressId)) {
            console.error("Invalid Ethereum address format provided:", addressId);
            setError("Not an Ethereum address, try again!");
            setBalance(null);
            return;
        }
        console.log("Address format valid. Proceeding...");
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
                        setPostSuccess(true);
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

    useEffect(() => {
        getUserAddresses();
      }, []);

    useEffect(() => {
        if(postSuccess){
            getUserAddresses();
            // setPostSuccess(false);
        }
    }, [postSuccess]);

    if (loading) {
        return <div>Loading addresses...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
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
        </div>
        <div>
            <h2>Submit Ethereum Address for Analysis</h2>
            <input type="text" value={addressId} onChange={handleInputChange} placeholder="Ethereum Address" />
            <button onClick={handleGetBalance}>Get Balance</button>
            

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {balance !== null && <p>Balance: {balance} ETH</p>}
        </div>
        </div>
        
    );
}

export default ExternalApiRequest;