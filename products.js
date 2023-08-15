import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Products=()=>{
    const [products, setProducts]=useState([]);
    useEffect(()=>{
        getProducts();
    },[])
    const getProducts=async()=>{
        let result= await fetch('http://localhost:5000/products');
        result= await result.json();
        setProducts(result);
    }
    const deleteproduct=async(id)=>{
        // console.warn(id);
        let result=await fetch('http://localhost:5000/product/'+id,{
            method: 'DELETE'
        });
        result=await result.json();
        if(result){
            // window.alert('Product deleted successfully');
            getProducts();
        }

    }
    // console.warn("products",products);
    return(
        <div className="product-list">
            <h1>Products listing page</h1>
            <ul>
                <li>s.no.</li>
                <li>Name</li>
                <li>Category</li>
                <li>Company</li>
                <li>operation</li>
            </ul>
            {
                products.map((item,index)=>
            <ul>
                <li>{index+1}.</li>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.category}</li>
                <li>
                <Link to={"/edit/"+item._id}><button>Edit</button> </Link>
                <button onClick={()=>deleteproduct(item._id)} >Delete </button> 
                </li>
                
            </ul>
                )
            }
        </div>
        
    )
}


export default Products;