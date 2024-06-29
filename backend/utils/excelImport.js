const multer = require('multer');
const xlsx = require('xlsx');
const Data = require('../models/Data');

const upload = multer({ dest: 'uploads/' });

exports.importExcel = (req, res) => {
  const file = req.file;
  const workbook = xlsx.readFile(file.path);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet);

  rows.forEach(async (row) => {
    await Data.create({
      actionType: row['ActionType'],
      actionName: row['ActionName'],
    });
  });

  res.json({ message: 'Data imported' });
};
