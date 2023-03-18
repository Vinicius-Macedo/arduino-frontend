import "../styles/scss/main.scss";
import type { AppProps } from "next/app";
import { Layout } from "../partials/Layout";
import { useState, useEffect } from "react";
import AppContext from "../components/AppContext";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoopActive, setIsLoopActive] = useState(false);
  const [isSiteContaminated, setIsSiteContaminated] = useState(false);

  const [degreesCelsius, setDegreesCelsius] = useState(0);
  const [gas, setGas] = useState(0);
  const [electricCurrent, setElectricCurrent] = useState(0);

  useEffect(() => {
    var getDataInterval: any = "";

    if (getDataInterval == "") {
      getDataInterval = setInterval(function () {
        async function getSensorsData() {
          const response = await fetch("/api/dados");
          const data = await response.json();
          setDegreesCelsius(data["temperatura"]);
          setGas(data["gas"]);
          setElectricCurrent(data["corrente"]);
        }

        getSensorsData();

        // if (!document.getElementById("arduino")) {
        //   clearInterval(getDataInterval);
        // }
      }, 5000);
    }
    
    console.log(getDataInterval);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoopActive,
        setIsLoopActive,
        isSiteContaminated,
        setIsSiteContaminated,
        degreesCelsius,
        setDegreesCelsius,
        gas,
        setGas,
        electricCurrent,
        setElectricCurrent,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}
