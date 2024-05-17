const fs = require('fs');

function generateCSV(records) {
    let csv = 'productId,available_items\n';

    records.forEach(record => {
        csv += `${record.productId},${record.available_items}\n`;
    });

    return csv;
}

function saveCSV(csv) {
    fs.writeFileSync('stock_info.csv', csv);
}

module.exports = { generateCSV, saveCSV };
