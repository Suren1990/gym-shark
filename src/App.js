import './App.scss';
import { useEffect, useState } from 'react';
import mark from './assets/images/mark.png';

function App() {
  const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const [translate, setTranslate] = useState(0);
  const [anim, setAnim] = useState(false);

  const [active, setActive] = useState(3);

  let longElementsArr = [];

  for (let i = 0; i < 4; i++) {
    longElementsArr.push(...elements);
  }

  const length = longElementsArr.length;

  useEffect(() => {
    if (active === 2) {
      setTranslate(-54);
    } else if (active > 2) {
      setTranslate(-54 - (-(active - 2) * -83))
    }
    setAnim(true);
    setTimeout(() => {
      setAnim(false);
    }, 250)

  }, [active]);

  const activeSub = (active, index) => {
    if (active === index) {
      return 'active';
    } else if ((active > 1 && active - index === 1) || (active - index === -1 && index < length)) {
      return 'sub_active';
    } else {
      return 'not_active';
    }
  }

  const translateHandleNext = () => {
    if (active < length - 1) {
      setActive(active + 1);
    }
    if (active > 1 && active < length - 1) {
      setTranslate(translate - 83)
    } else if (active === 0) {
      setTranslate(40);
    }
  }

  const translateHandlePrev = () => {
    if (active > 0) {
      setActive(active - 1);
    }
    if (active > 1 && active < length) {
      setTranslate(translate + 83)
    } else if (active === 1) {
      setTranslate(124);
    }
  }

  return (
    <div className="App">
      <div className='wrap'>
        <span className={`mark ${anim && 'anim'}`}>
          <img src={mark} alt="mark" />
        </span>

        <div className='wrap__inner' style={{ 'transform': `translateX(${translate}px)` }}>
          {
            longElementsArr.map((item, index) => (
              <div className={
                `item 
                ${activeSub(active, index)}
                `}
                key={index}
              >
                <div className="item__inner">

                </div>
              </div>
            ))
          }
        </div>
      </div>
      <button
        onClick={translateHandlePrev}
      >Prev</button>
      <button
        onClick={translateHandleNext}
      >Next</button>
    </div>
  );
}

export default App;
