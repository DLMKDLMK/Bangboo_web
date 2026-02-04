const $d = document,
  $bnt = $d.querySelector(".links"),
  $grid = $d.querySelector(".bangboos"),
  $loader = $d.querySelector(".loader"),
  $carrusel = $d.querySelector(".carrusel"),
  $next = $d.querySelector(".next"),
  $before = $d.querySelector(".before"),
  $totalbangboos = $d.querySelector("#total-bangboos");

const bangboos_languaje_ES =[
  {"english": "Agent Gulliver", "spanish": "Agente Gulliver"},
  {"english": "Amillion", "spanish": "Amillion"},
  {"english": "Avocaboo", "spanish": "Aguacabú"},
  {"english": "Baddieboo", "spanish": "Malotebú"},
  {"english": "Bagboo", "spanish": "Bolsabú"},
  {"english": "Bangvolver", "spanish": "Revolverbú"},
  {"english": "Belion", "spanish": "Rocaleón"},
  {"english": "Bild N. Boolok", "spanish": "Bloquebú"},
  {"english": "Sharkboo", "spanish": "Tiburónbú"},
  {"english": "Snap", "spanish": "Snap"},
  {"english": "Sprout", "spanish": "Pimpollo"},
  {"english": "Sumoboo", "spanish": "Sumobú"},
  {"english": "Paperboo", "spanish": "Cartonbú"},
  {"english": "Boollseye", "spanish": "Dianabú"},
  {"english": "Booressure", "spanish": "Valvulabú"},
  {"english": "Cryboo", "spanish": "Lloronbú"},
  {"english": "Devilboo", "spanish": "Belcebú"},
  {"english": "Electroboo", "spanish": "Electrobú"},
  {"english": "Exploreboo", "spanish": "Explorabú"},
  {"english": "Magnetiboo", "spanish": "Magnebú"},
  {"english": "Knightboo", "spanish": "Caballerobú"},
  {"english": "Brawlerboo", "spanish": "Peleabú"},
  {"english": "Overtimeboo", "spanish": "Currabú"},
  {"english": "Excaliboo", "spanish": "Excalibú"},
  {"english": "Mercury", "spanish": "Mercurio"},
  {"english": "Miss Esme", "spanish": "Señorita Esme"},
  {"english": "Officer Cui", "spanish": "Oficial Cui"},
  {"english": "Safety", "spanish": "Amparo"},
  {"english": "Rocketboo", "spanish": "Ecobú"},
  {"english": "Plugboo", "spanish": "Cablebú"},
  {"english": "Red Moccus", "spanish": "Moccus Rojo"},
  {"english": "Resonaboo", "spanish": "Resonabú"},
  {"english": "Penguinboo", "spanish": "Pingüinobú"},
  {"english": "Luckyboo", "spanish": "Suertebú"},
  {"english": "Butler", "spanish": "Mayordomobú"},
  {"english": "Robin", "spanish": "Robín"},
  {"english": "Biggest Fan", "spanish": "Fan Número Uno"},
  {"english": "Birkblick", "spanish": "Birkblick"}
]

const bangboos = [];
const displaybangboos = [];
const displaynumber = 7; // Number of bangboos to display
let numberbangboo = 0; // Starting index of bangboo to display
let selectedIndex = 1;


const url = "https://corsproxy.io/?" + 
            "https://api.hakush.in/zzz/data/bangboo.json"


