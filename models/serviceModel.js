import connectPool from '../config/db.js'
const table = 'services'

async function getServices()
{  
    
  try {
    var sql='select * from '+table;  
  
    return new Promise((resolve,reject)=>{
      connectPool.query(sql, (err, resp) => {
        if (err) { 
          reject(err)
        } else { 
          resolve(resp)
        }
      }) 
    })
  } finally {
      //if (connectPool && connectPool.end) connectPool.end();
    } 
}

async function getServiceDetail(service_id)
{  
    
  try {
    //connectPool.input('service_id', connectPool.VarChar, service_id);
    var sql='select * from '+table+' where service_id= @service_id';  
  
    return new Promise((resolve,reject)=>{
      connectPool.query(sql,[service_id], (err, resp) => {
        if (err) { 
          reject(err)
        } else { 
          resolve(resp)
        }
      }) 
    })
  } finally {
      //if (connectPool && connectPool.end) connectPool.end();
    } 
}

async function getServiceHelperData(service_id){
  try {
    //connectPool.input('service_id', connectPool.VarChar, service_id);
    var sql='select * from helper_services where service_id= @service_id';  
  
    return new Promise((resolve,reject)=>{
      connectPool.query(sql,[service_id], (err, resp) => {
        if (err) { 
          reject(err)
        } else { 
          resolve(resp)
        }
      }) 
    })
  } finally {
      //if (connectPool && connectPool.end) connectPool.end();
    } 
}

export default {
    getServices,
    getServiceDetail,
    getServiceHelperData
}