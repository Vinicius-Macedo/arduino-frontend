import React, { useEffect, useState } from "react";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { IoMdRefresh } from "react-icons/io";
import { OrderButton } from "../components/OrderButton";

type Filtro = "data" | "categoria" | "descrição" | "valor";

export default function historico() {
  const [inputTextValue, setInputTextValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const [selectedOrder, setSelectedOrder] = useState<Filtro>("data");
  const [fromSamllToBig, setFromSamllToBig] = useState(false);

  const [apiData, setApiData] = useState<any>([]);
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  useEffect(() => {
    // fetch data from api
    var getDataInterval = setInterval(function () {
      async function loadApiData() {
        const response = await fetch("http://127.0.0.1:8000/api/get-data");
        const data = await response.json();
        await data.forEach((element: any) => {
          element.created_at = convertToLocaleDate(element.created_at);
        });
        setApiData(await data);
        setIsApiLoaded(true);
      }

      loadApiData();

      if (!document.getElementById("historico")) {
        clearInterval(getDataInterval);
      }
    }, 5000);
  }, []);

  function convertToLocaleDate(date: any) {
    var today = new Date(date);
    var day = today.getDate() + "";
    var month = today.getMonth() + 1 + "";
    var year = today.getFullYear() + "";
    var hour = today.getHours() + "";
    var minutes = today.getMinutes() + "";
    var seconds = today.getSeconds() + "";

    day = checkZero(day);
    month = checkZero(month);
    year = checkZero(year);
    hour = checkZero(hour);
    minutes = checkZero(minutes);
    seconds = checkZero(seconds);

    return (
      day +
      "/" +
      month +
      "/" +
      year +
      " " +
      hour +
      ":" +
      minutes +
      ":" +
      seconds
    );

    function checkZero(data: any) {
      if (data.length == 1) {
        data = "0" + data;
      }
      return data;
    }
  }

  function convertToInternacionalDate(date: any) {
    var day = date.substring(0, 2);
    var month = date.substring(3, 5);
    var year = date.substring(6, 10);
    var hour = date.substring(11, 13);
    var minutes = date.substring(14, 16);
    var seconds = date.substring(17, 19);

    return (
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hour +
      ":" +
      minutes +
      ":" +
      seconds
    );
  }

  return (
    <>
      <section id={"historico"} className="mt-[123px] px-4">
        <form
          action=""
          className="flex w-full m-auto max-w-[1110px] bg-[#00294d] border-radius-10"
        >
          <input
            type="text"
            value={inputTextValue}
            onChange={(e) => setInputTextValue(e.target.value)}
            placeholder={"Digite o valor a ser buscado..."}
            className="search-field"
          />
          <select
            value={selectedFilter}
            onChange={({ target }) => setSelectedFilter(target.value)}
            className="select-field font-bold"
          >
            <option value="">selecione um filtro...</option>
            <option className="text-white" value="created_at">
              data
            </option>
            <option className="text-white" value="temperatura">
              celsius
            </option>
            <option className="text-white" value="gas">
              PPM
            </option>
            <option className="text-white" value="corrente">
              mA
            </option>
          </select>
          {/* <button className="btn-button">Pesquisar</button> */}
        </form>
        <div className="w-full max-w-[1110px] flex flex-wrap gap-8 mx-auto mt-8 justify-between">
          <div className="flex flex-wrap gap-8 ">
            <OrderButton
              onClick={() => setSelectedOrder("data")}
              selectedButton={selectedOrder}
              buttonText={"Data"}
            />
            <OrderButton
              onClick={() => setSelectedOrder("categoria")}
              selectedButton={selectedOrder}
              buttonText={"Categoria"}
            />
            <OrderButton
              onClick={() => setSelectedOrder("descrição")}
              selectedButton={selectedOrder}
              buttonText={"Descrição"}
            />
            <OrderButton
              onClick={() => setSelectedOrder("valor")}
              selectedButton={selectedOrder}
              buttonText={"Valor"}
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setFromSamllToBig(false)}
              className={
                "select-order-btn" + (fromSamllToBig == false ? " active" : "")
              }
            >
              <GoArrowUp />
            </button>
            <button
              onClick={() => setFromSamllToBig(true)}
              className={
                "select-order-btn" + (fromSamllToBig == true ? " active" : "")
              }
            >
              <GoArrowDown />
            </button>
            <button
              onClick={() => [
                setFromSamllToBig(false),
                setSelectedOrder("data"),
                setSelectedFilter(""),
                setInputTextValue(""), // reset all filters
              ]}
              className={"select-order-btn"}
            >
              <IoMdRefresh />
            </button>
          </div>
        </div>

        <table className="arduino-data-table">
          <thead>
            <tr>
              <th className="text-left">Data</th>
              <th className="text-left">Celsius</th>
              <th className="text-left">PPM</th>
              <th className="text-left">mA</th>
            </tr>
          </thead>
          <tbody>
            {isApiLoaded ? (
              apiData
                .sort(function (a: any, b: any) {
                  switch (selectedOrder) {
                    case "data":
                      a = new Date(convertToInternacionalDate(a.created_at));
                      b = new Date(convertToInternacionalDate(b.created_at));
                      break;
                    case "categoria":
                      a = a.category;
                      b = b.category;
                      break;
                    case "descrição":
                      a = a.gas;
                      b = b.gas;
                      break;
                    case "valor":
                      a = a.corrente;
                      b = b.corrente;
                      break;
                    default:
                      break;
                  }

                  if (fromSamllToBig) {
                    return a - b;
                  } else {
                    return b - a;
                  }
                })
                // .filter((item: any) => {
                //   return inputTextValue.toLowerCase() == ""
                //     ? item
                //     : item[selectedFilter]
                //         .toString()
                //         .toLowerCase()
                //         .includes(inputTextValue);
                // })
                .map((item: any) => (
                  <tr key={item.id}>
                    <td className="w-2/5">{item.created_at}</td>
                    <td className="w-1/5">{item.temperatura}</td>
                    <td className="w-1/5">{item.gas}</td>
                    <td className="w-1/5">{item.corrente}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td className="w-2/5">Carregando...</td>
                <td className="w-1/5">Carregando...</td>
                <td className="w-1/5">Carregando...</td>
                <td className="w-1/5">Carregando...</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}
