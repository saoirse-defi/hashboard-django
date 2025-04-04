// src/components/EthBalance.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ACCESS_TOKEN } from "../constants";

function ExternalApiRequest() {
    const [state, setState] = useState({
        addresses: [],
        loading: true,
        addressId: '',
        balance: null,
        error: null,
        postSuccess: false,
      });

    const token = localStorage.getItem(ACCESS_TOKEN);

    const apiRequest = async (method, url, data = null) => {
        try {
          const response = await axios({
            method,
            url,
            data,
            headers: { Authorization: `Bearer ${token}` },
          });
    
          if (response.status < 200 || response.status >= 300) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          return response.data;
        } catch (error) {
          console.error('API request error:', error);
          setState((prevState) => ({
            ...prevState,
            error: 'An error occurred.',
            loading: false,
          }));
          throw error;
        }
      };

    const getUserAddresses = async () => {
        setState((prevState) => ({ ...prevState, loading: true }));
        try {
        const data = await apiRequest('get', 'http://127.0.0.1:8000/api/user-addresses/');
        setState((prevState) => ({
            ...prevState,
            addresses: data,
            loading: false,
        }));
        } catch (error) {
        setState((prevState) => ({ ...prevState, loading: false }));
        console.error('Error fetching balance:', error);
        }
    }

    const handleInputChange = (e) => {
        console.log("Event:", e);
        setState((prevState) => ({ ...prevState, addressId: e.target.value }));
    };

    const handleGetBalance = async () => {
        const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;

        if (!state.addressId || !ethAddressRegex.test(state.addressId)) {
            setState((prevState) => ({
              ...prevState,
              error: 'Not an Ethereum address, try again!',
              balance: null,
            }));
            return;
        }
        console.log("Address format valid. Proceeding...");
        console.log("Retrieved Token:", token);
        console.log("Sending data:", state.addressId);

        try {
            await apiRequest('post', 'http://127.0.0.1:8000/api/save-address/', { address: state.addressId });
            const balanceData = await apiRequest('post', 'http://127.0.0.1:8000/api/eth-balance/', {
              addressId: state.addressId,
            });
      
            if (balanceData.status === '1') {
              setState((prevState) => ({
                ...prevState,
                balance: balanceData.result / 10 ** 18,
                error: null,
                postSuccess: true,
              }));
            } else {
              setState((prevState) => ({
                ...prevState,
                error: balanceData.result,
                balance: null,
              }));
            }
          } catch (error) {
            setState((prevState) => ({
              ...prevState,
              error: 'An error occurred.',
              balance: null,
            }));
            console.error('Error fetching balance:', error);
        }
    };

    useEffect(() => {
        getUserAddresses();
      }, []);

    useEffect(() => {
        if(state.postSuccess){
            getUserAddresses();
            // setState((prevState) => ({
            //     ...prevState,
            //     postSuccess: false,
            //   }));
        }
    }, [state.postSuccess]);

    if (state.loading) {
        return <div>Loading addresses...</div>;
    }

    if (state.error) {
        return <div>{state.error}</div>;
    }

    return (
        <div>
        <div>
            <h2>Stored Eth Addresses</h2>
            <ul>
                {state.addresses.map((address) => (
                    <li key={address.id}>
                        {address.address}
                    </li>
                ))}
            </ul>
            {state.addresses.length === 0 && <div>No Addresses stored.</div>}
        </div>
        <div>
            <h2>Submit Ethereum Address for Analysis</h2>
            <input type="text" value={state.addressId} onChange={handleInputChange} placeholder="Ethereum Address" />
            <button onClick={handleGetBalance}>Get Balance</button>
            

            {state.error && <p style={{ color: 'red' }}>{state.error}</p>}

            {state.balance !== null && <p>Balance: {state.balance} ETH</p>}
        </div>
        </div>
        
    );
}

export default ExternalApiRequest;