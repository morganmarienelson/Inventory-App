import fetch from 'isomorphic-unfetch';
import {useState, useEffect} from "react";
import {useRouter} from "next/router";

const LiquorLog = (
    //{liquor}
) => {
    use router = useRouter();


    return (

    )
}

// Liquor.getInitialProps = async ({query: {id}}) => {
//     const res = await fetch('http://localhost:3000/api/loungeDrinks/${id}' )
//     const data  = await res.json()
//
//     const pubRes = await fetch('http://localhost:3000/api/pubDrinks/${id');
//     const data = await pubRes.json();
//
//     return { liquor: data};
// }