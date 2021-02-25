import '../styles/global.css'

//import the context for communication among components
import { ChallengesProvider } from '../contexts/ChallengeContext';

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  );
}

export default MyApp

