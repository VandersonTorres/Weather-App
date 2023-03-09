// VARIÁVEIS - SELETORES

const apiKey = "f76aa8d8217d6ecda49e962246fce152";
const apiCountryURL = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const tempMin = document.querySelector("#min-max span.temp-min");
const tempMax = document.querySelector("#min-max span.temp-max");
const tempFeelsElement = document.querySelector("#feels span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");
const error404 = document.querySelector(".not-found");

// FUNÇÕES - CAPTURA E AMOSTRA DOS DADOS - TRATAMENTO DE ERROS
const getWeatherData = async (city) => {
    try{
        const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
        const res = await fetch(apiWeatherURL);
        const data = await res.json();
        if (data?.cod && data.cod === "404") {
            error404.innerHTML = "";
            const paragraph = document.createElement("p");
            paragraph.innerHTML = "Oops... <br /> Não foi possível encontrar essa localidade";
            error404.appendChild(paragraph);
            error404.classList.remove("hide");
            weatherContainer.classList.add("hide");
        };
        return data;

    } catch {
        alert("Erro! Atualize a Página.")
    };
};

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = Math.round(data.main.temp);
    tempMin.innerText = (`Min. : ${Math.round(data.main.temp_min)} Cº`);
    tempMax.innerText = (`Máx. : ${Math.round(data.main.temp_max)} Cº`);
    tempFeelsElement.innerText = (`Sensação Térmica: ${data.main.feels_like}`);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed} km/h`;

    error404.classList.add("hide")
    weatherContainer.classList.remove("hide");
};

// EVENTOS
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value.trim();
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value.trim();
        showWeatherData(city);
    }
});
