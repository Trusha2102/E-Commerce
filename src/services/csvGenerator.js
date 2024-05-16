// utils/csvGenerator.js
const fs = require('fs');

function generateCSV(records) {
    let csv = 'Symbol,Price\n';
    records.forEach(record => {
        csv += `${record.symbol},${record.price}\n`;
    });
    return csv;
}

function saveCSV(csv) {
    fs.writeFileSync('stock_info.csv', csv);
}

module.exports = { generateCSV, saveCSV };
