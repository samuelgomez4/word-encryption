//We get the textarea where the user types into.
let message = document.getElementById("message");

//Transition is a division that is used to show an animation between words.
let transition = document.getElementById("transition");

// Since the textarea has rounded borders it's neccesary to wrap the textarea to include an scrollbar that fits properly.
let messageWrap = document.getElementById("wrap-textarea");

//Buttons are wrapped in another division so they can be hidden when clicking a button;
let buttons = document.getElementById("buttons");

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

//Here We create an object where every key has its correspondant encryption code.
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

//In this case We use a regex where every vowel of the sentence is replaced by whatever the callback returns. The callback returns the encryption code that corresponds to the vowel by calling the encryption object.
function encrypt(sentence) {
  let newSentence = sentence.toLowerCase().replace(/a|e|i|o|u/g, (letter) => encryption[letter]);
  return newSentence;
}

function decrypt(sentence) {
  let newSentence = sentence.toLowerCase().replace(/ai|enter|imes|ober|ufat/g, (letter) => decryption[letter]);
  return newSentence;
}

//We create a function that is used to trigger the encryption or decryption an to excecute an animation between words. Conversion means encrypt or decrypt.
function animate(conversion) {
  //If the user tries to encrypt or decrypt when the box is empty a little joke is displayed.
  if (!message.value) {
    if (conversion === encrypt) {
      message.value = "it is kind of hard to encrypt a message that does not exist mmm seems like it exists now though ";
    }
    if (conversion === decrypt) {
      message.value = "i wonder what the decryption of an empty message is";
    }
  } else {
    //When the button is clicked, the text area is hidden and the division called transition is shown. The reason to do this is because animating the text within a textarea is not possible. This is done by changing the class of the element. Each class has its own specifications in CSS. Buttons are hidden as well to prevent users from clicking them during the animation. 
    messageWrap.className = "wrap-textarea--hide";
    transition.className = "transition--show";
    buttons.className = "buttons--hide";


    //The words that are typed by the user are saved in an array.
    let unchangedWords = message.value.toLowerCase().split(" ");

    //With this loop, every word in the array is displayed in the transition area. Each word has its own division so that every word can be animated separately.
    for (const index in unchangedWords) {
      transition.innerHTML += `<div id="text${index}" class="text">${unchangedWords[index]}</div>`;
    }

    //The function encrypt or decrypt is called and the value of the textarea is changed.
    message.value = conversion(message.value);

    //Every word of the converted snetence is saved in an array.
    let changedWords = message.value.toLowerCase().split(" ");

    //With this loop the animation is triggered. Every word will be changed from the unchaged words in the first array to its correspondant in the second array.
    for (const index in changedWords) {
      //To make the animation more dynamic, every word animation takes a different time to begin. To do this a random number is generated.
      let randomTimeAnimation = (Math.random() * (1.5 - 0.5) + 0.5).toFixed(2);

      //Here the new words are displayed. Transition of each word will start taking into account the random time assigned for each word.
      document.getElementById(`text${index}`).style.animationDelay = `${randomTimeAnimation}s`;
      setTimeout(() => {
        document.getElementById(`text${index}`).textContent = changedWords[index];
      }, randomTimeAnimation * 1000 + 60); //The set time out for the word to be changed has to be mutiplied by 1000 to be converted from miliseconds to seconds. A time of 60 is added because of the keyframe in CSS (at 6% the visibility is hidden so the change of word is not noticeable).
    }

    //After the transition is completed, the division is hidden and the textarea is displayed again as well as the buttons. The transition division is reset.
    setTimeout(() => {
      messageWrap.className = "wrap-textarea";
      transition.className = "transition--hide";
      buttons.className = "buttons";
      transition.innerHTML = "";
    }, 2060);
  }
}

//This event allows title animation as soon as the page loads completely. The animation works similar to the textarea animation. Each word has a different an randomly generated animation delay.
let titleWords = document.querySelectorAll(".text--title");
window.addEventListener("load", () => {
  titleWords.forEach(word => {
    let randomTimeAnimation = (Math.random() * (1.5 - 0.5) + 0.5).toFixed(2);
    word.style.animationDelay = `${randomTimeAnimation}s`;
    
  });
})


//We create an event listener so when the encrypt button is clicked the encrypt function is triggered.
let encryptButton = document.getElementById("encrypt");
encryptButton.addEventListener("click", () => {
  animate(encrypt);
});

let decryptButton = document.getElementById("decrypt");
decryptButton.addEventListener("click", () => {
  animate(decrypt);
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
