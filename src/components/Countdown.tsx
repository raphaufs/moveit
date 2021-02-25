import { useState, useEffect, useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Countdown.module.css';

//global variable
let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const { startNewChallenge } = useContext(ChallengeContext);

    const [time, setTime] = useState(0.1 * 60); //25 minutes in seconds
    const [isActive, setisActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    //padstart fills with a 0 on the left if the number has only one digit
    //the, split it
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');

    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown() {
        setisActive(true);
    }

    function resetCountdown() {
        setisActive(false);
        //stops the execution of countdownTimeout
        clearTimeout(countdownTimeout);
        setTime(0.1 * 60);
    }

    //useEffect => has two parameters: a function and a variable (array)
    //in this case, everytime that the variable active or variable time change their value, 
    //the function (first parameter) is called
    useEffect(() => {
        if (isActive && time > 0) {
            //setTimeout => in each second (1000), it sets time - 1
            //add the return from setTimeout into the global variable
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setisActive(false);
            startNewChallenge(); // function from the context
        }
    }, [isActive, time]);

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

            {hasFinished ? (
                    <button
                        disabled
                        className={styles.countdownButton}
                    >
                        Ciclo encerrado
                    </button>
                ) : (//fragment <> </> is from react to be used instead of using a div
                    <> 
                            {isActive ? (
                                <button
                                    type="button"
                                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                                    onClick={resetCountdown}
                                >
                                    Abandonar Ciclo
                                </button>
                            ) : (
                                    <button
                                        type="button"
                                        className={styles.countdownButton}
                                        onClick={startCountdown}
                                    >
                                        Iniciar um Ciclo
                                    </button>
                                )
                            }
                    </>
                )
            }
        </div>
    );
}