let loadButton = document.getElementById('loadButton')
loadButton.onclick = () => {

    async function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log('latitude: ' + latitude);
        console.log('longitude: ' + longitude);

        let APIkey = 'cc27a8d46f99850e0959f18b5fe7a4b4'

        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}&lang=ru`)
        let resJson = await res.json()

        let name = document.getElementById('name')
        name.innerText = 'Ваша локация: ' + resJson.name

        let weather = document.getElementById('weather')
        weather.innerText = 'Сейчас ' + resJson.weather[0].description

        let temp = document.getElementById('temp')
        temp.innerText = 'Температура: ' + Math.round(resJson.main.temp - 273) + ' C'

        let hum = document.getElementById('hum')
        hum.innerText = 'Влажность: ' + resJson.main.humidity + ' %'

        let press = document.getElementById('press')
        press.innerText = 'Давление: ' + Math.round(resJson.main.pressure / 1.33321995)  + ' мм. рт. ст.'

        let wind = document.getElementById('wind')
        wind.innerText = 'Ветер: ' + resJson.wind.speed  + ' м/сек'

        let picture_bg = document.getElementById('picture-bg')
        picture_bg.classList.toggle('display-none')

        let picture = document.getElementById('picture')
        picture.src = `https://openweathermap.org/img/wn/${resJson.weather[0].icon}@2x.png`

        // https://openweathermap.org/img/wn/02d@2x.png
        
        console.log(resJson);
    
      }
    
      function error() {
        status.textContent = "Невозможно получить ваше местоположение";
      }
    
      if (!navigator.geolocation) {
        status.textContent = "Geolocation не поддерживается вашим браузером";
      } else {
        status.textContent = "Определение местоположения…";
        navigator.geolocation.getCurrentPosition(success, error);
      }
}