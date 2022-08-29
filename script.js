const url = "https://babushka-dd8a.restdb.io/rest/menu";
const header = document.querySelector("h2");
const apikey = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};

let filter = "alle";
let data;

const filterKnapper = document.querySelectorAll("nav button");
filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerRetter));
hentData();

function filtrerRetter() {
  filter = this.dataset.forretter;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  vis(data);
  header.textContent = this.textContent;
}

async function hentData() {
  const response = await fetch(url, apikey);
  data = await response.json();
  vis(data);
}

function vis() {
  const section = document.querySelector("section");
  const temp = document.querySelector("template").content;
  section.textContent = "";
  data.forEach((ret) => {
    console.log("Forretter", ret.forretter);
    if (filter == ret.forretter || filter == "alle") {
      const klon = temp.cloneNode(true);
      klon.querySelector(".billedeurl").src = "medium/" + ret.billede;
      klon.querySelector(".ret").textContent = ret.navn;
      klon.querySelector(".info").textContent = ret.titel;
      klon.querySelector(".pris").textContent = ret.pris + "kr.";
      section.appendChild(klon);
    }
  });
}

hentData();

/*

async function hentData() {
  const response = await fetch(url, apiKey);
  const json = await response.json();
  vis(json);
}

const section = document.querySelector("section");
const temp = document.querySelector("template").content;

function vis(json) {
  json.forEach((ret) => {
    const klon = temp.cloneNode(true);
    klon.querySelector(".billede").src = "medium/" + ret.billede;
    klon.querySelector(".ret").textContent = ret.navn;
    klon.querySelector(".info").textContent = ret.titel;
    klon.querySelector(".pris").textContent = ret.pris + "kr.";
    section.appendChild(klon);
  });
}

hentData();

*/
