const fs = require('fs');
const path = require('path');
const { allowedNodeEnvironmentFlags } = require('process');


const parsePassports = (data) => {

  const passports = data.split('\n\n').map((passportData) => {
    const parsedPassportData = passportData.split(/[ ,\n]/g);
    const passport = {};

    for (parsedData of parsedPassportData) {
      let key, value
      [key, value] = parsedData.split(':');
      passport[key] = value;
    };

    return passport

  });

  return passports;
};


const validateHeight = (hgt) => {
  const validFormat = (/\d+(cm|in)/).test(passport.hgt);
  if (!validFormat) {
    return false;
  };
  let number, height;
  [number, unit] = hgt.match(/\d+|cm|in/g)
  
  number = Number(number);

  if (unit == 'cm') {
    return number >= 150 && number <= 193 
  } else {
    return number >= 59 && number <= 76 
  };
};


const exactValueValidation = (passportAttribute, regex) => {
  regex = RegExp(regex, 'g');

  matchedValue = passportAttribute.match(regex);

  return Boolean(matchedValue) && matchedValue[0] == passportAttribute 
};


const validationRules = (passport) => {
  const byr = String(passport.byr).length === 4 && passport.byr >= 1920 && passport.byr <= 2002;
  const iyr = String(passport.iyr).length === 4 && passport.iyr >= 2010 && passport.iyr <= 2020;
  const eyr = String(passport.eyr).length === 4 && passport.eyr >= 2020 && passport.eyr <= 2030;
  const hgt = validateHeight(passport.hgt);
  const hcl = exactValueValidation(passport.hcl, '#?[0-9a-f]{6}');
  const ecl = exactValueValidation(passport.ecl, '(amb|blu|brn|gry|grn|hzl|oth)');
  const pid = exactValueValidation(passport.pid, '[0-9]{9}');

};


const countValidPassports = (passports, neededKeys, validationFunction) => {
  let validPassports = 0
  
  for (passport of passports) {
    neededKeys.every( key => Object.keys(passport).includes(key)) ? validPassports += 1 : null;
  };

  return validPassports;
};


fs.readFile(path.join(__dirname,'puzzleInput.txt'), 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
    };

  const optionalKeys = ['cid'];
  const neededKeysPartOne = [
      'byr', 'iyr', 'eyr', 'hgt',
      'hcl', 'ecl', 'pid'
    ];

  passports = parsePassports(data);
  const numberValidPassports = countValidPassports(passports, neededKeysPartOne, null);
  console.log(numberValidPassports);
  }
);

