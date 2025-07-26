const messages = [
    "Oii Bia, tem um tempo que venho pensando nisso",
    "Então decidi criar coragem e dizer",
    "Só que de uma maneira um pouco mais criativa haha"
];

const typingSpeed = 100;
const pauseTime = 1000;
let messageIndex = 0;
let charIndex = 0;

const textEl = document.getElementById("text");
const overlay = document.getElementById("overlay");
const content = document.getElementById("content");

function type() {
    const message = messages[messageIndex];
    if (charIndex < message.length) {
      textEl.innerHTML = message.slice(0, charIndex + 1) + '<span class="cursor"></span>';
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {

      textEl.innerHTML = message + '<span class="cursor"></span>';
      setTimeout(() => {

        messageIndex++;
        charIndex = 0;
        if (messageIndex < messages.length) {
          textEl.innerHTML = "";
          setTimeout(type, typingSpeed);
        } else {

          overlay.style.opacity = '0';
          setTimeout(() => {
            overlay.style.display = 'none';
            content.style.display = 'flex';
            document.body.style.overflow = 'auto';
          }, 500);
        }
      }, pauseTime);
    }
}

function desvia() {
    let btn = document.querySelector(".nao");
    btn.style.position = 'absolute';
    btn.style.bottom = geraPosicao(0, 100);
    btn.style.left = geraPosicao(0, 100);
}

function geraPosicao(min, max) {
    return Math.random() * (max - min) + min + "%";
}

window.onload = () => setTimeout(type, 500);