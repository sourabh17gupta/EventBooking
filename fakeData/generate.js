// fake-data/generate.js

const fs = require('fs');
const path = require('path');
const generateEvent = require('./generateEvent');

// Generate 20 fake events
const data = {
  events: Array.from({ length: 20 }, generateEvent),
};

//  Write to root-level data.json using correct path
const filePath = path.join(__dirname, '..', 'data.json');
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

console.log(' Fake data written to data.json in project root.');
