import { useEffect, useState } from "react";
import './Stopwatch.css';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
function Stopwatch() {
  const [watch, setWatch] = useState({
    minute: 0,
    second: 0,
    milisecond: 0,
  });
  const [captureTime,setCaptures] = useState([]);

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
    console.log(watch.milisecond + watch.second + watch.minute);
    setPause(false);
  };

  const handlePause = (e) => {
    e.preventDefault();
    setRunning(false);
    setPause(true);
  };

  const handleCapture = (e) => {
    e.preventDefault();
    setCaptures([...captureTime,watch]);
    console.log(captureTime)
  };

  const handleReset = (e)=>{
    e.preventDefault();
    setWatch({milisecond:0,second:0,minute:0});
    setRunning(false);
    setPause(false);
    setCaptures([]);
  }
  return (
    <>
    <div className="stopwatch">
      <h2>Stop Watch <span><TimerOutlinedIcon style={{fontSize:'inherit'}}/></span></h2>
      <div className="display">
        {watch.minute.toString().padStart(2, "0")} :
        {watch.second.toString().padStart(2, "0")} :
        {watch.milisecond.toString().padStart(2, "0")}
      </div>
      <div className="buttons">
        {!running ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <div className="pause-capture">
            <button onClick={handlePause}>Pause</button>
            <button onClick={handleCapture}>Capture</button>
          </div>
        )}
        {pause ? <button onClick={handleReset}>Reset</button> : ""}
      </div>

      
      <div className="captures">
    
        {captureTime.map((item,index)=>(
          <li key={index}>{item.minute.toString().padStart(2,0)}:{item.second.toString().padStart(2,0)}:{item.milisecond.toString().padStart(2,0)}</li>

        ))}
      </div>
      </div>
    </>
  );
}
export default Stopwatch;
