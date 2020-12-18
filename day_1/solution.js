const fs = require('fs');

const parseNumbers = (data) => {
    stringNumbers = data.split('\n')
    let numbers = stringNumbers.map(element => {
        return parseInt(element)
    });
    return numbers
}

const partOne = (numbers) => {
    for (let i = 0; i < numbers.length; i++) {
        const matchigNumber = 2020 - numbers[i]
        if (numbers.includes(matchigNumber)) {
            return [numbers[i], matchigNumber]
        }
      }
}

const partTwo = (numbers) => {
    for (let number1 of numbers) {
      for (number2 of numbers) {
        const number3 = 2020 - (number1 + number2);
          if (numbers.includes(number3)) {
              return [number1, number2, number3]
          }
      }
    }};


fs.readFile( 'puzzleInput.txt', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
      }
    const numbers = parseNumbers(data)
    let partOnefirstNumber, partOnesecondNumber
    [partOnefirstNumber, partOnesecondNumber] = partOne(numbers)
    console.log('Part One Solution: ', partOnefirstNumber * partOnesecondNumber)
    let partTwofirstNumber, partTwosecondNumber, partTwothirdNumber
    [partTwofirstNumber, partTwosecondNumber, partTwothirdNumber] = partTwo(numbers)
    console.log('Part Two Solution: ', partTwofirstNumber * partTwosecondNumber * partTwothirdNumber)
});
