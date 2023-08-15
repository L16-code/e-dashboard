import React from 'react';
const Add_products = () => {
    const [name,setName] = React.useState('');
    const [price,setPrice] = React.useState('');
    const [category,setCategory] = React.useState('');
    const [company,setCompany] = React.useState('');
    const [error ,setError] = React.useState(false);
    const Addproduct=async ()=>{
        if(!name || !category || !price || !company){
            setError(true);
            return false;
        }

        // console.warn(name,price,category,company);
        const userid=JSON.parse( localStorage.getItem('user'))._id;
        let result=await fetch("http://127.0.0.1:5000/add-product",{
            method: 'POST',
            body: JSON.stringify({name,price,category,company,userid}),
            headers:{
                "content-type": "application/json"
            }
        });
        // result = await result.json();
        // console.warn(result);
        // console.warn(userid._id)
    }

    return(
        <div className='product'>
            <h1>Add Products page</h1>
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
            {error &&!company && <span className='invalid-input'> enter the  name</span>}

            <button onClick={Addproduct} className='appbutton'>Add Product</button>
        </div>
        
    )
}

export default Add_products;