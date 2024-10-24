import axios from 'axios';
import config from '../../config';

export const currentUser = async(token) => await axios.post(config.urlApi + `/api/user/current-user`,{},{
    headers:{
        Authorization:`Bearer ${token}`
    }
});

/* export const currentAdmin = async(token) => await axios.post(config.urlApi + `/api/user/current-Admin`,{},{
    headers:{
        Authorization:`Bearer ${token}`
    }
});
 */
