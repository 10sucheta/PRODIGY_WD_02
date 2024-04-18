 let currentIndex = 1;

function openContainer(direction) {
  const containers = document.querySelectorAll('.container');
  containers.forEach((container, index) => {
    container.classList.remove('active', 'prev', 'next');
    if (direction === 'prev' && index === currentIndex - 1) {
      container.classList.add('active', 'prev');
    } else if (direction === 'next' && index === currentIndex + 1) {
      container.classList.add('active', 'next');
    } else if (index === currentIndex) {
      container.classList.add('active');
    }
  });

  if (direction === 'prev') {
    currentIndex = Math.max(0, currentIndex - 1);
  } else if (direction === 'next') {
    currentIndex = Math.min(containers.length - 1, currentIndex + 1);
  }
}



let timer;
let isRunning = false;
let startTime;
        let elapsedTime = 0;
        let timerInterval;
        let lapCount = 1;

        const timeDisplay = document.getElementById("time");
        const lapTimesDisplay = document.getElementById("lapTimes");

        function start() {
            if (!isRunning) {
                isRunning = true;
                startTime = Date.now() - elapsedTime;
                lapStart = elapsedTime;
                timer = setInterval(updateTime, 10);
                document.getElementById("startBtn").disabled = true;
                document.getElementById("pauseBtn").disabled = false;
                document.getElementById("lapBtn").disabled = false;
                document.getElementById("resetBtn").disabled = false;
            } else {
                clearInterval(timer);
                isRunning = false;
                // Reset the timer
                elapsedTime = 0;
                lapStart = 0;
                updateDisplay(elapsedTime);
                start(); // Restart the timer
            }
        }
        
        
function pause() {
    isRunning = false;
    clearInterval(timer);
    document.getElementById("startBtn").disabled = false;
    document.getElementById("pauseBtn").disabled = true;
    document.getElementById("lapBtn").disabled = true;
}

function reset() {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    lapStart = 0;
    lapCounter = 1;
    document.getElementById("time").innerText = "00:00:00:00"; // Change to "00:00:00"
    document.getElementById("laps").innerHTML = "";
    document.getElementById("startBtn").disabled = false;
    document.getElementById("pauseBtn").disabled = true;
    document.getElementById("lapBtn").disabled = true;
}


// Define an array to store lap names
let lapNames = [];

// Modify lapTimer() function to add lap name input field
function lap() {
    const lapTime = elapsedTime;
    const lapDisplay = document.createElement("div");
    lapDisplay.classList.add("lap-time");
    lapDisplay.innerHTML = `<span>Lap ${lapCount}: ${formatTime(lapTime)}</span><input type="text" class="lap-name-input" placeholder="Enter custom name"> <i class="fas fa-trash-alt delete-btn" onclick="deleteLap(this)"></i>`;
    
    // Add an event listener to save the custom name when the input field loses focus
    const lapNameInput = lapDisplay.querySelector(".lap-name-input");
    lapNameInput.addEventListener("blur", () => {
        lapNames[lapCount - 1] = lapNameInput.value.trim();
    });

    document.getElementById("lapTimesContainer").prepend(lapDisplay);
    lapCount++;
}

// Modify deleteLap() function to remove lap name from lapNames array
function deleteLap(deleteIcon) {
    const lapIndex = Array.from(deleteIcon.parentNode.parentNode.children).indexOf(deleteIcon.parentNode);
    lapNames.splice(lapIndex, 1);
    deleteIcon.parentNode.remove();
}

function updateTime() {
    let currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    let formattedTime = formatTime(elapsedTime);
    document.getElementById("time").innerText = formattedTime;
}

function formatTime(time) {
    let date = new Date(time);
    let hours = date.getUTCHours().toString().padStart(2, "0");
    let minutes = date.getUTCMinutes().toString().padStart(2, "0");
    let seconds = date.getUTCSeconds().toString().padStart(2, "0");
    let milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}



function updateRealTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    let formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;

    let day = now.getDate().toString().padStart(2, "0");
    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let year = now.getFullYear();

    let formattedDate = `${day}/${month}/${year}`;

    document.getElementById("realTime").innerText = formattedTime;
    document.getElementById("realDate").innerText = formattedDate;
    document.getElementById("lapButton").addEventListener("click", lapTimer);
}
let notes = [];

function saveNote() {
    const noteInput = document.getElementById("noteInput");
    const note = noteInput.value.trim();
    if (note !== "") {
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes)); // Store notes in local storage
        displayNotes();
        noteInput.value = "";
    }
}

function displayNotes() {
    const noteDisplay = document.getElementById("noteDisplay");
    noteDisplay.innerHTML = "";
    notes.forEach((note, index) => {
        const noteElement = document.createElement("div");
        noteElement.innerHTML = `<span>Note ${index + 1}: ${note}</span><i class="fas fa-trash-alt delete-btn" onclick="deleteNote(${index})"></i>`;
        noteDisplay.appendChild(noteElement);
    });
}
function loadNotes() {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
        notes = JSON.parse(storedNotes);
        displayNotes();
    }
}

// Call loadNotes when the page loads
window.addEventListener('load', loadNotes);
function deleteNote(index) {
    notes.splice(index, 1);
    displayNotes();
}

// Update real-time every second
setInterval(updateRealTime, 1000);
// Initial update
updateRealTime();

function changeTheme() {
    const themeSelect = document.getElementById("themeSelect");
    const selectedTheme = themeSelect.value;

    document.body.classList.remove("light-theme", "dark-theme");

    if (selectedTheme === "light") {
        document.body.classList.add("light-theme");
    } else if (selectedTheme === "dark") {
        document.body.classList.add("dark-theme");
    } else {
        // Implement custom theme functionality here
    }
}
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 's':
        case 'S':
            start();
            break;
        case 'p':
        case 'P':
            pause();
            break;
        case 'l':
        case 'L':
            lap();
            break;
        case 'r':
        case 'R':
            reset();
            break;
        default:
            break;
    }
});


function startTimer() {
    console.log("startTimer() called"); // Add this line for debugging

    const hours = parseInt(document.getElementById("hours").value) || 0;
    const minutes = parseInt(document.getElementById("minutes").value) || 0;
    const seconds = parseInt(document.getElementById("seconds").value) || 0;

    countdownTime = hours * 3600 + minutes * 60 + seconds;

    countdownInterval = setInterval(updateCountdown, 1000);
}
function updateCountdown() {
    if (countdownTime <= 0) {
        clearInterval(countdownInterval);
        document.getElementById("tommy").innerText = "Your time is up!";
    } else {
        let hours = Math.floor(countdownTime / 3600);
        let minutes = Math.floor((countdownTime % 3600) / 60);
        let seconds = countdownTime % 60;

        document.getElementById("tommy").innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        countdownTime--; // Decrement the countdown time by 1 second
    }
}

function formatCountdownTime(timeInSeconds) {
    let hours = Math.floor(timeInSeconds / 3600);
    let minutes = Math.floor((timeInSeconds % 3600) / 60);
    let seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}