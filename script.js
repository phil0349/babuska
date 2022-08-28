const url = "https://babushka-dd8a.restdb.io/rest/menu";
const apiKey = {
  header: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};

async function hentData() {
  const response = await fetch(url, apiKey);
  const json = await response.json();
  vis(json);
}

const main = document.querySelector("main");
const temp = document.querySelector("template").content;

function vis(json) {
  json.forEach((ret) => {
    const klon = temp.cloneNode(true);
    klon.querySelector(".billede").src = "faces/" + ret.billede;
    klon.querySelector(".ret").textContent = ret.navn;
    klon.querySelector(".info").textContent = ret.titel;
    klon.querySelector(".pris").textContent = ret.pris + "kr.";
    main.appendChild(klon);
  });
}

hentData();
