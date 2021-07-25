import * as React from 'react';
import { Text, View, StyleSheet, Animated, Button, Alert } from 'react-native';
import Constants from 'expo-constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

class CountdownTimer extends React.Component {
   constructor(props) {
		super(props);
		this.state = {
			AUTO_MODE: true,
         key:0,
         totalTime:0,
         isPlaying:false,
         waitMode: false, 
         color: [['#A3E4D7']],
         waitTime:0,
         runTime:0,
		};
      this.renderTime = this.renderTime.bind(this);
      this.setMode = this.setMode.bind(this);
      this.stop = this.stop.bind(this);
      this.handleComplete = this.handleComplete.bind(this);
	}
  setMode(isAutoMode)
  {
     if (isAutoMode)
        this.stop();
     else
     {
        this.setState(
        {
           AUTO_MODE: false,
           key: 1-this.state.key,
           color: [['#ff0000']],
        });
     }
  }     
  start(wait_time,run_time){ //Timer mode
     this.setState(
     {
        AUTO_MODE: false,
        key: 1-this.state.key,
        totalTime: run_time,
        isPlaying:true,
        waitMode: false,
        color: [['#ff0000']],
        waitTime: wait_time,
        runTime: run_time,
     });
  };
  stop(){ //Auto mode
     this.setState(
     {
        AUTO_MODE: true,
        key: 1-this.state.key,
        totalTime: 0,
        color: [['#A3E4D7']],
        isPlaying:false,
     });
  }
  handleComplete(){
     if (this.state.waitMode)
     {
        this.setState(
        {
           key: 1-this.state.key,
           totalTime: this.state.runTime,
           waitMode:false,
           color: [['#ff0000']],
        });
     } else
     {
        this.setState(
        {
           key: 1-this.state.key,
           totalTime: this.state.waitTime,
           waitMode:true,
           color: [['#A3E4D7']],
        });
     }
  };
  renderTime(time){
     if (this.state.AUTO_MODE) 
     {
        return('AUTO');
     }
     var min = (time-(time%60))/60;
     var second = time-min*60;
     if (min<10) min='0'+min;
     if (second<10) second='0'+second;
     return (min+':'+second);
  };  
  render() {
     return (
    <View style={styles.container}>
      <CountdownCircleTimer
        key={this.state.key}
        isPlaying={this.state.isPlaying}
        duration={this.state.totalTime}
        size={300}
        strokeWidth={20}
        colors={this.state.color}
        onComplete={this.handleComplete}
    >
      {({ remainingTime, animatedColor }) =>
          (
            <Text style={styles.txt}> {this.renderTime(remainingTime)} </Text>
          )
        }
    </CountdownCircleTimer>
  </View>
  );}
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
export default CountdownTimer;