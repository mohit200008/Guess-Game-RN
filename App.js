// import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font'
import StartGameScreen from './screens/StartGameScreen';
import AppLoading from 'expo-app-loading';
import { LinearGradient } from 'expo-linear-gradient'
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';

// import { SafeAreaView } from 'react-native-web';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true)
  const [guessRounds, setGuessRounds] = useState(0)

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if(!fontsLoaded) {
    return <AppLoading />;
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber)
    setGameIsOver(false)
  }

  function StartNewGameHandler() {
    setUserNumber(null)
    setGuessRounds(0)
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds)
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if (userNumber) {
    screen = ( <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} /> 
    );
  }

  if(gameIsOver && userNumber) {
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={StartNewGameHandler}/>
  }

 

  return (
    <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
      <ImageBackground source={require('./assets/background.png')} resizeMode="cover" style={styles.rootScreen} imageStyle={styles.backgroundImage}>
        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.15
  }
});
