import * as React from 'react';
import { Text, View, StyleSheet, Animated, Button } from 'react-native';
import Constants from 'expo-constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function CountdownTimer() {
  const [enable,setEnable] = React.useState(true);
  const [key,setKey]=React.useState(0);
  const [totalTime,setTotalTime]=React.useState(30);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [runMode,setRunMode]=React.useState(true); //True if Run mode, False if Wait mode
  function start(waitTime,runTime){
  };
  const renderTime = (time) => {
   var min = (time-(time%60))/60;
   var second = time-min*60;
   if (min<10) min='0'+min;
   if (second<10) second='0'+second;
   return (min+':'+second);
  };  
  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        key={key}
        isPlaying={isPlaying}
        duration={totalTime}
        size={300}
        strokeWidth={20}
        colors={[
          ['#ff0000']
        ]}
        onComplete={() => setKey(key+1)}
    >
      {({ remainingTime, animatedColor }) =>
          (
            <Text style={styles.txt}> {renderTime(remainingTime)} </Text>
          )
        }
    </CountdownCircleTimer>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  txt:{
     color:'black',
     fontSize:40,
  }
});