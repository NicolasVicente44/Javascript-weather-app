window.addEventListener('load', () => {
    let long;
    let lat;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    let temperatureSection = document.querySelector('.temperature');

    const temperatureSpan = document.querySelector('.temperature span');




    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat}, ${long}`;

            fetch(api)
                .then(data => {
                    return data.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    //set dom elements from the api
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //formula for cel
                    let celsius = (temperature - 32) * (5 / 9);
                    // set icons 
                    setIcons(icon, document.querySelector('.icon'));


                    //convert temp to celsius from faren
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })

                })

        });


    }
    else {
        h1.textContent = "Please enable location or use a different browser";
    }


    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "black" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
})