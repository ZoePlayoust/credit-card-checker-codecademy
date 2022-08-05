// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

// Add your functions below:
let validCards = [];
let invalidCards = [];
let invalidCardCompanies =[];

//Luhn algorithm to check credit card
var luhnChk = (function (arr) {
  return function (ccNum) {
    var len = ccNum.length,
      bit = 1,
      sum = 0,
      val;

    while (len) {
      val = parseInt(ccNum.charAt(--len), 10);
      sum += (bit ^= 1) ? arr[val] : val;
    }

    return sum && sum % 10 === 0;
  };
})([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]);

// format the array to be passed in the credit card checkeck
const validateCred = (arr) => {
  let num = arr.join("");
  return luhnChk(num);
};

// create new arrays for valid and invalid cards 
const findInvalidCards = (arr) => {
  for (i = 0; i < arr.length; i++) {
    if (validateCred(arr[i]) === false) {
      invalidCards.push(arr[i]);
    } else {
      validCards.push(arr[i]);
    }
  }
  return invalidCards
};

// Check if the invalid cards are affiliate to a company
const checkInvalidCompany = (num)=>{
 if (num !== 3 || num !== 4 || num !== 5 || num !== 6){
   return false
 }else{
   return true
 }
}

// Check which company issued invalid cards
const idInvalidCardCompanies = (arr) => {
  let amex = true;
  let visa = true; 
  let mastercard = true; 
  let discover = true; 
  for (i = 0; i < arr.length; i++) {
    if (checkInvalidCompany(arr[i][0])){
      console.log ('Company not found')
      }else if(arr[i][0] === 3 && amex) {
      invalidCardCompanies.push('Amex');
      amex = false
    } else if (arr[i][0] === 4 && visa) {
      invalidCardCompanies.push('Visa');
      visa = false
    }else if (arr[i][0] === 5 && mastercard) {
      invalidCardCompanies.push('Mastercard');
      mastercard = false
    } else if (arr[i][0] === 6 && discover) {
      invalidCardCompanies.push('Discover');
      discover === false; 
    } else {
      return null
    }
  }
  return invalidCardCompanies
};

findInvalidCards(batch);
idInvalidCardCompanies(invalidCards);

console.log(invalidCardCompanies)




