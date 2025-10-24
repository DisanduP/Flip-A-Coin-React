import React, { useState, useRef } from 'react';
import './Coin.scss';

function Coin() {
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);
  const [totalFlips, setTotalFlips] = useState(0);
  const [result, setResult] = useState('');
  const [flipping, setFlipping] = useState(false);
  const coinRef = useRef(null);

  const flipCoin = () => {
    if (flipping) return;
    setFlipping(true);
    setResult('');

    const isHeads = Math.random() < 0.5;
    const coin = coinRef.current;
    if (coin) coin.classList.add('flipping');

    setTimeout(() => {
      if (coin) coin.classList.remove('flipping');

      if (isHeads) {
        if (coin) coin.style.transform = 'rotateY(0deg)';
        setResult('HEADS');
        setHeadsCount(h => h + 1);
      } else {
        if (coin) coin.style.transform = 'rotateY(180deg)';
        setResult('TAILS');
        setTailsCount(t => t + 1);
      }

      setTotalFlips(t => t + 1);
      setFlipping(false);
    }, 1000);
  };

  const resetStats = () => {
    setHeadsCount(0);
    setTailsCount(0);
    setTotalFlips(0);
    setResult('');
    const coin = coinRef.current;
    if (coin) coin.style.transform = 'rotateY(0deg)';
  };

  return (
    <div className="container">
      <h1>Coin Flip</h1>

      <div className="coin-container">
        <div className={`coin ${flipping ? 'flipping' : ''}`} id="coin" ref={coinRef}>
          <div className="coin-face heads">H</div>
          <div className="coin-face tails">T</div>
        </div>
      </div>

      <div className="result">{result}</div>

      <div>
        <button id="flipBtn" onClick={flipCoin} disabled={flipping}>Flip</button>
        <button className="reset-btn" id="resetBtn" onClick={resetStats}>Reset</button>
      </div>

      <div className="stats">
        <div className="stat-grid">
          <div className="stat-item">
            <div className="stat-label">Heads</div>
            <div className="stat-value" id="headsCount">{headsCount}</div>
          </div>

          <div className="stat-item">
            <div className="stat-label">Tails</div>
            <div className="stat-value" id="tailsCount">{tailsCount}</div>
          </div>

          <div className="stat-item">
            <div className="stat-label">Total</div>
            <div className="stat-value" id="totalFlips">{totalFlips}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coin;
