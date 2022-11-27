import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";


export default function Index() {
  const [currentImage, setcurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleSlider(true);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage > 1]);

  function handleSlider(isClockWise: boolean) {
    if (isClockWise) {
      if (currentImage >= 2) {
        setcurrentImage(0);
      } else {
        setcurrentImage((currentImage) => currentImage + 1);
      }
    } else {
      if (currentImage == 0) {
        setcurrentImage(2);
      } else {
        setcurrentImage((currentImage) => currentImage - 1);
      }
    }
  }

  return (
    <>
      <section id="hero">
        <div className="hero-container">
          <img
            className="hero-img"
            src="/img/ilu-arduino.png"
            alt="Ilustração da placa de arduino"
          />
          <article className="hero-text-section">
            <h1 className="hero-h1 default-title">
              Monitoramento remoto de parâmetros físicos
            </h1>
            <p className="text-white-base hero-p">
              Monitoramento remoto de parâmetros físicos do laboratório da
              Faculdade de Tecnologia
            </p>
            <Link href="/sensor" className="hero-button">
              Saber mais
            </Link>
          </article>
        </div>
        <img
          className="hero-wave-ilu"
          src="/img/ilu-wave.svg"
          alt="ilustração indicando fim da página"
        />
      </section>
      <section id="carrosel">
        <h2 className="default-title">Meu Campus</h2>
        <div className="max-container-slider">
          <div className="icons-slider-container">
            <div
              className="icon-container right"
              id="icon-left"
              onClick={() => handleSlider(false)}
            >
              <img
                className="icon"
                src="/img/icon-arrow.svg"
                alt="ilustração de seta apontando para o lado esquerdo"
              />
            </div>
            <div
              className="icon-container"
              id="icon-right"
              onClick={() => handleSlider(true)}
            >
              <img
                className="icon"
                src="/img/icon-arrow.svg"
                alt="ilustração de seta apontando para o lado direito"
              />
            </div>
          </div>
          <div className="slider-container">
            <ul
              className="slider-ul"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <li className="slider-li">
                <figure className="slider-img-container">
                  <img
                    src="/img/logoHome.png"
                    alt="Imagem com o logo e texto da Faculdade de Tecnologia"
                  />
                </figure>
                <figcaption className="slider-img-caption">
                  Faculdade de Tecnologia
                </figcaption>
              </li>
              <li className="slider-li">
                <figure className="slider-img-container">
                  <img
                    src="/img/Ft.jpg"
                    alt="Foto da UNICAMP - Faculdade de Tecnologia"
                  />
                </figure>
                <figcaption className="slider-img-caption">
                  UNICAMP-FT
                </figcaption>
              </li>
              <li className="slider-li">
                <figure className="slider-img-container">
                  <img
                    src="/img/lab.jpg"
                    alt="Foto do laboratório de telecomunicações - Faculdade de Tecnologia"
                  />
                </figure>
                <figcaption className="slider-img-caption">
                  Laboratório de Telecomunicações - FT
                </figcaption>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section id="materiais-metodos">
        <h1 className="default-title materias-metodos-h1">
          Materias e métodos do TCC
        </h1>
        <h2 className="materias-metodos-h2">Objetivos do projeto</h2>
        <p className="text-white-base materias-metodos-p">
          O objetivo geral do trabalho é o estudo e a partir de um
          microcontrolador arduino e de um sistema de sensoriamento de gás,
          temperatura para aplicar de uma forma prática toda essa motivação.
          Projetar tais sistemas para que exerçam sua função em tempo real,
          durante todo o período anual, buscando sempre uma economia de custos,
          energias e um aumento da eficiência e segurança de um laboratório.
        </p>
      </section>
      <section id="materias-utilizados">
        <h1 className="materias-utilizados-h1 default-title">
          Materiais Utilizados
        </h1>
        <ul id="slider-list" className="materiais-utilizados-ul">
          <li className="materiais-utilizados-li">
            <figure>
              <div className="materiais-utilizados-container-img">
                <img src="/img/material-1.jpg" alt="Nome do Material" />
              </div>
              <figcaption className="materiais-utlizados-caption">
                Sensor de Gás
              </figcaption>
            </figure>
          </li>
          <li className="materiais-utilizados-li">
            <figure>
              <div className="materiais-utilizados-container-img">
                <img src="/img/material-2.jpg" alt="Nome do Material" />
              </div>
              <figcaption className="materiais-utlizados-caption">
                Buzzer
              </figcaption>
            </figure>
          </li>
          <li className="materiais-utilizados-li">
            <figure>
              <div className="materiais-utilizados-container-img">
                <img src="/img/material-3.jpg" alt="Nome do Material" />
              </div>
              <figcaption className="materiais-utlizados-caption">
                Sensor de corrente
              </figcaption>
            </figure>
          </li>
          <li className="materiais-utilizados-li">
            <figure>
              <div className="materiais-utilizados-container-img">
                <img src="/img/material-4.jpg" alt="Nome do Material" />
              </div>
              <figcaption className="materiais-utlizados-caption">
                Sensor de temperatura
              </figcaption>
            </figure>
          </li>
          <li className="materiais-utilizados-li">
            <figure>
              <div className="materiais-utilizados-container-img">
                <img src="/img/material-5.jpg" alt="Nome do Material" />
              </div>
              <figcaption className="materiais-utlizados-caption">
                Arduino
              </figcaption>
            </figure>
          </li>
          <li className="materiais-utilizados-li">
            <figure>
              <div className="materiais-utilizados-container-img">
                <img src="/img/material-6.jpg" alt="Nome do Material" />
              </div>
              <figcaption className="materiais-utlizados-caption">
                Protoboard
              </figcaption>
            </figure>
          </li>
        </ul>
      </section>
    </>
  );
}
