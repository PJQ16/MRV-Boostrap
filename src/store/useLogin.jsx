import axios from 'axios';
import { create } from 'zustand'
import config from '../../config';
import {persist,createJSONStorage} from 'zustand/middleware'
const LoginStore = (set)=>({
      user:null,
      token:null,
      actionLogin: async(data)=>{
         const res = await axios.post(config.urlApi + `/api/user/signIn`,data);
         set({
            user:res.data.payload,
            token:res.data.token
         })
         return res
      },
      actionLogout:async(data)=>{
        const res = await axios.post(config.urlApi + `/api/user/signOut`,data);
        set({
           user:res.data.payload,
           token:res.data.token
        })
        return res
     },
})

const usePersist = {
  name:'mrv-store',
  storage:createJSONStorage(()=>localStorage)

}
const useLoginStore = create(persist(LoginStore,usePersist));

export default useLoginStore