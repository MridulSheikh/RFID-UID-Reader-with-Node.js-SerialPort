# 🔐 RFID UID Reader with Node.js & SerialPort

This project is a Node.js (Express) server that connects to an RFID scanner through a serial port (like Arduino with MFRC522). It reads UID tags and returns them on request—perfect for authentication, attendance tracking, access control, and other IoT applications.

---

## 📦 Features

- ✅ Reads RFID UID via serial port (e.g., COM3 or /dev/ttyUSB0)
- 🧹 Filters non-UID serial data and formats the UID properly
- 🔄 Real-time UID scanning endpoint via Express API
- 🛠 Easy to integrate with any authentication or database system

---

## 🛠️ Requirements

- Node.js v14 or higher
- An RFID module (e.g., MFRC522) with Arduino or compatible microcontroller
- USB connection to PC (Serial COM port)

---

## 📁 Installation & Setup

```bash
# Clone the project
git clone https://github.com/MridulSheikh/RFID-UID-Reader-with-Node.js-SerialPort.git

# Go to server folder
cd RFID-UID-Reader-with-Node.js-SerialPort/server
npm install
npm start


# Optionally go to client folder if you build a frontend
cd ../client-side
npm install
npm run dev

## 🖼️ RFID Arduino Wiring Diagram

> 📷 Arduino to RFID (MFRC522) connection diagram  

| RFID Pin | Arduino Pin |
|----------|-------------|
| SDA      | D10         |
| SCK      | D13         |
| MOSI     | D11         |
| MISO     | D12         |
| GND      | GND         |
| RST      | D9          |
| 3.3V     | 3.3V        |

> ⚠️ Important: Do NOT use 5V with MFRC522, use 3.3V to avoid hardware damage.