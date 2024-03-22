import { useState } from 'react';
import './Tooltip.css';
function Tooltip(props) {
  let timeout;
  const [active, setActive] = useState(false);
  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
    if (props.onHide) {
      props.onHide(false);
    }
  };

  return (
    <div className="relative inline-block" onMouseEnter={showTip} onMouseLeave={hideTip}>
      {props.children}
      {active && (
        <div>
          <div className={`Tooltip-Tip ${props.direction || 'top'}`}>{props.content}</div>
        </div>
      )}
    </div>
  );
}

export default Tooltip;
