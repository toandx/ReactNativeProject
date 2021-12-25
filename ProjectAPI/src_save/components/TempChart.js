import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View, processColor
} from 'react-native';
import update from 'immutability-helper';
import {LineChart} from 'react-native-charts-wrapper';

export default class TempChart extends React.Component {
   constructor() {
      super();
      this.chart = React.createRef();
      this.state = {
         time: new Date(2021, 27, 6, 18, 9, 0, 0).getTime(),
         dataCenter: [],
         data:{},
         marker: {
            enabled: true,
            digits: 2,
            backgroundTint: processColor('red'),
            markerColor: processColor('#F0C0FF8C'),
            textColor: processColor('black'),
            },
         xAxis: {
            granularityEnabled: true,
            granularity: 1,
            valueFormatter: ['Jan', 'Feb', 'Mar'],
            labelRotationAngle: -80,
            position: 'BOTTOM',
            },
         };
      this.uploadData=this.uploadData.bind(this);
   }
   
   componentDidMount() { 
      this.setState(
      update(this.state, {
         data: {
          $set: {
            dataSets: [],
          }
        }
      })
    );
  }

  uploadData(data_input,tag) {
     
     this.setState({
         dataCenter: data_input.map((item,id) => ({y:item.temp})),
         xAxis:{
            granularityEnabled: true,
            granularity: 1,
            valueFormatter: data_input.map((item) => (item.time)),
            labelRotationAngle: -80,
            position: 'BOTTOM',
         }
      });
     this.chart.current.setDataAndLockIndex({
      dataSets: [{
        values: this.state.dataCenter,
        label: tag,
        config: {
                lineWidth: 1.5,
                drawValues: false,
                drawCircles: true,
                circleColor: processColor('red'),
                drawCubicIntensity: 0.3,
                drawCubic: false,
                drawHighlightIndicators: false,
                color: processColor('red'),
                drawFilled: false,
               }
      }],
    })
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }

    console.log(event.nativeEvent)
  }

   render() {
      return (
         <LineChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{text: 'temperature'}}
            legend={this.state.legend}
            marker={this.state.marker}
            xAxis={this.state.xAxis}            
            drawGridBackground={false}
            borderColor={processColor('teal')}
            borderWidth={1}
            drawBorders={false}
            autoScaleMinMaxEnabled={true}
            touchEnabled={true}
            dragEnabled={true}
            scaleEnabled={true}
            scaleXEnabled={true}
            scaleYEnabled={true}
            pinchZoom={true}
            doubleTapToZoomEnabled={true}
            highlightPerTapEnabled={true}
            highlightPerDragEnabled={false}
            visibleRange={this.state.visibleRange}
            dragDecelerationEnabled={true}
            dragDecelerationFrictionCoef={0.99}
            ref={this.chart}
            keepPositionOnRotation={false}
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}
         />
      );
   }
}

const styles = StyleSheet.create({
  chart: {
    width: '100%',
    flex: 1,
    flex: 1,
    backgroundColor: 'white',
    flexWrap: 'wrap'
  }
});
