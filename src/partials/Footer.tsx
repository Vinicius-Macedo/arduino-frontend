import React, { useContext } from "react";
import AppContext from "../components/AppContext";

export function Footer() {
  const context = useContext(AppContext);

  return (
    <footer className="footer">
      <p className="footer-p">Monitoramento remoto de parâmetros físicos</p>
      <p className="footer-p">Projeto | UNICAMP</p>

      <div id="popup" className={context.isSiteContaminated ? "open" : ""}>
        <div className="alert-container">
          <img
            className="alert-img"
            src="/img/exclamacao-triangulo.svg"
            alt="Exclamação alerta"
          />
          <article className="alert-article">
            <p className="alert-title">Perigo - Local Contaminado</p>
            <p className="alert-text">
              Por favor, sair do laboratório imediatamente e entre em contato
              com o técnico responsável
            </p>
          </article>
          {/* <div className="buttons-container">
            <button
              onClick={() => context.setIsSiteContaminated(false)}
              className="alert-button"
              id="option-2"
            >
              Fechar
            </button>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
