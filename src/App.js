import React, { useEffect, useState } from 'react'
import './App.css';

export default function App() {
    const [hr, setHr] = useState(0);
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const [tenthSec, setTenthSec] = useState(0);
    const [laps, setLaps] = useState([]);
    const [runWatch, setRunWatch] = useState(false);

    useEffect(() => {
        let timerId = '';
        if (runWatch) {
            timerId = setInterval(() => { setTenthSec((prev) => prev + 1) }, 10)
        } else {
            clearInterval(timerId);
        }
        return (() => {
            clearInterval(timerId);
        })
    }, [runWatch])

    useEffect(() => {
        if (tenthSec === 100) {
            setTenthSec(0);
            setSec((prev) => prev + 1);
        }
        if (sec === 60) {
            setSec(0);
            setMin((prev) => prev + 1);
        }
        if (min === 60) {
            setMin(0);
            setHr((prev) => prev + 1);
        }
    }, [tenthSec, sec, min, hr])
    // let timerId = '';
    // const runTime = () => {
    //     if (!runWatch) {
    //         clearTimeout(timerId);
    //     } else {
    //         setTenthSec((prev) => prev + 1);
    //         if (tenthSec === 100) {
    //             setTenthSec(0);
    //             setSec((prev) => prev + 1);
    //         }
    //         if (sec === 60) {
    //             setSec(0);
    //             setMin((prev) => prev + 1);
    //         }
    //         if (min === 60) {
    //             setMin(0);
    //             setHr((prev) => prev + 1);
    //         }
    //     }
    //     timerId = setTimeout(runTime, 10)
    // }
    const startWatch = () => {
        setRunWatch(true);
        // runTime();
    };
    const stopWatch = () => {
        setRunWatch(false);
        // clearTimeout(timerId)
    };
    const resetWatch = () => {
        setRunWatch(false);
        // clearTimeout(timerId)
        setHr(0);
        setMin(0);
        setSec(0);
        setTenthSec(0);
        setLaps([]);
    };
    return (
        <div className="container" >
            <div>
                {`${hr < 10 ? '0' + hr : hr}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}.${tenthSec < 10 ? '0' + tenthSec : tenthSec} `}
            </div>
            <div>
                Laps
                <ul>
                    {laps.map((lap, index) => <li key={index}>{lap}</li>)}
                </ul>
            </div>
            <div className='button' onClick={startWatch}>
                start
            </div>
            <div className='button' onClick={stopWatch}>
                stop
            </div>
            <div className='button' onClick={resetWatch}>
                reset
            </div>
            <div className='button' onClick={() => { setLaps((prev) => [...prev, `${hr < 10 ? '0' + hr : hr}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}.${tenthSec < 10 ? '0' + tenthSec : tenthSec} `]) }}>
                lap
            </div>
        </div>
    )
}
