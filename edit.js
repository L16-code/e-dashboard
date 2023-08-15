import React, { useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
const Edit=()=>{

    
        const [name,setName] = React.useState('');
        const [price,setPrice] = React.useState('');
        const [category,setCategory] = React.useState('');
        const [company,setCompany] = React.useState('');
        const params=useParams();
        const navigate = useNavigate();
        useEffect(()=>{
            getProductdetails();
        },[]);
        const getProductdetails= async()=>{
            let result=await fetch('http://localhost:5000/product/'+params.id)
            result = await result.json();
            // console.warn(result);
            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompany(result.company);
        }
        const [error ,setError] = React.useState(false);
        const Addproduct=async ()=>{
            if(!name || !category || !price || !company){
                setError(true);
                return false;
            }
        }
        const Updateproduct = async ()=>{
            // console.warn(name,price,category,company);
            let result = await fetch('http://localhost:5000/product/'+params.id,{
                method: 'PUT',
                body: JSON.stringify({name,price,category,company}),
                headers: {
                    'content-type': 'application/json'
                }

            });
            result=await  result.json();
            navigate('/products')
        }
    
    return(
        <div className='product'>
            <h1>Edit Products page</h1>
            <input type="text" className='inputBox' placeholder='enter name'
            value={name}
            onChange={(e)=>{setName(e.target.value);}}
            ></input>
            {error &&!name && <span className='invalid-input'> enter the name</span>}
            <input type="text" className='inputBox' placeholder='enter product price'
            value={price}
            onChange={(e)=>{setPrice(e.target.value);}}
            ></input>
            {error &&!price && <span className='invalid-input'> enter the  price</span>}

            <input type="text" className='inputBox' placeholder='enter category'
            value={category}
            onChange={(e)=>{setCategory(e.target.value);}}
            ></input>
            {error &&!category && <span className='invalid-input'> enter the  category</span>}
            
            <input type="text" className='inputBox' placeholder='enter company'
            value={company}
            onChange={(e)=>{setCompany(e.target.value);}}
            ></input>
            {error &&!company && <span className='invalid-input'> enter the company</span>}

            <button onClick={Updateproduct} className='appbutton'>Edit Product</button>
        </div>
        
    )
    }

export default Edit;