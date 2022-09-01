const url = "https://babushka-dd8a.restdb.io/rest/menu";
const header = document.querySelector("h2");
const mereinfo = {
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
  const response = await fetch(url, mereinfo);
  data = await response.json();
  vis(data);
}

function vis(data) {
  const main = document.querySelector("main");
  const temp = document.querySelector("template").content;
  main.textContent = "";
  data.forEach((ret) => {
    //console.log("kategori", ret.kategori);
    if (filter == ret.kategori || filter == "alle") {
      const klon = temp.cloneNode(true);
      klon.querySelector("article").addEventListener("click", () => visRet(ret));
      klon.querySelector(".billedeurl").src = "retter/" + ret.billednavn + "-md.jpg";
      klon.querySelector(".kategori").textContent = ret.kategori;
      klon.querySelector(".kortBeskrivelse").textContent = ret.kortbeskrivelse;
      klon.querySelector(".navn").textContent = ret.navn;
      klon.querySelector(".pris").textContent = ret.pris + "kr.";
      main.appendChild(klon);
    }
  });
}

document.querySelector("#luk").addEventListener("click", () => (popup.style.display = "none"));

function visRet(retData) {
  console.log(retData);
  const popup = document.querySelector("#popup");
  popup.style.display = "flex";
  popup.querySelector("h2").textContent = retData.navn;
  popup.querySelector("p").textContent = retData.langbeskrivelse;
  popup.querySelector("p+p").textContent = retData.oprindelsesregion;
  popup.querySelector("img").src = "faces/" + retData.billedenavn + "-md.jpg";
  popup.querySelector("h3").textContent = retData.pris + "kr.";
  popup.addEventListener("click", () => (popup.style.display = "none"));
  main.appendChild(popup);
}

hentData();
