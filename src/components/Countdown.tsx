import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
    const {
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown
    } = useContext(CountdownContext);

    //padstart fills with a 0 on the left if the number has only one digit
    //the, split it
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

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