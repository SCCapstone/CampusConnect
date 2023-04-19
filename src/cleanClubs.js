const fs = require('fs');

// Read JSON data from file
fs.readFile('clubs.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Parse JSON data
  const jsonData = JSON.parse(data);

  // Filter items without single-character titles
  const notSingleCharTitles = jsonData.filter(item => item.title.length !== 1);

  // Save filtered data to a new JSON file
  fs.writeFile('filteredClubs.json', JSON.stringify(notSingleCharTitles, null, 2), err => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Filtered data saved to filteredData.json');
  });
});
