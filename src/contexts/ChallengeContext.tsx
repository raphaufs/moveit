//allow the communication among components
import { createContext, useState, ReactNode, useEffect} from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    //type: string;
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengeDataContext {
    level: number; 
    currentExperience: number; 
    challengesCompleted: number; 
    activeChallenge: Challenge;
    experienceToNextLevel: number; 
    levelUp: () => void;
    startNewChallenge: () => void;    
    resetChallenge: () => void;    
    completeChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengeDataContext);

//children comes from _app.tsx
//it´s created a typescript (interface) to define the type of the childre (ChallengesProviderProps)
export function ChallengesProvider({children}: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    //formula to calculate the experience to the next level
    //it uses pow (2) and the number 4. If you want to make it more
    //difficult, increse the number 4, and vice-versa.
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    //everytime that the second parameter from useEffect is an empty array, 
    //the function within the first parameter will be executed only once
    //when the component is called
    useEffect(() => {
        //calls the browser to request the user permission to send notifications
        Notification.requestPermission();
    }, []);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        //play an audio
        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                //check MDN Notification: https://developer.mozilla.org/pt-BR/docs/Web/API/Notification
                //for more customization properties
                body:`Valendo ${challenge.amount} xp!`,
                icon: '/favicon.png'

            })

        }
    }

    function resetChallenge () {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge){
            return;     
        }
        const { amount } = activeChallenge;

        //let: comes from let it changes (changes a variable)
        let finalExperience = currentExperience + amount;

        if (finalExperience > experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        //starts the context to allow the communication among components
        <ChallengeContext.Provider 
            value={{ 
                level, 
                currentExperience, 
                challengesCompleted,
                activeChallenge,
                experienceToNextLevel,
                levelUp,
                startNewChallenge,                
                resetChallenge,
                completeChallenge,
            }}
        >
            {children}
        </ChallengeContext.Provider>
    );
}