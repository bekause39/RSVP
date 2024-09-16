// database configuration
import db from "../config/index.js";


export class Guest {

  async createGuest(req, res) {
    let inviteCode = Math.floor(1000 + Math.random() * 9000);
    let detail = req.body
    detail.invite_code = inviteCode
    const qryStr = "INSERT INTO guests SET ?;";
    db.query(qryStr, [detail], (err) => {
      if (err) {
        res.status(401).json({ err });
        return;
      }
      res.status(200).json({ msg: "Guest added" });
    });

    // sql query
  }
  fetchGuests(req, res) {
    const qryStr = `
          SELECT *
          FROM guests;
          `;

    db.query(qryStr, (err, data) => {
      if (err) throw err;
      res.status(200).json({
        results: data,
      });
    });
  }

  // fetch Vehicle
  fetchGuest(req, res) {

    const qryStr = `
          SELECT *
          FROM guests
          WHERE invite_code = ?;
          `;

    db.query(qryStr, [req.params.id], (err, data) => {
      if (err) throw err;
      res.status(200).json({
        results: data,
      });
    });
  }
  updateGuest(req, res) {
    let data = req.body;
    const qryStr = `
              UPDATE guests
              SET ?
              WHERE invite_code = ?;`;

    db.query(qryStr, [data, req.params.id], (err) => {
      if (err) throw err;
      res.status(200).json({
        msg: "Guest record has been updated.",
      });
    });
  }

  confirmAttendance(req, res) {
    const qryStr = `
              UPDATE guests
              SET attendance_confirm = 1
              WHERE invite_code = ?;`;

    db.query(qryStr, [req.params.id], (err) => {
      if (err) throw err;
      res.status(200).json({
        msg: "Attendance confirmed",
      });
    });
  }
  
}


