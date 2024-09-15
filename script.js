const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time span b')
const mistakes = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button')

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;



function loadParagraph() {
    const paragraph = [" Avoid daydreaming about the years to come.", "You are the most important person in your whole life.", "Always be true to who you are, and ignore what other people have to say about you.", "Always be true to who you are, and ignore what other people have to say about you.", "Only demonstrate your strength when it’s really required."
    ]

    const randomIndex = Math.floor(Math.random() * paragraph.length);
    typingText.innerHTML = '';
    // typingText.innerHTML = paragraph[randomIndex];

    for (const char of paragraph[randomIndex]) {
        // console.log(char);
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown', () => input.focus())
    typingText.addEventListener("click", () => {
        input.focus()
    })
}

// Handle User Input
function initTyping() {
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if (charIndex < char.length && timeLeft > 0) {

        if (!isTyping) {
            timer = setInterval(initTime, 1000);
            isTyping = true
        }

        if (char[charIndex].innerText === typedChar) {
            char[charIndex].classList.add('correct');
            // console.log('correct');
        } else {
            mistake++;
            char[charIndex].classList.add('incorrect');
            // console.log('incorrect');
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;
    } else {
        clearInterval(timer)
        input.value = ''
    }
}

function initTime() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
        let wpmval = Math.round(((charIndex - mistake) / 5) / (maxTime - timeLeft) * 60);
        wpm.innerText = wpmval;
    } else {
        clearInterval(timer);
    }
}

function reset() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    time.innerText = maxTime;
    mistakes.innerText = 0;
    cpm.innerText = 0;
    wpm.innerText = 0;

}

input.addEventListener("input", initTyping);

btn.addEventListener("click", reset);

loadParagraph();





/* Code from Claude AI
const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const timeEl = document.querySelector('.time span b')
const mistakesEl = document.querySelector('.mistake span')
const wpmEl = document.querySelector('.wpm span')
const cpmEl = document.querySelector('.cpm span')
const btn = document.querySelector('button')

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

function loadParagraph() {
    const paragraphs = [
        "Avoid daydreaming about the years to come.",
        "You are the most important person in your whole life.",
        "Always be true to who you are, and ignore what other people have to say about you.",
        "Only demonstrate your strength when it's really required.",
        "Subscribe to Drop X Out"
    ];

    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = '';
    paragraphs[randomIndex].split("").forEach(char => {
        typingText.innerHTML += `<span>${char}</span>`;
    });
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown', () => input.focus());
    typingText.addEventListener('click', () => input.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);

    if (charIndex < characters.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if (typedChar == null) {
            charIndex--;
            if (characters[charIndex].classList.contains('incorrect')) {
                mistakes--;
            }
            characters[charIndex].classList.remove('correct', 'incorrect');
        } else {
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add('correct');
            } else {
                mistakes++;
                characters[charIndex].classList.add('incorrect');
            }
            charIndex++;
        }

        characters.forEach(span => span.classList.remove('active'));
        characters[charIndex].classList.add('active');

        mistakesEl.innerText = mistakes;
        cpmEl.innerText = charIndex - mistakes;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmEl.innerText = wpm;
    } else {
        input.value = "";
        clearInterval(timer);
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeEl.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    input.value = "";
    timeEl.innerText = timeLeft;
    wpmEl.innerText = 0;
    mistakesEl.innerText = 0;
    cpmEl.innerText = 0;
}

loadParagraph();
input.addEventListener('input', initTyping);
btn.addEventListener('click', resetGame);

*/