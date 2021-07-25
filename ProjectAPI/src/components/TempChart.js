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
      this.state = {
         time: new Date(2021, 27, 6, 18, 9, 0, 0).getTime(),
         data: {},
         marker: {
            enabled: true,
            digits: 2,
            backgroundTint: processColor('red'),
            markerColor: processColor('#F0C0FF8C'),
            textColor: processColor('black'),
            },
         xAxis: {
            valueFormatter: 'date',
            valueFormatterPattern: "dd/MM/YYYY, HH:mm:ss",
            labelRotationAngle: -80,
            position: 'BOTTOM',
            timeUnit: 'SECONDS',
            since: 0,
            granularityEnabled: true,
            granularity: 1,
            },
         /*xAxis: {
            granularityEnabled: true,
            granularity: 1,
            },*/
         };
   }
   componentDidMount() { 
      this.setState(
      update(this.state, {
         data: {
            $set: {
            dataSets: [{
               values: [
                  {x: 1, y: 1}, {x: 2, y: 105}, {x: 3, y: 50}, {x: 4, y: 7}
               ], 
               label: 'Temperature',
               config: {
                lineWidth: 1.5,
                drawValues: false,
                drawCircles: true,
                circleColor: processColor('red'),
                drawFilled: true,
                fillColor: processColor('blue'),
                drawCubicIntensity: 0.3,
                drawCubic: true,
                drawHighlightIndicators: false,
                color: processColor('red'),
                drawFilled: false,
               }
            }],
          }
        }
      })
    );
  }

  onPressLearnMore() {
     this.setState({...this.state, selectedEntry: 'toan dep trai'})
     this.refs.chart.setDataAndLockIndex({
      dataSets: [{
        values: [
          {x: 1, y: 110},
          {x: 2, y: 105},
          {x: 3, y: 115},
          {x: 4, y: 110},
          {x: 5, y: 110},
          {x: 6, y: 105},
          {x: 7, y: 115},
          {x: 8, y: 110},
        ],
        label: 'A',
      }, {
        values: [
          {x: 1, y: 90},
          {x: 2, y: 130},
          {x: 3, y: 100},
          {x: 4, y: 105},
          {x: 5, y: 90},
          {x: 6, y: 130},
          {x: 7, y: 100},
          {x: 8, y: 105}
        ],
        label: 'B',
      }, {
        values: [
          {x: 1, y: 110},
          {x: 2, y: 105},
          {x: 3, y: 115},
          {x: 4, y: 110},
          {x: 5, y: 110},
          {x: 6, y: 105},
          {x: 7, y: 115},
          {x: 8, y: 110}],
        label: 'C',
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
            autoScaleMinMaxEnabled={false}
            touchEnabled={true}
            dragEnabled={true}
            scaleEnabled={true}
            scaleXEnabled={true}
            scaleYEnabled={true}
            pinchZoom={true}
            doubleTapToZoomEnabled={true}
            highlightPerTapEnabled={true}
            highlightPerDragEnabled={false}
            // visibleRange={this.state.visibleRange}
            dragDecelerationEnabled={true}
            dragDecelerationFrictionCoef={0.99}
            ref="chart"
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
