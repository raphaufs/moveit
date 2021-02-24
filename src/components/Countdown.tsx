import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
    const [time, setTime] = useState(1 * 60); //25 minutes in seconds
    const [active, setActive] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    //padstart fills with a 0 on the left if the number has only one digit
    //the, split it
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');

    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown() {
        setActive(true);
    }

    //useEffect => has two parameters: a function and a variable (array)
    //in this case, everytime that the variable active or variable time change their value, 
    //the function (first parameter) is called
    useEffect(() => {
        if (active && time > 0) {
            //setTimeout => in each second (1000), it sets time - 1
            setTimeout(() => {
                setTime(time - 1); 
            }, 1000);
        }
    }, [active, time]);

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            <button
                type="button"
                className={styles.countdownButton}
                onClick={startCountdown}
            >
                Iniciar um Ciclo
            </button>
        </div>
    );
}