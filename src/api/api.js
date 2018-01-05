var axios = require('axios');
var baseUrl = 'http://localhost:3051'
module.exports={
  view_tasks : ()=>{
    axios.post(baseUrl+'/view-tasks')
  },
  add_task : (data)=>{
    axios.post(baseUrl+'/add-task', data)
         .then((response)=>{
          return response;
       })
  },
  delete_task : (data)=>{
    axios.post(baseUrl
      +'/delete-task', data)
  },
  update_task : (data)=>{
    axios.post( baseUrl+'/update-task', data)
  }
}
