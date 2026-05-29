import { useState } from "react";
import "./FinalGift.css";
import fotoAmiga from "../assets/foto.png";

export default function FinalGift() {
    const [isPhotoFlipped, setIsPhotoFlipped] = useState(false);

  function handleFlipPhoto() {
    setIsPhotoFlipped(true);
  }
  return (
    <div className="final-gift">
      <div className="final-card">
        <span className="final-icon">🎂</span>

        <div className="letter">
          <h1>Feliz aniversário Thoryy! 🥳</h1>

          <p>
            Hoje é um dia muito especial, porque é o dia de celebrar a pessoa
            incrível, maravlhosa e divonica que você é.
          </p>

          <p>
            E também não é todo dia que alguém faz 20 aninhos, hein? 
            Aproveita muito essa fase.
          </p>

          <p>
            Que seu novo ciclo seja cheio de momentos leves, boas risadas,
            conquistas, carinho, pessoas que te façam bem, comida e muitas viagens.
          </p>

          <p>
            Fiz esse pequeno presente virtual com muito carinho, para te lembrar
            que sua amizade é muito importante para mim.
          </p>

          <h2>Você merece tudo de melhor! 💛</h2>
        </div>

        <div
          className={`polaroid-wrapper ${isPhotoFlipped ? "flipped" : ""}`}
          onClick={handleFlipPhoto}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              handleFlipPhoto();
            }
          }}
        >
          <div className="polaroid-card">
            <div className="polaroid-face polaroid-back">
              <p>Clique para virar</p>
            </div>

            <div className="polaroid-face polaroid-front">
              <img src={fotoAmiga} alt="Foto especial" />
              <p>Uma lembrança especial 📸</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}