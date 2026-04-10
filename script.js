const cartes = document.querySelectorAll(".carte");
const bouton = document.getElementById("jeu");
const timerElement = document.getElementById("Temps");

let premiereCarte = null;
let deuxiemeCarte = null;
let verrou = false;
let jeuactif=false;

let temps = 60;
let interval;

// 🎮 Bouton jouer
bouton.addEventListener("click", () => {
  melangerCartes();
  demarrerTimer();
  jeuactif=true;
});

// 🔀 Mélanger les cartes
function melangerCartes() {
  cartes.forEach(carte => {
    let position = Math.floor(Math.random() * 16);
    carte.style.order = position;
  });
}

// 🖱️ Clique sur carte
cartes.forEach(carte => {
  carte.addEventListener("click", () => {
    if(!jeuactif)return;
    if (verrou || carte === premiereCarte) return;
    carte.classList.add("retournee");

    if (!premiereCarte) {
      premiereCarte = carte;
    } else {
      deuxiemeCarte = carte;
      verrou = true;

      verifierMatch();
    }
  });
});

// 🔍 Comparaison
function verifierMatch() {
  let match = premiereCarte.getAttribute("photo") === deuxiemeCarte.getAttribute("photo");

  if (match) {
    premiereCarte = null;
    deuxiemeCarte = null;
    verrou = false;

    verifierVictoire();

  } else {
    setTimeout(() => {
      premiereCarte.classList.remove("retournee");
      deuxiemeCarte.classList.remove("retournee");

      premiereCarte = null;
      deuxiemeCarte = null;
      verrou = false;
    }, 800);
  }
}

// 🏆 Victoire
function verifierVictoire() {
  let toutes = document.querySelectorAll(".carte.retournee");

  if (toutes.length === cartes.length) {
    clearInterval(interval);
    alert("🎉 Bravo ! Tu as gagné !");
  }
}

// ⏱️ Timer
function demarrerTimer() {
  interval = setInterval(() => {
    temps--;
    timerElement.innerText = temps;

    if (temps <= 0) {
      clearInterval(interval);
      alert("💀 Game Over !");
      location.reload();
    }
    if (temps <= 10) {
  timerElement.style.color = "red";
  timerElement.classList.add("clignote");
}
  }, 1000);
}