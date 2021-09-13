import mysql from 'mysql';
//local

/*const connectDB = mysql.createPool({ 
    connectionLimit: 10,  
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'local_dekho', 
    waitForConnections: true,
    debug    :  false,   
    queueLimit: 30,
    connectTimeout:40000,
    multipleStatements: true
  }); */
  
  //live
  const connectDB = mysql.createPool({ 
    connectionLimit: 10,  
    host: 'localdekho.ci2ryzn9mq9k.us-east-2.rds.amazonaws.com',
    user: 'admin', 
    password: 'helloworld', 
    database: 'localdekhodb'
  }); 

  // Attempt to catch disconnects 
  connectDB.on('connection', function (connection) {
  console.log('DB Connection established');

  connectDB.on('error', function (err) {
    console.error( 'MySQL error', err.code);
  }); 
  connectDB.on('close', function (err) {
    console.error(  'MySQL close', err); 
  }); 
 
});
connectDB.on('error', function (connection) {
  console.error( 'MySQL error', err.code); 
}); 
export default connectDB;