const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

async function waitForRFIDScan(path = 'COM3', baudRate = 9600) {
  return new Promise((resolve, reject) => {
    const port = new SerialPort({ path, baudRate }, (err) => {
      if (err) return reject(err);
    });
    const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

    const onData = (data) => {
      const trimmed = data.trim();
      const match = trimmed.match(/UID tag:\s+([0-9A-F\s]+)/i);

      if (match) {
        const latestRFID = match[1].replace(/\s+/g, '').toUpperCase(); // e.g., "8341A229"
        console.log('✅ RFID UID received:', latestRFID);

        // Cleanup and resolve
        parser.off('data', onData);
        port.close(); // Close port when done
        resolve(latestRFID);
      } else {
        console.log('❌ Ignored non-RFID data:', trimmed);
      }
    };

    parser.on('data', onData);

    port.on('error', (error) => {
      parser.off('data', onData);
      reject(error);
    });
  });
}

module.exports = waitForRFIDScan;
