const fs = require('fs');
const path = require('path');
const { allowedNodeEnvironmentFlags } = require('process');


const parsePassports = (data) => {

  const passports = data.split('\n\n').map((passportData) => {
    const parsedPassportData = passportData.split(/[ ,\n]/g);
    const passport = {};

    for (parsedData of parsedPassportData) {
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


const checkValidationRules = (passport) => {
  const byr = passport.byr.length === 4 && Number(passport.byr) >= 1920 && Number(passport.byr) <= 2002;
  if (!byr) return false
  const iyr = passport.iyr.length === 4 && Number(passport.iyr) >= 2010 && Number(passport.iyr) <= 2020;
  if (!iyr) return false
  const eyr = passport.eyr.length === 4 && Number(passport.eyr) >= 2020 && Number(passport.eyr) <= 2030;
  if (!eyr) return false
  const hgt = validateHeight(passport.hgt);
  if (!hgt) return false
  const hcl = exactValueValidation(passport.hcl, '#{1}[0-9a-f]{6}');
  if (!hcl) return false
  const ecl = exactValueValidation(passport.ecl, '(amb|blu|brn|gry|grn|hzl|oth)');
  if (!ecl) return false
  const pid = exactValueValidation(passport.pid, '[0-9]{9}');
  return pid 
};


const validatePassports = (passports) => {
  let validPassports = []
  for (passport of passports) {
    if (checkValidationRules(passport)) validPassports.push(passport)
  };
  return validPassports;
};


const collectPassportsWithAllKeys = (passports, neededKeys) => {

  let validPassports = []
  
  for (passport of passports) {
    neededKeys.every( key => Object.keys(passport).includes(key)) ? validPassports.push(passport) : null;
  };
  return validPassports;
};


fs.readFile(path.join(__dirname,'puzzleInput.txt'), 'utf8', (err, data) => {
  if (err) return console.log(err);

  const neededKeysPartOne = [
      'byr', 'iyr', 'eyr', 'hgt',
      'hcl', 'ecl', 'pid'
    ];

  passports = parsePassports(data);

  const passportsWithAllKeys = collectPassportsWithAllKeys(passports, neededKeysPartOne);
  console.log('Part one Solution: ', passportsWithAllKeys.length);

  const validPassports = validatePassports(passportsWithAllKeys);
  console.log('Part two Solution: ', validPassports.length);
  }
);

