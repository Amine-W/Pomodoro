// Durées par défaut en secondes (25 minutes pour le travail, 5 minutes pour la pause)
const travailDurée = 25 * 60;
const pauseDurée = 5 * 60;

let tempsRestant = travailDurée;
let enCours = false;
let timerInterval = null;

function démarrerTimer() {
  if (!enCours) {
    enCours = true;
    timerInterval = setInterval(miseÀJourTimer, 1000);
  }
}

function miseÀJourTimer() {
  if (tempsRestant > 0) {
    tempsRestant--;
    afficherTemps(tempsRestant);
  } else {
    arrêterTimer();
    // Alterner entre les périodes de travail et de pause
    tempsRestant = (tempsRestant === travailDurée) ? pauseDurée : travailDurée;
    démarrerTimer();
  }
}

function arrêterTimer() {
  clearInterval(timerInterval);
  enCours = false;
}

function réinitialiserTimer() {
  arrêterTimer();
  tempsRestant = travailDurée;
  afficherTemps(tempsRestant);
}

function afficherTemps(secondes) {
  const minutes = Math.floor(secondes / 60);
  const secondesRestantes = secondes % 60;
  console.log(`${minutes}:${secondesRestantes < 10 ? '0' : ''}${secondesRestantes}`);
}

// Exemple d'utilisation
démarrerTimer(); // Pour démarrer
// arrêterTimer(); // Pour arrêter
// réinitialiserTimer(); // Pour réinitialiser
