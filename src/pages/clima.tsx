import React, { ReactNode, useEffect, useState } from "react";

export default function Clima() {
  const [isApiLoaded, setisApiLoaded] = useState(false);
  const [apiData, setApiData] = useState({
    name: "",
    main: {
      temp: "",
      feels_like: "",
    },
    wind: {
      speed: "",
    },
    visibility: "",
    sys: {
      sunrise: "",
      sunset: "",
    },
  });

  useEffect(() => {
    async function getApiData() {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Limeira%2CBR-SP%2CBRA&units=metric&lang=pt-br&appid=a3484a72f8725c551ae3e51383dd9dc5"
      );

      setApiData(await response.json());
    }
    getApiData();
  }, []);

  function secondsToDate(time: any) {
    var date = new Date(time * 1000);
    return date.getHours() + ":" + date.getMinutes();
  }

  console.log(secondsToDate(apiData["sys"]["sunrise"]));

  return (
    <>
      <section id="temperatura">
        <div className="temperatura-container">
          <div className="temperatura-atual">
            <div className="temperatura-principal">
              {apiData["main"]["temp"]}°
            </div>
            <div className="temperatura-sensacao">
              Sensação térmica de {apiData["main"]["feels_like"]}ºC
            </div>
          </div>
          <div className="temperatura-dados">
            <div className="space-between">
              <p className="temperatura-dado">Velocidade do Vento:</p>
              <p className="temperatura-dado">{apiData["wind"]["speed"]}m/s</p>
            </div>
            <div className="space-between">
              <p className="temperatura-dado">Visibilidade:</p>
              <p className="temperatura-dado">{apiData["visibility"]}m</p>
            </div>
            <div className="space-between">
              <p className="temperatura-dado">Nascer do sol:</p>
              <p className="temperatura-dado">
                {secondsToDate(apiData["sys"]["sunrise"])}
              </p>
            </div>
            <div className="space-between">
              <p className="temperatura-dado">Pôr do sol</p>
              <p className="temperatura-dado">
                {secondsToDate(apiData["sys"]["sunset"])}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="mapa">
        <div className="mapa-container">
          <h1 className="default-title mapa-h1">Limeira SP</h1>
        </div>
        <div className="map-wrapper">
          <iframe
            className="googlemap"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58944.16479442728!2d-47.44948928069572!3d-22.578718102831253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c88055b6df0dc3%3A0x1b0ef5f339809ecd!2sLimeira%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1655720178521!5m2!1spt-BR!2sbr"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  );
}
