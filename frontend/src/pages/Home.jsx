// import {useState, useEffect} from "react"
// import api from "../api"
import Address from "../components/Address"
import ExternalApiRequest from "../components/ExternalApiRequest";
// import axios from 'axios';

function Home(){

    return( 
    <div>
        <h2>Submit Ethereum Address for Analysis</h2>
        <ExternalApiRequest />
    </div>
    )
}

export default Home