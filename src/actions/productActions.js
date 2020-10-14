import { FETCH_PRODUCTS } from "../types";


// we use thunk to handle the actions
export const fetchProducts = () => async(dispatch) =>{
    // we use async await style and fetch method and set result inside res, 
    const res = await fetch("/api/products");
    const data = await res.json();
    console.log(data);
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data,
    });
};