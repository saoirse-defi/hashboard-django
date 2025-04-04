// import {useState, useEffect} from "react"
// import api from "../api"
import Address from "../components/Address"
import ExternalApiRequest from "../components/ExternalApiRequest";
import UserAddresses from '../components/UserAddresses';
// import axios from 'axios';

function Home(){

    return(
    <div>
        {/* <div>
            <UserAddresses />
        </div> */}
        <div>
            <ExternalApiRequest />
        </div>
    </div>
    )
}

export default Home