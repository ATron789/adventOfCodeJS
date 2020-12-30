const fs = require('fs');
const path = require('path');


const mapArrayBuilder = (data) => {
    let mapRows = data.split('\n');
    return mapRows;
};


const treeCounter = (mapRows, incrementX, incrementY, x = 0, y = 0, treesCount = 0) => {
    
    if (x >=  mapRows[y].length) {
        x -= (mapRows[y].length)
    };

    mapRows[y][x] === '#' ? treesCount ++ : null;

    y += incrementY;
    x += incrementX;

    return  y >= mapRows.length? treesCount : treeCounter(mapRows, incrementX, incrementY,  x, y, treesCount);
};


fs.readFile(path.join(__dirname,'puzzleInput.txt'), 'utf8', (err, data) => {
    if (err) return console.log(err);
    const mapRows = mapArrayBuilder(data);
    let treeCount = treeCounter(mapRows, 3, 1);
    console.log('Part one solution: ', treeCount);

    const differentSlopes = [[1,1], [5, 1], [7, 1], [1, 2]];
    for (slopeCoor of differentSlopes) {
    treeCount *= treeCounter(mapRows, ...slopeCoor)
    };
    console.log('Part one solution: ', treeCount)
} 
);

