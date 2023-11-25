const travailDurée = 25 * 60;
const pauseDurée = 5 * 60;

let tempsRestant = travailDurée;
let enCours = 'travail'; 
let timerInterval = null;

var alarmSound = new Audio('sons/Radial.mp3');

document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'visible') {
    miseÀJourTimer(); 
  }
});


function démarrerTimer() {
  if (!timerInterval) {
    localStorage.setItem('startTime', Date.now().toString());
    localStorage.setItem('tempsRestant', tempsRestant.toString());
    timerInterval = setInterval(miseÀJourTimer, 1000);
  }
}


function arrêterTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  localStorage.removeItem('startTime');
  localStorage.removeItem('tempsRestant');
}


function réinitialiserTimer() {
  arrêterTimer();
  tempsRestant = travailDurée;
  enCours = 'travail'; // Réinitialiser l'état à 'travail'
  afficherTemps(tempsRestant);
}

function afficherTemps(secondes) {
  const display = document.getElementById('display');
  const minutes = Math.floor(secondes / 60);
  const secondesRestantes = secondes % 60;
  display.textContent = `${minutes}:${secondesRestantes < 10 ? '0' : ''}${secondesRestantes}`;
}



let cyclesComplétés = 0;

function miseÀJourTimer() {
  var startTime = parseInt(localStorage.getItem('startTime'));
  var elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  tempsRestant = enCours === 'travail' ? travailDurée - elapsedTime : pauseDurée - elapsedTime;

  if (tempsRestant <= 0) {
    if (enCours === 'travail') {
      tempsRestant = pauseDurée;
      enCours = 'pause';
      cyclesComplétés++;
      document.getElementById('completedCycles').textContent = `Cycles Complétés: ${cyclesComplétés}`;
    } else {
      tempsRestant = travailDurée;
      enCours = 'travail';
    }
    afficherTemps(tempsRestant);
    alarmSound.play();
    arrêterTimer();
    démarrerTimer(); 
  } else {
    afficherTemps(tempsRestant);
  }
}




function afficherTemps(secondes) {
  const display = document.getElementById('display');
  const progressBarInner = document.getElementById('progressBarInner');
  const totalSecondes = enCours === 'travail' ? travailDurée : pauseDurée;
  const progress = ((totalSecondes - secondes) / totalSecondes) * 100;

  progressBarInner.style.width = `${progress}%`;

  const minutes = Math.floor(secondes / 60);
  const secondesRestantes = secondes % 60;
  display.textContent = `${minutes}:${secondesRestantes < 10 ? '0' : ''}${secondesRestantes}`;
}

function changerThème(themeName) {
    document.body.className = themeName;
  }

  window.onload = function() {
    var savedTime = localStorage.getItem('tempsRestant');
    var startTime = localStorage.getItem('startTime');
  
    if (savedTime && startTime) {
      var elapsedTime = Math.floor((Date.now() - parseInt(startTime)) / 1000);
      tempsRestant = Math.max(0, parseInt(savedTime) - elapsedTime);
  
      if (tempsRestant > 0) {
        démarrerTimer();
      } else {
        // Si le temps est écoulé, réinitialiser pour la prochaine session
        réinitialiserTimer();
      }
    }
  };


document.getElementById('start').addEventListener('click', démarrerTimer);
document.getElementById('stop').addEventListener('click', arrêterTimer);
document.getElementById('reset').addEventListener('click', réinitialiserTimer);

afficherTemps(travailDurée); // Afficher le temps initial
