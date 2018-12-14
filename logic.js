var timeout;
var slider = document.getElementById('speed')
var speed = 150;
var rare = null;
var turn = 0;

slider.addEventListener('change', function() {
  speed = (500000 - slider.value) / 1000;

  if (speed < 20) rare = 0;
  else rare = null;
})

function start() {
  stop();
  document.getElementById('tries').innerHTML = turn;
  let num = document.getElementById('number').value;
  let reg = /\d+/g
  let a;
  let str = ''
  while ((a = reg.exec(num)) !== null) {
    str += a;
  }
  if (str.length > 0)
    palindrome(split(str));
}

function stop() {
  if (timeout) {
    clearTimeout(timeout);
  }
}

function printout(arr) {
  let result = '';
  arr.forEach((val, i) => result += val + (i < arr.length - 1 ? ', ' : ''));
  return result;
}

function respond(num) {
  if (rare === null || rare % 10 === 0) {
    document.getElementById('tries').innerHTML = turn;
    document.getElementById('pal').innerHTML = printout(num);
  }
  if (!isPalindrome(num)) {
    timeout = setTimeout(() => {
      palindrome(num);
      if (rare !== null) rare++;
      turn++;
    }, speed);
  } else {
    clearTimeout(timeout)
    document.getElementById('pal').innerHTML += ' palindrome found!'
  }
}

function palindrome(num) {
  let rev = revArr(num);
  let sum = [];
  sum[0] = 0;

  for (let i = num.length - 1; i >= 0; i--) {
    let t = carry(num[i], rev[i]);
    sum[0] += t.residue;
    sum.unshift(t.carry);
  }
  if (sum[0] === 0) {
    sum.splice(0, 1);
  }
  respond(sum);
}

function reverse(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += str[str.length - 1 - i];
  }
  return result;
}

function carry(...args) {

  let sum = args.reduce((a, b) => a + b);

  let carry;
  if (Math.log10(sum) >= 10) {
   carry = firstDigit(sum);
 } else {
   carry = 0;
 }

  return {
    carry,
    residue: sum - carry * Math.pow(10, 10)
  }
}

function firstDigit(num) {
  return ~~(num / (Math.pow(10, ~~Math.log10(num))));
}

function isPalindrome(num) {
  return string(revArr(num)) == string(num);
}

function string(arr) {
  if (arr.length === 1) {
    return String(arr[0]);
  }

  return arr.reduce((a, b) => {
    if (a.length === 0) {
      return a + String(b);
    }

    let str = String(b);
    let complete = 10 - str.length;
    let prepend = '';
    for (let i = 0; i < complete; i++) {
      prepend += '0';
    }
    str = prepend + str;
    return a + str;
  });
}

function split(str) {
  let result = [];
  let start = str.length % 10;
  if (start > 0) {
    result.push(parseInt(str.slice(0, start)));
  }

  for (let i = start; i < str.length; i += 10) {
    result.push(parseInt(str.slice(i, i + 10)));
  }
  return result;
}

function revArr(arr) {
  return split(reverse(string(arr)));
}
