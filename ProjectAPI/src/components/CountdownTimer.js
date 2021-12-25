import * as React from 'react';
import { Text, View, StyleSheet, Animated, Button, Alert } from 'react-native';
import Constants from 'expo-constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

const WAIT_COLOR = '#FFA500'; //Orange
const RUN_COLOR = '#00FF00'; // Green
class CountdownTimer extends React.Component {
   constructor(props) {
		super(props);
		this.state = {
			AUTO_MODE: true,
         key:0,
         duration:0,
         remain: null,
         isPlaying:false,
         waitMode: false, 
         color: [[WAIT_COLOR]],
         waitTime:0,
         runTime:0,
		};
      this.renderTime = this.renderTime.bind(this);
      this.setMode = this.setMode.bind(this);
      this.stop = this.stop.bind(this);
      this.handleComplete = this.handleComplete.bind(this);
      this.update_status=this.update_status.bind(this);
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
           color: [[RUN_COLOR]],
        });
     }
  }
  setIsPlaying(isPlay)
  {
     if (!this.state.AUTO_MODE)
     this.setState({
        isPlaying:isPlay,
     });
  }
  update_status(wait_time,run_time,auto_mode,is_playing,is_running,remain_time) {
     this.setState(
     {
        waitTime: wait_time,
        runTime: run_time,
        AUTO_MODE: auto_mode,
        key: 1-this.state.key,
        duration: is_running ? run_time : wait_time,
        remain: (!is_playing) ? 0 : ((remain_time>=0) ? remain_time : 0),
        isPlaying:is_playing,
        waitMode: !is_running,
        color: [[auto_mode ? WAIT_COLOR : (is_running ? RUN_COLOR : WAIT_COLOR)]],
     });
  }
  start(wait_time,run_time){ //Timer mode
     this.setState(
     {
        AUTO_MODE: false,
        key: 1-this.state.key,
        duration: run_time,
        remain:null,
        isPlaying:true,
        waitMode: false,
        color: [[RUN_COLOR]],
        waitTime: wait_time,
        runTime: run_time,
     });
  };
  stop(){ //Auto mode
     this.setState(
     {
        AUTO_MODE: true,
        key: 1-this.state.key,
        duration: 0,
        remain: null,
        color: [[WAIT_COLOR]],
        isPlaying:false,
     });
  }
  handleComplete(){
     if (this.state.waitMode)
     {
        this.setState(
        {
           key: 1-this.state.key,
           duration: this.state.runTime,
           remain: null,
           waitMode:false,
           color: [[RUN_COLOR]],
        });
     } else
     {
        this.setState(
        {
           key: 1-this.state.key,
           duration: this.state.waitTime,
           remain: null,
           waitMode:true,
           color: [[WAIT_COLOR]],
        });
     }
  };
  renderTime(time){
     if (this.state.AUTO_MODE) 
     {
        return('AUTO');
     }
     if (!this.state.isPlaying) return('PAUSE');
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
        duration={this.state.duration}
        initialRemainingTime={this.state.remain}
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