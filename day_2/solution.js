const fs = require('fs');
const path = require('path');



const policyPasswordPoliciesChecker = (data) =>{
    const rows = data.split('\n');
    let validPasswordsOldPolicy = [];
    let validPasswordsNewPolicy = [];


    for (const row of rows) {
        let rawPolicy, password;
        [rawPolicy, password] = row.split(': ');

        let arg1, arg2, letter;
        [ arg1, arg2, letter ] = rawPolicy.split(/[-\s]+/);
        
        letterRe = RegExp(letter, 'g');
        const occurencesPolicy = password.match(letterRe)

        if ((occurencesPolicy) && (arg1 <= occurencesPolicy.length && occurencesPolicy.length <= arg2)) {
            validPasswordsOldPolicy.push(password);
        };

        if ((password[arg1 - 1] == letter && password[arg2 - 1] != letter) || 
        (password[arg1 - 1] != letter && password[arg2 - 1] == letter)) {
            validPasswordsNewPolicy.push(password);
        }

    }
    console.log(
        `Part One solution: ${validPasswordsOldPolicy.length}\nPart Two solution: ${validPasswordsNewPolicy.length}`
        )
    };  



fs.readFile( 'puzzleInput.txt', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
      }
    policyPasswordPoliciesChecker(data);
}
);