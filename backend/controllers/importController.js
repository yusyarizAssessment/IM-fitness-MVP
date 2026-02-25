const xlsx = require('xlsx');
const db = require('../config/db');

const importMembers = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet);

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Excel file is empty.' });
    }

    let successCount = 0;
    let errorCount = 0;

    for (const row of rows) {
      try {
        await db.query(
          'INSERT INTO members (full_name, email, phone, date_of_birth, gender, membership_type, membership_status) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [
            row.full_name || null,
            row.email || null,
            row.phone || null,
            row.date_of_birth || null,
            row.gender || 'Male',
            row.membership_type || 'Basic',
            row.membership_status || 'Active',
          ]
        );
        successCount++;
      } catch {
        errorCount++;
      }
    }

    res.json({
      message: `Import complete. ${successCount} members imported, ${errorCount} failed.`,
      successCount,
      errorCount,
    });

  } catch {
    res.status(500).json({ message: 'Server error during import.' });
  }
};

module.exports = { importMembers };