import { useEffect, useState } from "react";
import './Stopwatch.css';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

function Stopwatch() {
  const [watch, setWatch] = useState({
    minute: 0,
    second: 0,
    milisecond: 0,
  });
  const [captureTime, setCaptures] = useState([]);
  const [running, setRunning] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    let timeInterval;
    if (running) {
      timeInterval = setInterval(() => {
        setWatch((prevWatch) => {
          let { minute, second, milisecond } = prevWatch;
          milisecond++;
          if (milisecond >= 10) {
            milisecond = 0;
            second++;
          }
          if (second >= 60) {
            second = 0;
            minute++;
          }
          return { milisecond, second, minute };
        });
      }, 100);
    }
    return () => clearInterval(timeInterval);
  }, [running]);

  const handleStart = (e) => {
    e.preventDefault();
    setRunning(true);
    setPause(false);
  };

  const handlePause = (e) => {
    e.preventDefault();
    setRunning(false);
    setPause(true);
  };

  const handleCapture = (e) => {
    e.preventDefault();
    setCaptures((prevCaptures) => [
      ...prevCaptures,
      watch,
    ]);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setWatch({ milisecond: 0, second: 0, minute: 0 });
    setRunning(false);
    setPause(false);
    setCaptures([]);
  };

  return (
    <>
      <div className="stopwatch">
        <h2>Stopwatch <TimerOutlinedIcon style={{ fontSize: 'inherit' }} /></h2>
        <div className="display">
          {watch.minute.toString().padStart(2, "0")}:
          {watch.second.toString().padStart(2, "0")}:
          {watch.milisecond.toString().padStart(2, "0")}
        </div>
        <div className="buttons">
          {!running ? (
            <button className="start-btn" onClick={handleStart}>Start</button>
          ) : (
            <div className="pause-capture">
              <button className="pause-btn" onClick={handlePause}>Pause</button>
              <button className="capture-btn" onClick={handleCapture}>Capture</button>
            </div>
          )}
          {pause && <button className="reset-btn" onClick={handleReset}>Reset</button>}
        </div>
        
        <div className="captures">
          {captureTime.length > 0 && <h3>Captured Times</h3>}
          <ul>
            {captureTime.map((item, index) => (
              <li key={index}>{`${item.minute.toString().padStart(2, "0")}:${item.second.toString().padStart(2, "0")}:${item.milisecond.toString().padStart(2, "0")}`}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Stopwatch;
