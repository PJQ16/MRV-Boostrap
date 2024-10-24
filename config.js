const config = {
       urlApi:'http://localhost:8000', 
      /*  urlApi:'https://netzero.erdi.cmu.ac.th', */
       /*   urlApi:'http://10.110.23.11:3084',  */
       token_name:'MRV_token',
       headers:() => {
               return{
               headers:{
                       'Authorization': 'Bearer ' + localStorage.getItem('MRV_token')
                        }
               }
       }
}
export default config;