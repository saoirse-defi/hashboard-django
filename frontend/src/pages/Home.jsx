import {useState, useEffect} from "react"
import api from "../api"
import Address from "../components/Address"

function Home(){
    const [addresses, setAddresses] = useState([]);
    const [content, setContent] = useState([]);
    // const [title, setTitle] = useState([]);

    useEffect(() => {
        getAddresses();
    }, [])

    const getAddresses = () => {
        api
            .get("/api/addresses/")
            .then((res) => res.data)
            .then((data) => { setAddresses(data); console.log(data) })
            .catch((err) => alert(err));
    }

    const deleteAddress = (id) => {
        api.delete(`/api/addresses/delete/${id}/`).then((res) => {
            if(res.status === 204) alert("Address deleted!")
            else alert("Failed to delete Address.")
        }).catch((error) => alert(error))
        getAddresses();
    }

    const createAddress = (e) => {
        e.preventDefault()
        api.post("/api/addresses/", { content }).then((res) => {
            if(res.status === 201) alert("Address added!")
            else alert("Failed to add address.")
        }).catch((err) => alert(err))
        getAddresses();
    }
    return <div>
        <div>
            <h2>Addresses</h2>
            {addresses.map((address) => (
                    <Address address={address} onDelete={deleteAddress} key={address.id} />
                ))}
        </div>
        <h2>Submit Address</h2>
        <form onSubmit={createAddress}>
                <label htmlFor="address">Address:</label>
                <br />
                <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                />
                <br />
                <input type="submit" value="Submit"></input>
            </form>
    </div>
}

export default Home