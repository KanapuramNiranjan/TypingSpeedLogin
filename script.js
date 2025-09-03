// ----------- Login Page Logic -----------
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Demo credentials
        if (username === "admin" && password === "admin123") {
            window.location.href = "typing.html"; // Redirect to typing page
        } else {
            document.getElementById('errorMsg').innerText = "Invalid username or password!";
        }
    });
}

// ----------- Typing Speed Test Logic -----------
if (document.getElementById('startBtn')) {
    const displayText = document.getElementById("displayText");
    const inputText = document.getElementById("inputText");
    const startBtn = document.getElementById("startBtn");
    const resetBtn = document.getElementById("resetBtn");
    const wpmDisplay = document.getElementById("wpm");
    const accuracyDisplay = document.getElementById("accuracy");

    let timer;
    let startTime;

    const texts = [
        "Typing speed tests are fun and help improve your accuracy.",
        "JavaScript is a versatile programming language for web development.",
        "Practice makes perfect, so keep typing regularly."
    ];

    inputText.disabled = true; // Disable input initially

    function startTest() {
        const randomIndex = Math.floor(Math.random() * texts.length);
        displayText.innerText = texts[randomIndex];
        inputText.disabled = false;
        inputText.value = "";
        inputText.focus();
        startTime = new Date();
        clearInterval(timer);
        timer = setInterval(calculateResults, 500);
    }

    function calculateResults() {
        const typed = inputText.value;
        const given = displayText.innerText;

        // Accuracy calculation
        let correctChars = 0;
        for (let i = 0; i < typed.length; i++) {
            if (typed[i] === given[i]) correctChars++;
        }
        const accuracy = typed.length ? Math.round((correctChars / typed.length) * 100) : 0;
        accuracyDisplay.innerText = `Accuracy: ${accuracy}%`;

        // WPM calculation
        const timeDiff = (new Date() - startTime) / 60000; // minutes
        const wordsTyped = typed.trim() ? typed.trim().split(/\s+/).length : 0;
        const wpm = timeDiff > 0 ? Math.round(wordsTyped / timeDiff) : 0;
        wpmDisplay.innerText = `WPM: ${wpm}`;

        // Stop timer if user finished typing
        if (typed === given) {
            clearInterval(timer);
            inputText.disabled = true;
        }
    }

    function resetTest() {
        clearInterval(timer);
        inputText.value = "";
        inputText.disabled = true;
        displayText.innerText = "Click Start to begin typing.";
        wpmDisplay.innerText = "WPM: 0";
        accuracyDisplay.innerText = "Accuracy: 0%";
        startTime = null;
    }

    startBtn.addEventListener("click", startTest);
    resetBtn.addEventListener("click", resetTest);
}
