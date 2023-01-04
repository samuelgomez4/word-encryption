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

message.addEventListener("keypress", (e) => {
  if (!e.key.match(/[a-z\s]/)) {
    e.preventDefault();
  }
});

message.addEventListener("paste", (e) => {
  if (!/[a-z\s]/.test(e.clipboardData.getData("text"))) {
    e.preventDefault();
  }
  // if (!e.clipboardData.getData('text').match(/[a-z\s]/)){
  //   e.preventDefault();
  // }
});

let encryptButton = document.getElementById("encrypt");
encryptButton.addEventListener("click", () => {
  if (!message.value) {
    message.value =
      "it is kind of hard to encrypt a message that does not exist mmm seems like it exists now though ";
  } else {
    message.value = encrypt(message.value);
  }
});

let decryptButton = document.getElementById("decrypt");
decryptButton.addEventListener("click", () => {
  if (!message.value) {
    message.value = "i wonder what the decryption of an empty message is";
  } else {
    message.value = decrypt(message.value);
  }
});

let copyButton = document.getElementById("copy");
copyButton.addEventListener("click", () => {
  if (!message.value) {
    navigator.clipboard.writeText("Nothing");
  } else {
    navigator.clipboard.writeText(message.value);
  }
});

let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {
  message.value = "";
});
