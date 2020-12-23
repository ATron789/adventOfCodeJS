const { count } = require('console');
const fs = require('fs');
const path = require('path');

const mapArrayBuilder = (data) => {
    let mapRows = data.split('\n');
    return mapRows;
};

const treeCounter = (mapRows, y = 0, x = 0, treesCount = 0) => {
    
    if (x >=  mapRows[y].length) {
        x -= (mapRows[y].length)
    };

    mapRows[y][x] === '#' ? treesCount ++ : null;

    y += 1;
    x += 3;

    return  y >= mapRows.length? treesCount : treeCounter(mapRows, y, x, treesCount);
};


fs.readFile(path.join(__dirname,'puzzleInput.txt'), 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
      }
      const mapRows = mapArrayBuilder(data);
      const partOne = treeCounter(mapRows);
      console.log(`Part one solution: ${partOne}`)
}
);

