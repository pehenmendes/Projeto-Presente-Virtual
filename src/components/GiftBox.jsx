import { useState } from "react";
import confetti from "canvas-confetti";
import "./GiftBox.css";
import FinalGift from "./FinalGift";

export default function GiftBox() {
  const [clicks, setClicks] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSpawningNext, setIsSpawningNext] = useState(false);
  const [currentGift, setCurrentGift] = useState(1);

  const maxClicks = 20;

  const totalGifts = 5;

  const giftThemes = [
  "pink",
  "purple",
  "blue",
  "green",
  "orange",
  "red",
  "cyan",
  "gold",
  ];

  function getShakeLevel() {
    if (clicks < 5) return "shake-level-1";
    if (clicks < 10) return "shake-level-2";
    if (clicks < 15) return "shake-level-3";
    return "shake-level-4";
  }

  function launchConfetti() {
    confetti({
      particleCount: 130,
      spread: 90,
      origin: {
        x: 0.5,
        y: 0.55,
      },
    });

    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 130,
        origin: {
          x: 0.5,
          y: 0.6,
        },
      });
    }, 250);
  }

  function handleClick() {
    if (isShaking || isOpen || isSpawningNext) return;

    const newClicks = clicks + 1;

    setClicks(newClicks);
    setIsShaking(true);

    setTimeout(() => {
      setIsShaking(false);

      if (newClicks >= maxClicks) {
        openGift();
      }
    }, 500);
  }

  function openGift() {
    setIsOpen(true);
    launchConfetti();

    if (currentGift < totalGifts) {
      setTimeout(() => {
        setIsSpawningNext(true);
      }, 1800);

      setTimeout(() => {
        setCurrentGift((prev) => prev + 1);
        setClicks(0);
        setIsOpen(false);
        setIsSpawningNext(false);
      }, 3600);
    }
  }

  const isFinished = currentGift >= totalGifts && isOpen;
  if (isFinished) {
    return <FinalGift />;
  }

  const currentTheme = giftThemes[(currentGift - 1) % giftThemes.length];
  const nextTheme = giftThemes[currentGift % giftThemes.length];

  const progressPercentage = (clicks / maxClicks) * 100;

  return (
    <div className="gift-container">
      {currentGift == 1 ? (
        <p className="gift-title">
          Você recebeu um presente do Mendes! 🎁😁
        </p>
        ) : currentGift == 2 ? (
        <p className="gift-title">
          Uau, outro presente! O que será dessa vez? 🤔
        </p>
        ) : currentGift == 3 ? (
        <p className="gift-title">
          Mais um presente! Será que é algo especial? 😲
        </p>
        ) : currentGift == 4 ? (
        <p className="gift-title">
          Nossa, quantos presentes será que tem? 😶
        </p>
        ) : (
        <p className="gift-title">
          Quase lá! Mais um presente! 😜
        </p>
        )
      }

      <button
        className={`
        gift-box
        gift-${currentTheme}
        ${isShaking ? getShakeLevel() : ""}
        ${isOpen ? "open" : ""}
        `}
        onClick={handleClick}
        disabled={isOpen || isSpawningNext}
        aria-label="Abrir presente"
      >
        <div className="gift-shadow" />

        <div className="gift-lid">
          <div className="lid-ribbon" />
        </div>

        <div className="gift-bow">
          <span className="bow-left" />
          <span className="bow-center" />
          <span className="bow-right" />
        </div>

        <div className="gift-body">
          <div className="ribbon-vertical" />
          <div className="ribbon-horizontal" />
        </div>

        {isSpawningNext && (
          <div className={`next-gift gift-${nextTheme}`}>
            <div className="next-gift-lid">
              <div className="next-lid-ribbon" />
            </div>

            <div className="next-gift-bow">
              <span className="next-bow-left" />
              <span className="next-bow-center" />
              <span className="next-bow-right" />
            </div>

            <div className="next-gift-body">
              <div className="next-ribbon-vertical" />
              <div className="next-ribbon-horizontal" />
            </div>
          </div>
        )}
      </button>

      {!isFinished && (
        <div className="gift-status">
          {isSpawningNext ? (
            <p className="gift-text">Um novo presente apareceu! 🎁</p>
          ) : isOpen ? (
            <p className="gift-text">Abrindo o presente...</p>
          ) : (
            <>
              <p className="gift-text">Clique para abrir o presente</p>

              <div className="progress-wrapper">
                <div className="progress-bar">
                  <div
                    className={`progress-fill gift-${currentTheme}`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>

                <span className="progress-label">
                  {clicks}/{maxClicks}
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}