import connectPool from "../config/db.js";
// const table = "user_services";

async function getUserData(user_id) {
  try {
    var sql = `
    select us.*, s.name as service_name, h.helper_name, h.contact_number,
    hs.average_charges 
    from user_services as us
    left join services as s 
    on us.service_id = s.service_id
    left join helper as h
    on us.helper_id = h.helper_id
    left join helper_service as hs
    on us.helper_id = hs.helper_id
    where hs.helper_id = us.helper_id and 
    hs.service_id = us.service_id and
    us.user_id = ?;`;

    return new Promise((resolve, reject) => {
      connectPool.query(sql, [user_id], (err, resp) => {
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

async function getHelperData(helper_id) {
  try {
    var sql = `
      select us.*, s.name as service_name, u.user_name, u.contact_number, u.address_json
      from user_services as us 
      left join services as s 
      on us.service_id = s.service_id 
      left join user as u 
      on us.user_id = u.user_id 
      where us.helper_id = ?;`;

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

async function updateServiceStatusForAction(id, action) {
  try {
    var sql = `UPDATE user_services SET status = ? WHERE id = ?;`;

    return new Promise((resolve, reject) => {
      connectPool.query(sql, [action, id], (err, resp) => {
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

export default {
  getUserData,
  getHelperData,
  updateServiceStatusForAction,
};