function ajax(options) {
  const { url, method, fExito, fError, data } = options;

  fetch(url, {
    method: method || "GET",
    headers: {
      "Content-type": "applications/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => (resp.ok ? resp.json() : Promise.reject(resp)))
    .then((json) => fExito(json))
    .catch((error) =>
      fError({
        status: error.status,
        statusText: error.statusText || "feach error",
      })
    );
}
function getData() {
    ajax({
        url: url,
        method: "GET",
        fExito: (json) => {
            console.log(json);
            let id =1
             Object.values(json).forEach(bangboo => {
                bangboos.push({
                            id: id++,
                            name: bangboo.EN,
                            desc: bangboo.desc,
                            rank: bangboo.rank === 4 ? "S" : "A",
                            img: extractNumber(bangboo.icon)
                        })
             })
            displayData(bangboos, numberbangboo)
            selectedBangboo(selectedIndex)
            $totalbangboos.textContent =  bangboos.length;
        },
        fError: console.error
    })
}
function translateToSpanish(nameEnglish) {
  const bangbooES = bangboos_languaje_ES.find(bangboo => bangboo.english === nameEnglish);
  return bangbooES ? bangbooES.spanish : nameEnglish;
}

function extractNumber(icon) {
  const match = icon.match(/(\d+)\.png$/)
  if (!match) return null

  const number = match[1]
  return `https://api.hakush.in/zzz/UI/BangbooGarageRole${number}.webp`
}

function displayData (data, numberbangboo) {
    const displaybangboos = data.slice(numberbangboo, numberbangboo + displaynumber)
    $grid.innerHTML = displaybangboos.map(el=>
        `
    <li class="bangboo" data-id=${el.id}>
        <figure class="rank-container">
          <img class="rank-icon" src="https://zzz.gg/_ipx/q_70&s_34x34/images/ItemRarity${el.rank}.png" alt="Rank ${el.rank}">
        </figure>
        <img src=${el.img}>
        <p>${translateToSpanish(el.name)}</p>
        
    </li>
        `
    ).join('')
  } 

  function renderCard(bangboo) {
    const cardContainer = $d.querySelector(".card");
    cardContainer.innerHTML = `
      <li class="top-card" >
        <figure class="rank-container">
          <img class="rank-icon" src="https://zzz.gg/_ipx/q_70&s_34x34/images/ItemRarity${bangboo.rank}.png" alt="Rank ${bangboo.rank}">
        </figure>
        <h3 id="bangboo-name">${translateToSpanish(bangboo.name)}</h3>
      </li>
      <li>
        <figure class="image-container">
          <img id="bangboo-image" src="${bangboo.img}" alt="${bangboo.name}">
        </figure>
      </li>
      <li>
        <p class="bangboo-description">${bangboo.desc}</p>
      </li>
    `;
  }

  function selectedBangboo(selectedIndex) {
    const bangboosItems = $d.querySelectorAll(".bangboo");
    bangboosItems.forEach(item => item.classList.remove("selected"));
    const selectedBangboo = $d.querySelector(`.bangboo[data-id="${selectedIndex}"]`);

    const bangboo = bangboos.find(b => b.id === selectedIndex);
    if (bangboo) {
      renderCard(bangboo);
    }

    if (selectedBangboo) {
      selectedBangboo.classList.add("selected");
    }
  }

$d.addEventListener("DOMContentLoaded",ev=>{
    getData()
    
    
})

$carrusel.addEventListener("click", ev => {
  ev.preventDefault();

  // Busca el li más cercano con clase carruselbtn
  const btn = ev.target.closest(".carruselbtn");

  if (btn) {
    if (btn == $before && !btn.classList.contains("btndisabled")) {
      numberbangboo--;
    }
    if (btn == $next && !btn.classList.contains("btndisabled")) {
      numberbangboo++;
    }

    // Actualizar estado de botones
    if (numberbangboo >= bangboos.length - displaynumber) {
      $next.classList.add("btndisabled");
    } else {
      $next.classList.remove("btndisabled");
    }

    if (numberbangboo > 0) {
      $before.classList.remove("btndisabled");
    } else {
      $before.classList.add("btndisabled");
    }

    displayData(bangboos, numberbangboo);
    selectedBangboo(selectedIndex);
  }

  // Detectar click en Bangboo
  const bangboo = ev.target.closest(".bangboo");
  if (bangboo) {
    selectedIndex = parseInt(bangboo.dataset.id);
    selectedBangboo(selectedIndex);
  }
});
