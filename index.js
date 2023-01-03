const encryption = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};
const decryption = {
  ai: "a",
  enter: "e",
  imes: "i",
  ober: "o",
  ufat: "u",
};
let sentence = "Hola como estas?";

function encrypt(sentence) {
  let newSentence = sentence
    .toLowerCase()
    .replace(/a|e|i|o|u/g, (letter) => encryption[letter]);
  return newSentence;
}

function decrypt(sentence) {
  let newSentence = sentence
    .toLowerCase()
    .replace(/ai|enter|imes|ober|ufat/g, (letter) => decryption[letter]);
  return newSentence;
}

encrypted = encrypt(sentence);
console.log(encrypted);

decrypted = decrypt(encrypted);
console.log(decrypted);
