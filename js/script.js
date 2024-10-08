import { fetchUrlsImg } from "./config_firebase.js";

var playersHTML = "";

const heroLevel = {
  1: "primary",
  2: "warning",
  3: "danger",
};

document.getElementById("themeToggleBtn").addEventListener("click", () => {
  const htmlElement = document.documentElement;
  const currentTheme = htmlElement.getAttribute("data-bs-theme");
  const iconElement = document.querySelector("#themeToggleBtn img");

  if (currentTheme === "dark") {
    htmlElement.setAttribute("data-bs-theme", "light");
    iconElement.setAttribute("src", "content/svg/light_mode.svg");
  } else {
    htmlElement.setAttribute("data-bs-theme", "dark");
    iconElement.setAttribute("src", "content/svg/dark_mode.svg");
  }
});

document.getElementById("inputSearch").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const cards = document.querySelectorAll(".blacklist-list .card");

  cards.forEach((card) => {
    const playerName = card
      .querySelector(".card-player-info h2")
      .textContent.toLowerCase();
    if (playerName.includes(searchTerm)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
});

fetchUrlsImg()
  .then((r) => {
    window["objURLHero"] = r[0];
    generateHtml(r[0], r[1]);
  })
  .catch((error) => {
    console.error("Error al obtener las URLs de las imágenes:", error);
  });

function generateHtml(hero_url, json_url) {
  fetch(json_url, {
    origin: ["*"],
    method: ["GET"],
    maxAgeSeconds: "360000000",
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((player) => {
        playersHTML += `
      <div class="card card-body flex-row gap-3 my-3">
              <div class="card-player-info w-25">
                <h2>${player.player_name}</h2>
                <span class="h5">Rank: </span><span>${player.player_rank}</span>
              </div>
              <div class="card-heroes-info w-75 align-self-center">
                <div class="hero-container w-auto">`;
        player.heroes.forEach((hero) => {
          playersHTML += `
          <button type="button" class="btn w-auto rounded-circle btn-${
            heroLevel[hero.level]
          } m-1" data-bs-toggle="popover"
            data-bs-title="${hero.name}"
            data-bs-content="${hero.pop_description}" style="padding: 2px;">
            <img class="rounded-circle" width="55px" src="${
              hero_url[hero.name]
            }" alt="">
          </button>`;
        });

        playersHTML += `</div>
                  <div class="hero-extra text-center">
                    <button class="btn btn-outline-success w-50 my-3" id="button_${player.player_name}" onclick="getPlayerInfo('${player.player_name}')">Ver mas
                      datos...</button>
                        </div>
                      </div>
                    </div>
                    <div id="${player.player_name}_player_details"
                    </div>
                  </div>
                  </div>`;

        document.querySelector(".blacklist-list").innerHTML = playersHTML;

        const popoverTriggerList = document.querySelectorAll(
          '[data-bs-toggle="popover"]'
        );
        const popoverList = [...popoverTriggerList].map(
          (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
        );
      });
    })
    .catch((error) => {
      console.error("Error al leer el JSON:", error);
    });
}
