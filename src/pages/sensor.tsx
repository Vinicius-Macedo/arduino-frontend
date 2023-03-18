import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import AppContext from "../components/AppContext";

export default function Sensor() {
  const [electricCurrent, setElectricCurrent] = useState(0);

  const context = useContext(AppContext);
  const reacordApiDataRef = useRef<any>();

  useEffect(() => {
    if (context.isLoopActive) {
      reacordApiDataRef.current = setInterval(async function () {
        async function recordApiData() {
          const response = await fetch("http://127.0.0.1:8000/api/record-data");
          const data = await response.json();
          return data["status"];
        }

        if ((await recordApiData()) == "success") {
          console.log("Os dados estão sendo gravados...");
        } else {
          console.log("Ocorreu um erro ao chamar a API!");
          context.setIsLoopActive(false);
          clearInterval(reacordApiDataRef.current);
        }
      }, 10000);
    } else {
      console.log("Os dados não estão sendo gravados.");
      clearInterval(reacordApiDataRef.current);
    }
  }, [context.isLoopActive]);

  function celsiusToFahrenheit(sensor: any) {
    return (sensor * 1.8 + 32).toFixed(2);
  }

  function handleSensorBallColor(
    sensorValue: any,
    min: number,
    medium: number
  ) {
    const greenColorHexa = "#66ff33";
    const yellowColorHexa = "#ffff00";
    const redColorHexa = "#ff0000";

    if (sensorValue <= min) {
      return greenColorHexa;
    } else if (sensorValue <= medium) {
      return yellowColorHexa;
    } else {
      context.setIsSiteContaminated(true);
      return redColorHexa;
    }
  }

  function handleSensorBallColorPPM(sensorValue: any) {
    const greenColorHexa = "#66ff33";
    const yellowColorHexa = "#ffff00";
    const redColorHexa = "#ff0000";

    if (sensorValue <= 700) {
      return greenColorHexa;
    } else if (sensorValue <= 1100) {
      return yellowColorHexa;
    } else {
      context.setIsSiteContaminated(true);
      return redColorHexa;
    }
  }

  function handleSensorBallColorCelsius(sensorValue: any) {
    const greenColorHexa = "#66ff33";
    const yellowColorHexa = "#ffff00";
    const redColorHexa = "#ff0000";

    if (sensorValue < 0) {
      return redColorHexa;
    } else if (sensorValue <= 9) {
      return yellowColorHexa;
    } else if (sensorValue <= 29) {
      return greenColorHexa;
    } else if (sensorValue <= 39) {
      return yellowColorHexa;
    } else {
      context.setIsSiteContaminated(true);
      return redColorHexa;
    }
  }

  return (
    <>
      <section id="arduino">
        <figure className="ilu-abstract">
          <img
            height={"304"}
            width={"304"}
            src={"/img/ilu-abstract-left.svg"}
            alt={"Ilustrção abstrata"}
          />
        </figure>
        <figure className="ilu-abstract right">
          <img
            height={"120"}
            width={"120"}
            src={"/img/ilu-abstract-right.svg"}
            alt={"Ilustrção abstrata"}
          />
        </figure>
        <h1 className="default-title arduino-h2">Controle Arduino</h1>
        <div className="sensors-container">
          <div className="sensor-item">
            <img
              height={20}
              width={10}
              src={"/img/icon-thermomeeter.svg"}
              alt={"icone de termômetro"}
            />
            <h2 className="sensor-h2">Sensor de temperatura</h2>
            <div className="sensor-values-container">
              <div className="sensor-parameter">
                <p className="sensor-p">Graus Celsius</p>
                <p className="sensor-value">
                  {context.degreesCelsius}&ordm;&nbsp;
                  <span>
                    <BsCircleFill
                      size={10}
                      color={handleSensorBallColorCelsius(
                        context.degreesCelsius
                      )}
                    />
                  </span>
                </p>
              </div>
              <div className="sensor-parameter">
                <p className="sensor-p">Graus Fahrenheit</p>
                <p className="sensor-value">
                  {celsiusToFahrenheit(context.degreesCelsius)}&nbsp;
                  <span>
                    <BsCircleFill
                      size={10}
                      color={handleSensorBallColorCelsius(
                        context.degreesCelsius
                      )}
                    />
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="sensor-item">
            <img
              height={20}
              width={10}
              src={"/img/icon-gas.svg"}
              alt={"icone de termômetro"}
            />

            <h2 className="sensor-h2">Sensor de gás</h2>
            <div className="sensor-values-container">
              <div className="sensor-parameter">
                <p className="sensor-p">Valor do gás</p>
                <p className="sensor-value">
                  {context.gas} PPM&nbsp;
                  <span>
                    <BsCircleFill
                      size={10}
                      color={handleSensorBallColorPPM(context.gas)}
                    />
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="sensor-item">
            <img
              height={20}
              width={20}
              src={"/img/icon-eletricity.svg"}
              alt={"icone de raio"}
            />

            {/* <img src="assets/img/icon-eletricity.svg" alt=""> */}
            <h2 className="sensor-h2">Sensor da corrente</h2>
            <div className="sensor-values-container">
              <div className="sensor-parameter">
                <p className="sensor-p">Valor da corrente </p>

                <p className="sensor-value">
                  {context.electricCurrent} mA&nbsp;
                  <span>
                    <BsCircleFill
                      size={10}
                      color={handleSensorBallColor(
                        context.electricCurrent,
                        40,
                        44
                      )}
                    />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full gap-16 flex-wrap mt-32">
          <button
            className={
              context.isLoopActive
                ? "bg-[#00294D] hover:bg-[#003666] text-white font-bold px-16 py-4 rounded cursor-pointer w-[270px] text-center"
                : "bg-[#00294D] hover:bg-[#003666] text-white font-bold px-16 py-4 rounded cursor-pointer w-[270px] text-center"
            }
            onClick={() => context.setIsLoopActive(!context.isLoopActive)}
          >
            {context.isLoopActive ? "Gravando..." : "Gravar histórico de dados"}
          </button>
          <Link
            className="bg-[#00294D] hover:bg-[#003666] text-white font-bold px-16 py-4 rounded cursor-pointer w-[270px] text-center"
            href={"/historico"}
          >
            Visualizar histórico
          </Link>
        </div>
      </section>
      <div id="overlay"></div>
    </>
  );
}
