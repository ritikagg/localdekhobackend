//var mysql = require('mysql');
import mysql from 'mysql'

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "local_dekho"
});

//local

/*var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "local_dekho"
});*/
  
  //live
  var con = mysql.createConnection({
    host: 'http://localdekho.ci2ryzn9mq9k.us-east-2.rds.amazonaws.com/',
    user: 'admin', 
    password: 'helloworld', 
    database: 'localdekhodb', 
  });
  

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var sql = "CREATE TABLE IF NOT EXISTS user (user_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT ,user_name VARCHAR(255),email VARCHAR(255),locality VARCHAR(255),pin_code int, contact_number VARCHAR(255),password TEXT,city VARCHAR(100),landmark VARCHAR(100),last_login_time DATETIME default(CURRENT_TIMESTAMP),address_json TEXT,created_at DATETIME,updated_at DATETIME)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table users created");
  });

  var sql = "CREATE TABLE IF NOT EXISTS helper (helper_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,helper_name VARCHAR(255), status VARCHAR(255),email VARCHAR(255),locality VARCHAR(255),pin_code int, contact_number VARCHAR(255),password TEXT,city VARCHAR(100),landmark VARCHAR(100),last_login_time DATETIME default(CURRENT_TIMESTAMP),address_json TEXT,created_at DATETIME,updated_at DATETIME)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table helper created");
  });

  var sql = "CREATE TABLE IF NOT EXISTS helper_config (id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT ,helper_id INT(11),config_name VARCHAR(255), config_value VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table config created");
  });

  var sql = "CREATE TABLE IF NOT EXISTS helper_service (id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT ,helper_id INT(11),service_id INT(11),contact_number VARCHAR(255),address TEXT, average_charges decimal(10,2),additional_details TEXT)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table helper_service created");
  });

  var sql = "CREATE TABLE IF NOT EXISTS user_config (id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT ,user_id INT(11),config_name VARCHAR(255), config_value VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table config created");
  });

  var sql = "CREATE TABLE IF NOT EXISTS services (service_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT , name VARCHAR(255),description TEXT,tags VARCHAR(255),average_charges FLOAT(2),images TEXT,service_type VARCHAR(255),parent_id INT(11),level INT(11),type VARCHAR(15),created_at DATETIME default(CURRENT_TIMESTAMP))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table shopify_product created");
  });

  var sql = "CREATE TABLE IF NOT EXISTS user_services (id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT ,service_id INT(11),user_id INT(11),helper_id INT(11),service_type VARCHAR(255), status VARCHAR(255),created_at DATETIME default(CURRENT_TIMESTAMP),updated_at DATETIME default(CURRENT_TIMESTAMP))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table template created");
  });

  

  //user details
  var sql="ALTER TABLE user_config ADD CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES user (user_id) ON DELETE CASCADE"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table user_config updated");
  });

  //user

  var sql="ALTER TABLE user ADD UNIQUE `unique_phone` (`contact_number`)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table user index created");
  });

  var sql="ALTER TABLE user ADD INDEX `user_idx_phone` (`contact_number`)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table user index created");
  });

  //helper
  var sql="ALTER TABLE helper_config ADD CONSTRAINT fk_helper FOREIGN KEY(helper_id) REFERENCES helper (helper_id) ON DELETE CASCADE"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table user_config updated");
  });

  //helper
  var sql="ALTER TABLE helper ADD UNIQUE `unique_phone` (`contact_number`)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table helper index created");
  });

  var sql="ALTER TABLE helper ADD INDEX `helper_idx_phone` (`contact_number`)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table helper index created");
  });
//helper services
  var sql="ALTER TABLE helper_service ADD CONSTRAINT fk_helper_id FOREIGN KEY(helper_id) REFERENCES helper (helper_id) ON DELETE CASCADE"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table helper_service updated");
  });

  //helper services
  var sql="ALTER TABLE helper_service ADD CONSTRAINT fk_service_id FOREIGN KEY(service_id) REFERENCES services (service_id) ON DELETE CASCADE"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table helper_service updated");
  });

  //user service
  var sql="ALTER TABLE user_services ADD CONSTRAINT fk_helper_id FOREIGN KEY(helper_id) REFERENCES helper (helper_id) ON DELETE CASCADE"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table user_services updated");
  });

  //user service
  var sql="ALTER TABLE user_services ADD CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES user (user_id) ON DELETE CASCADE"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table user_services updated");
  });

  //user service
  var sql="ALTER TABLE user_services ADD CONSTRAINT fk_service_id FOREIGN KEY(service_id) REFERENCES services (service_id) ON DELETE CASCADE"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table user_services updated");
  });

});