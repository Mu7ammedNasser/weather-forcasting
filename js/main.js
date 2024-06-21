let searchInput = document.getElementById("searchInput");

async function forcasting() {
  try {
    let res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=43013aada4304d9cbe495659241306&q=${searchInput.value}&days=4`
    );
    let data = await res.json();
    displayForcasting(data);
  } catch (err) {
    console.log(err);
  }
}

searchInput.addEventListener("input", function () {
  forcasting();
});

function formatDate(dateStr) {
  let date = new Date(dateStr);
  let dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  let formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  return { dayName, formattedDate };
}

function displayForcasting(arr) {
  let dayAndDate0 = formatDate(arr.forecast.forecastday[1].date);
  let dayAndDate1 = formatDate(arr.forecast.forecastday[2].date);
  let dayAndDate2 = formatDate(arr.forecast.forecastday[3].date);

  let box = `
    <div class="col-lg-4">
      <div class="item">
        <div class="card-head d-flex justify-content-between px-1 py-2">
          <p>${dayAndDate0.dayName}</p>
          <p>${dayAndDate0.formattedDate}</p>
        </div>
        <div class="card-body">
          <h4>${arr.location.name}</h4>
          <div class="d-flex justify-content-between px-1 py-2">
            <p class="temp">${arr.current.temp_c}<sup>o</sup>C</p>
            <img class="current" src="${arr.current.condition.icon}" alt="weather icon">
          </div>
          <p class="weather-status">${arr.current.condition.text}</p>
          <div class="wind-details">
            <span><img src="media/icon-umberella.png" alt="umbrella">${arr.current.cloud}%</span>
            <span><img src="media/icon-wind.png" alt="wind">${arr.current.wind_kph}km/h</span>
            <span><img src="media/icon-compass .png" alt="compass">${arr.current.wind_dir}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-4">
      <div class="item item-2">
        <div class="card-head d-flex justify-content-center px-1 py-2">
          <p>${dayAndDate1.dayName}</p>
        </div>
        <div class="card-body text-center">
          <img class="current" src="${arr.forecast.forecastday[1].day.condition.icon}" alt="weather icon">
          <p>${arr.forecast.forecastday[1].day.avgtemp_c}<sup>o</sup>C</p>
          <p class="weather-status">${arr.forecast.forecastday[1].day.condition.text}</p>
        </div>
      </div>
    </div>

    <div class="col-lg-4">
      <div class="item item-3">
        <div class="card-head d-flex justify-content-center px-1 py-2">
          <p>${dayAndDate2.dayName}</p>
        </div>
        <div class="card-body text-center">
          <img class="current" src="${arr.forecast.forecastday[2].day.condition.icon}" alt="weather icon">
          <p>${arr.forecast.forecastday[2].day.avgtemp_c}<sup>o</sup>C</p>
          <p class="weather-status">${arr.forecast.forecastday[2].day.condition.text}</p>
        </div>
      </div>
    </div>
  `;

  document.querySelector("#forcasting").innerHTML = box;
}
