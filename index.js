//Here We create an object where every key has its correspondant encryption code
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
//In this case We use a regex where every vowel of the sentence is replaced by whatever the callback returns. In this case the callback returns the encryption code that corresponds to the vowel by calling the encryption object. 
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

//We get the value of what the user types into the textarea of the html.
let message = document.getElementById("message"); 

//The challenge proposes that only lowercase letters can be used. With this event we prevent the user from typing whatever is not a letter. We allow also the user to type uppercase letters but these are transform into lowercase using CSS for displaying and using .toLowerCase() for the actual value. The regular expression also includes the space key. 
message.addEventListener("keypress", (e) => {
  if (!e.key.match(/[a-zA-Z\s]/)) { 
    e.preventDefault();
  }
});

// Similar to above, We prevent the user from pasting characters that are not letters. For these we use a regex that means that whatever is not a letter is replaced by "". The input event is triggered when the input changes.
message.addEventListener("input", (e) => {
  message.value = message.value.replace(/[^a-zA-Z\s]/g, "");
});

//We create an event listener to click so when the encrypt button is clicked the encrypt function is triggered. In this case if the user tries to encrypt when the box is empty a little joke is displayed.
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

//This event copies whatever is currently in the box. If empty, a little joke is copied to let the user know that nothing was in the box.
let copyButton = document.getElementById("copy");
copyButton.addEventListener("click", () => {
  if (!message.value) {
    navigator.clipboard.writeText("Nothing");
  } else {
    navigator.clipboard.writeText(message.value);
  }
});

//This event resets the textarea and makes it empty again. 
let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {
  message.value = "";
});
