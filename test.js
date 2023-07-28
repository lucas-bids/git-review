//JavaScript program to swap two variables

//take input from the users
let a = prompt('Enter the first variable: ');
let b = prompt('Enter the second variable: ');

//create a temporary variable
let temp;

//swap variables
temp = a;
a = b;
b = temp;

console.log(`The value of a after swapping: ${a}`);
console.log(`The value of b after swapping: ${b}`);

// program to check an Armstrong number of three digits

let sum = 0;
const number = prompt('Enter a three-digit positive integer: ');

// create a temporary variable
let temp2 = number;
while (temp2 > 0) {
    // finding the one's digit
    let remainder = temp2 % 10;

    sum += remainder * remainder * remainder;

    // removing last digit from the number
    temp2 = parseInt(temp2 / 10); // convert float into integer
}
// check the condition
if (sum == number) {
    console.log(`${number} is an Armstrong number`);
}
else {
    console.log(`${number} is not an Armstrong number.`);
}

// program to check an Armstrong number of n digits

// take an input
const number2 = prompt("Enter a positive integer");
const number2OfDigits = number2.length;
let sum1 = 0;

// create a temporary variable
let temp3 = number2;

while (temp3 > 0) {

    let remainder = temp3 % 10;

    sum1 += remainder ** number2OfDigits;

    // removing last digit from the number2
    temp3 = parseInt(temp3 / 10); // convert float into integer
}

if (sum1 == number2) {
    console.log(`${number2} is an Armstrong number2`);
}
else {
    console.log(`${number2} is not an Armstrong number.`);
}