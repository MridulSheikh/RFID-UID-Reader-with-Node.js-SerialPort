const waitForRFIDScan = require("../utils/serialListener");

const getRFID = async (req, res) => {
  try {
    console.log('Waiting for RFID scan...');
    const rfid = await waitForRFIDScan('COM3', 9600);

    if (!rfid) {
      return res.status(404).json({ error: 'No RFID scanned.' });
    }

    return res.json({ rfid });
  } catch (error) {
    console.error('Error reading RFID:', error);
    return res.status(500).json({ error: 'Failed to read RFID.' });
  }
};

module.exports = {
  getRFID,
};
