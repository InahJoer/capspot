document.addEventListener("DOMContentLoaded", () => {
  const equiposContainer = document.getElementById("equipos-container");
  const partidosContainer = document.getElementById("partidos-container");

  equiposContainer.innerHTML = "Cargando equipos...";
  partidosContainer.innerHTML = "Cargando partidos...";

  fetch("https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=NBA")
    .then(res => {
      if (!res.ok) throw new Error("Error en respuesta equipos");
      return res.json();
    })
    .then(data => {
      equiposContainer.innerHTML = "";
      data.teams.forEach(team => {
  
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <h3>${team.strTeam}</h3>
          <p>${team.strStadium}</p>
        `;
        equiposContainer.appendChild(card);
      });

      return fetch("https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=4387");
    })
    .then(res => {
      if (!res.ok) throw new Error("Error en respuesta partidos");
      return res.json();
    })
    .then(data => {
      partidosContainer.innerHTML = "";
      data.events.forEach(event => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <h3>${event.strEvent}</h3>
          <p>Fecha: ${event.dateEvent} Hora: ${event.strTime}</p>
          <p>Estadio: ${event.strVenue || "N/A"}</p>
        `;

        partidosContainer.appendChild(card);
      });
    })
    .catch(err => {
      equiposContainer.innerHTML = "<p>Error cargando equipos.</p>";
      partidosContainer.innerHTML = "<p>Error cargando partidos.</p>";
      console.error(err);
    });
});
