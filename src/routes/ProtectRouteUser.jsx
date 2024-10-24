import React, { useEffect, useState } from 'react'
import useLoginStore from '../store/useLogin';
import { currentUser } from '../api/auth';
import LoadingToRedirect from './LoadingToRedirect';

export default function ProtectRouteUser({element}) {
    const [ok,setOk] = useState(false);
    const user = useLoginStore((state)=>state.user);
    const token =  useLoginStore((state)=>state.token);

   useEffect(()=>{
        if(user && token){
            currentUser(token)
            .then((res)=>setOk(true))
            .catch((err)=>setOk(false))
        }
   },[]);
    
  return  ok ? element : <LoadingToRedirect />
}
