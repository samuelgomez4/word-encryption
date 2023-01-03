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
let message = document.getElementById("message");

let encryptButton = document.getElementById("encrypt");
encryptButton.addEventListener("click", () => {
  message.value = encrypt(message.value);
});

let decryptButton = document.getElementById("decrypt");
decryptButton.addEventListener("click", () => {
  message.value = decrypt(message.value);
});

let copyButton = document.getElementById("copy");
copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(message.value);
});
