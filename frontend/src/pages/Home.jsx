import {useState, useEffect} from "react"
import api from "../api"
import Address from "../components/Address"
import axios from 'axios';

function Home(){
    const [addresses, setAddresses] = useState([]);
    const [content, setContent] = useState([]);
    const [etherscanData, setEtherscanData] = useState([]);

    useEffect(() => {
        getAddresses();
    }, [])

    
    useEffect(() => {
        fetchEtherscanData();
    }, [])

    const getAddresses = () => {
        api
            .get("/api/addresses/")
            .then((res) => res.data)
            .then((data) => { setAddresses(data); console.log(data) })
            .catch((err) => alert(err));
    };

    const deleteAddress = (id) => {
        api.delete(`/api/addresses/delete/${id}/`).then((res) => {
            if(res.status === 204) alert("Address deleted!")
            else alert("Failed to delete Address.")
            getAddresses();
        }).catch((error) => alert(error))
    };

    const createAddress = (e) => {
        e.preventDefault()
        api
            .post("/api/addresses/", { content })
            .then((res) => {
                if(res.status === 201){
                    alert("Address added!");
                    getAddresses();
                    fetchEtherscanData(res.data.id);
                } else{
                    alert("Failed to add address.");
                }
            })
            .catch((err) => alert(err))     
    };
    
    const fetchEtherscanData = async (addressId) => {
        try {
            const response = await axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${content}&tag=latest&apikey=1ZFW8WFH53U5DMBIDMGSFMEG94JMDJJUP9`);
            console.log(response.data);
            setEtherscanData(response.data);
            // Handle data
            api
            .post(`/api/addresses/${addressId}/etherscan/`, { etherscanData: response.data })
            .then((res) => {
                if(res.status === 201) alert("Balance added!");
                else alert("Failed to add balance.");
                getAddresses();
            })
            .catch((err) => alert(err))
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error
        }
    };

    return( <div>
        <div>
            <h2>Stored Addresses</h2>
            {addresses.map((address) => (
                    <Address address={address} onDelete={deleteAddress} key={address.id} />
                ))}
            {etherscanData && (
                <pre>{JSON.stringify(etherscanData, null, 2)}</pre> //Using the variable.
            )}
        </div>
        <h2>Submit Ethereum Address for Analysis</h2>
        <form onSubmit={createAddress}>
                <label htmlFor="content">Address:</label>
                <br />
                <input
                    type="text"
                    maxLength="42"
                    minLength="42"
                    id="content"
                    name="content"
                    required
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                />
                <br />
                <input type="submit" value="Submit"></input>
            </form>
    </div>
    )
}

export default Home