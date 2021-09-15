import connectPool from "../config/db.js";
const table = "helper_service";

async function getHelperServices(helper_id) {
  try {
    //connectPool.input('helper_id', connectPool.VarChar, helper_id);
    var sql =
      "select " +
      table +
      ".*,services.name from " +
      table +
      " left join services on " +
      table +
      ".service_id=services.service_id where " +
      table +
      ".helper_id= ?";

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
    var sql = "INSERT IGNORE INTO " + table + " set ? ";

    return new Promise((resolve, reject) => {
      connectPool.query(sql, data, (err, resp) => {
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

async function updateName(name, helper_id) {
  try {
    if (name && helper_id) {
      var sql = "UPDATE helper set helper_name = ? where helper_id = ?";
      return new Promise((resolve, reject) => {
        connectPool.query(sql, [name, helper_id], (err, result) => {
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

async function fetchHelperByServiceId(service_id) {
  try {
    var sql = "SELECT helper_id from helper_service where service_id = ?";

    return new Promise((resolve, reject) => {
      connectPool.query(sql, [service_id], (err, resp) => {
        if (err) {
          reject(err);
        } else {
          resolve(resp);
        }
      });
    });
  } catch (e) {
    console.log(e);
  } finally {
    //if (connectPool && connectPool.end) connectPool.end();
  }
}

export default {
  getHelperServices,
  saveData,
  updateData,
  updateName,
  fetchHelperByServiceId,
};
