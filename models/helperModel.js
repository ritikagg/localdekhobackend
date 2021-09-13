//var sync = require('synchronize');
import connectPool from "../config/db.js";
const table = "helper";

async function validateUserData(phone) {
  try {
    //connectPool.input('contact_number', connectPool.VarChar, phone);
    var sql = "select * from " + table + " where contact_number= ? LIMIT 1";

    return new Promise((resolve, reject) => {
      connectPool.query(sql, [phone], (err, resp) => {
        if (err) {
          reject(err);
        } else {
          resolve(resp);
        }
      });
    });
  } finally {
    //if (connectPool && connectPool.end) connectPool.end();
  }
}

async function getUserData(helper_id) {
  try {
    //connectPool.input('helper_id', connectPool.VarChar, helper_id);
    var sql = "select * from " + table + " where id= ? LIMIT 1";

    return new Promise((resolve, reject) => {
      connectPool.query(sql, [helper_id], (err, resp) => {
        if (err) {
          reject(err);
        } else {
          resolve(resp);
        }
      });
    });
  } finally {
    //if (connectPool && connectPool.end) connectPool.end();
  }
}

async function saveData(data) {
  try {
    if (data) {
      var sql = "INSERT IGNORE INTO " + table + " set ? ";
      return new Promise((resolve, reject) => {
        connectPool.query(sql, data, (err, result) => {
          if (err) {
            console.log(data);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    } else {
      return null;
    }
  } finally {
    //if (connectPool && connectPool.end) connectPool.end();
  }
}

async function updateData(data, where) {
  try {
    if (data) {
      var sql = "UPDATE " + table + " set ? " + where;
      return new Promise((resolve, reject) => {
        connectPool.query(sql, data, (err, result) => {
          if (err) {
            console.log(data);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    } else {
      return null;
    }
  } finally {
    //if (connectPool && connectPool.end) connectPool.end();
  }
}

export default {
  getUserData,
  validateUserData,
  saveData,
  updateData,
};
