const STEPS = [1, 2, 3, 4, 5];
const CURRENT_STEP = 3;

function Steps() {
  return (
    <div className="steps">
      <ol className="steps__list">
        {STEPS.map((number) => {
          const className = [
            'step',
            number < CURRENT_STEP && 'step--done',
            number === CURRENT_STEP && 'step--active',
          ].filter(Boolean).join(' ');

          return (
            <li className={className} key={number}>
              <span className="step__num">{number}</span>
              <span className="step__line"></span>
              {number !== STEPS.length && <span className="step__dash"></span>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Steps;