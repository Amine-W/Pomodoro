const travailDurée = 25 * 60;
const pauseDurée = 5 * 60;

let tempsRestant = travailDurée;
let enCours = 'travail'; 
let timerInterval = null;

var alarmSound = new Audio('sons/Radial.mp3');

function démarrerTimer() {
  if (!timerInterval) { 
    timerInterval = setInterval(miseÀJourTimer, 1000);
  }
}

function arrêterTimer() {
  clearInterval(timerInterval);
  timerInterval = null; // Réinitialiser timerInterval à null
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
  if (tempsRestant > 0) {
    tempsRestant--;
    afficherTemps(tempsRestant);
  } else {
    alarmSound.play();
    arrêterTimer();

    if (enCours === 'travail') {
      tempsRestant = pauseDurée;
      enCours = 'pause';
    } else {
      tempsRestant = travailDurée;
      enCours = 'travail';
      cyclesComplétés++;
      document.getElementById('completedCycles').textContent = `Cycles Complétés: ${cyclesComplétés}`;
    }

    afficherTemps(tempsRestant);
    démarrerTimer();
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


document.getElementById('start').addEventListener('click', démarrerTimer);
document.getElementById('stop').addEventListener('click', arrêterTimer);
document.getElementById('reset').addEventListener('click', réinitialiserTimer);

afficherTemps(travailDurée); // Afficher le temps initial
