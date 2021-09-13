//var sync = require('synchronize');
import connectPool from "../config/db.js";
const table = "user";

async function validateUserData(phone) {
  try {
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
    // if (connectPool && connectPool.end) connectPool.end();
  }
}

async function createRequestService(data) {
  try {
    var values = [[data.user_id, data.service_id, data.helper_id, "pending"]];
    var sql = `INSERT into user_services (
      user_id,
      service_id,
      helper_id,
      status
      )
      VALUES ?;
      `;
    return new Promise((resolve, reject) => {
      connectPool.query(sql, [values], (err, resp) => {
        if (err) {
          reject(err);
        } else {
          resolve(resp);
        }
      });
    });
  } finally {
    // if (connectPool && connectPool.end) connectPool.end();
  }
}

async function updateUserDetails(data) {
  try {
    // var values = [[data.user_id, data.user_name, data.location, data.pin_code]];
    var sql = `UPDATE user SET user_name = ? , address_json = ? , pin_code = ? WHERE user_id = ?;`;

    return new Promise((resolve, reject) => {
      connectPool.query(
        sql,
        [data.user_name, data.location, data.pin_code, data.user_id],
        (err, resp) => {
          if (err) {
            reject(err);
          } else {
            resolve(resp);
          }
        }
      );
    });
  } finally {
    // if (connectPool && connectPool.end) connectPool.end();
  }
}

async function getUserData(merchant_id) {
  try {
    connectPool.input("merchant_id", connectPool.VarChar, merchant_id);
    var sql = "select * from " + table + " where id= @merchant_id LIMIT 1";

    return new Promise((resolve, reject) => {
      connectPool.query(sql, (err, resp) => {
        if (err) {
          reject(err);
        } else {
          resolve(resp);
        }
      });
    });
  } finally {
    if (connectPool && connectPool.end) connectPool.end();
  }
}

async function getAllUsers() {
  try {
    var sql = "select * from " + table + " where 1";

    return new Promise((resolve, reject) => {
      connectPool.query(sql, (err, resp) => {
        if (err) {
          reject(err);
        } else {
          resolve(resp);
        }
      });
    });
  } finally {
    if (connectPool && connectPool.end) connectPool.end();
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

export default {
  getAllUsers,
  getUserData,
  validateUserData,
  saveData,
  createRequestService,
  updateUserDetails,
};
