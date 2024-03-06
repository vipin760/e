import axios from 'axios';
import React,{useState, useEffect } from 'react'
import { USER_BASE_URL } from '../../Routes/server';
import { useParams } from "react-router-dom";

const Activation = () => {
    const { activation_token } = useParams();
    const  [error, setError] = useState(false);

    useEffect(()=>{
        if(activation_token){
            const activationEmail = async()=>{
                try{
                    await axios.post(`${USER_BASE_URL}/activation`,{activation_token}).then((res)=>{
                        console.log(res);
                        toast.success(res.data.message)
                    })

                }catch(error){
                    toast.error(error.response.data.message)
                    setError(true)
                }
            }
            activationEmail();
        }
    },[activation_token])
  return (
    <div style={({
        width:"100%",
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    })}>
     {
        error?(
            <p>Your token is expired ...!</p>
        ):(
            <p>Your Account has been created successfully !</p>
        )
     }
    </div>
  )
}

export default Activation
