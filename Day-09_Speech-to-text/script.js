const resultElement = document.getElementById("result");
let recognition;

function startConverting() {
    if ("webkitSpeechRecognition" in window) {
        recognition = new webkitSpeechRecognition();
        setupRecognition();
        recognition.start();
    } else {
        alert("Speech Recognition not supported in this browser.");
    }
}

function setupRecognition() {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = function (event) {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = 0; i < event.results.length; i++) {
            let transcript = event.results[i][0].transcript;
            transcript = transcript.replace(/\n/g, "<br>");

            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }

        resultElement.innerHTML = finalTranscript + "<i style='color:#555'>" + interimTranscript + "</i>";
        resultElement.scrollTop = resultElement.scrollHeight;
    };
}

function stopConverting() {
    if (recognition) {
        recognition.stop();
    }
}