let currentSection;
let timerValue = 0; 
let timerInterval;
let competitionData;

function loadPage() {
  currentSection = document.getElementById('scoreboard');
  currentSection.style.display = 'block';
  setTimeout(() => currentSection.style.opacity = 1, 50);
  startTimer();

  axios.get('./file.json')
  .then(response => {
    competitionData = response.data;
    displayCompetitionData();
  })
  .catch(error => console.error('Error fetching data:', error));
}

function handleSections() {
  currentSection.style.opacity = 0;

  if (currentSection.id === 'versus') {
    currentSection = document.getElementById('scoreboard');
    timerValue = 0; 
    startTimer(); 
  } else {
    currentSection = document.getElementById('versus');
    clearInterval(timerInterval); 
  }

  currentSection.style.display = 'block';
  setTimeout(() => currentSection.style.opacity = 1, 50);
}

function startTimer() {
    clearInterval(timerInterval);
  
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes());
  
    const initialTimerValue = currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds();
    timerValue = initialTimerValue;
    updateTimerDisplay();

    timerInterval = setInterval(function () {
      timerValue = (timerValue + 1) % (24 * 3600); 
      updateTimerDisplay();

      // Alerta a los 45 minutos
      if (timerValue === initialTimerValue + 2700) {
        clearInterval(timerInterval);
        alert("Time out!");
      }
    }, 1000);
  }
  
  function updateTimerDisplay() {
    const hours = Math.floor(timerValue / 3600);
    const minutes = Math.floor((timerValue % 3600) / 60);
    const seconds = timerValue % 60;
    document.getElementById('timer').innerText = `Time: ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  }
  
  function formatTime(value) {
    return value < 10 ? `0${value}` : value;
  }

function displayCompetitionData() {
  document.getElementById('competition').innerText = `Competition: ${competitionData.competition}`;
}

// Opción B: función que cuenta 45 minutos desde ahora
// function startTimer() {
//   clearInterval(timerInterval); 
//   updateTimerDisplay(); 

//   timerInterval = setInterval(function() {
//     timerValue++;
//     updateTimerDisplay();
//   }, 1000);
// }

// function updateTimerDisplay() {
//   const minutes = Math.floor(timerValue / 60);
//   const seconds = timerValue % 60;
//   document.getElementById('timer').innerText = Time: ${formatTime(minutes)}:${formatTime(seconds)};
// }

// function formatTime(value) {
//   return value < 10 ? 0${value} : value;
// }

loadPage();
