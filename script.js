let selectedCountry = null;

const countries = {
  USA: { money: 1000, oil: 50, tech: 30, food: 80, population: 330 },
  China: { money: 1000, oil: 40, tech: 40, food: 90, population: 1400 },
  Brazil: { money: 1000, oil: 20, tech: 10, food: 120, population: 210 },
};

const eventDeck = [
  "Oil Crisis",
  "Tech Boom",
  "Recession",
  "Population Surge"
];

function chooseCountry(country) {
  selectedCountry = countries[country];
  document.getElementById("country-selector").style.display = "none";
  document.getElementById("game-board").style.display = "block";
  document.getElementById("country-name").innerText = `Country: ${country}`;
  drawEconomyInfo();
}

function drawEconomyInfo() {
  const info = `
    <p>Money: $${selectedCountry.money}</p>
    <p>Oil: ${selectedCountry.oil} | Tech: ${selectedCountry.tech} | Food: ${selectedCountry.food}</p>
    <p>Population: ${selectedCountry.population}M</p>
    <button onclick="trade()">Trade</button>
    <button onclick="invest()">Invest</button>
    <button onclick="passTurn()">Pass Turn</button>
  `;
  document.getElementById("economy-info").innerHTML = info;
}

function log(msg) {
  const logBox = document.getElementById("log");
  logBox.innerHTML += `<p>${msg}</p>`;
  logBox.scrollTop = logBox.scrollHeight;
}

function trade() {
  selectedCountry.money += 100;
  selectedCountry.oil = Math.max(0, selectedCountry.oil - 5);
  log(`${selectedCountry.name} traded oil for $100.`);
  drawEconomyInfo();
}

function invest() {
  if (selectedCountry.money >= 200) {
    selectedCountry.money -= 200;
    selectedCountry.tech += 10;
    log(`${selectedCountry.name} invested in tech.`);
    drawEconomyInfo();
  } else {
    log(`${selectedCountry.name} doesn't have enough money to invest.`);
  }
}

function passTurn() {
  log(`${selectedCountry.name} passed their turn.`);
}

function nextTurn() {
  const event = eventDeck[Math.floor(Math.random() * eventDeck.length)];
  log(`<strong>Random Event:</strong> ${event}`);

  switch (event) {
    case "Oil Crisis":
      selectedCountry.money += selectedCountry.oil * 5;
      log("Oil became more valuable. Money increased based on oil reserves.");
      break;
    case "Tech Boom":
      selectedCountry.money += selectedCountry.tech * 3;
      log("Tech boom! Money increased based on tech level.");
      break;
    case "Recession":
      selectedCountry.money = Math.max(0, selectedCountry.money - 150);
      log("Recession hit! $150 lost.");
      break;
    case "Population Surge":
      selectedCountry.population += 10;
      log("Population surged by 10 million.");
      break;
  }

  drawEconomyInfo();
}
