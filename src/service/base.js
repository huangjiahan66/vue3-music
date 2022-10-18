import axios from "axios";
const baseUrl='/'
const ERR_OK=0
axios.defaults.baseURL=baseUrl

export function get(url,params){
  return axios.get(url,{
    params
  }).then(res=>{
    // console.log(res.data);
    const serverData=res.data
    if(serverData.code===ERR_OK){
      return serverData.result
    }
  }).catch(e=>{
    console.log(e);
  })
}
