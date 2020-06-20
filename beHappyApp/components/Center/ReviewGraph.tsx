import React from 'react';
import { View } from 'react-native';
import { Grid, LineChart, YAxis, XAxis } from 'react-native-svg-charts';
import { Text, Circle } from 'react-native-svg';

class ReviewGraph extends React.PureComponent {
  render() {
    const data = [2.7, 4.3, 5.0, 3.7];
    const yAxisData = [0, 1, 2, 3, 4, 5];
    const xAxisData = [4, 5, 6, 7];

    const Decorator = ({ x, y, data }) => {
      return data.map((value, index) => (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r={3.5}
          stroke='#62CCAD'
          fill='#62CCAD'
        />
      ));
    };

    const Labels = ({ x, y, data }) =>
      data.map((value, index) => (
        <View style={{ flexDirection: 'row' }}>
          <Text
            key={x}
            x={x(index)}
            y={y(value) < 25 ? y(value) + 15 : y(value) - 15}
            fill='black'
            style={{
              width: 70,
              fontSize: 17,
              fontWeight: 'bold',
            }}
            alignmentBaseline={'middle'}
            textAnchor={'middle'}
          >
            {value}
          </Text>
        </View>
      ));

    return (
      <View style={{ height: 150, padding: 10 }}>
        <YAxis
          style={{
            height: 107,
            position: 'absolute',
            top: 10,
          }}
          data={yAxisData}
          formatLabel={(value) => ' '}
          // yAccessor={({ item }) => item}
          contentInset={{ left: 10, right: 10, top: 10, bottom: 10 }}
          svg={{ fontSize: 13, fill: 'black' }}
          numberOfTicks={5}
        />
        <LineChart
          style={{ flex: 1, height: 100 }}
          data={data}
          yMin={0}
          yMax={5}
          gridMin={0}
          gridMax={5}
          numberOfTicks={5}
          contentInset={{ top: 10, bottom: 15, left: 20, right: 20 }}
          svg={{ stroke: '#d3e6df', strokeWidth: 2 }}
        >
          <Grid svg={{ stroke: '#f2f2f2' }} />
          <Labels />
          <Decorator />
        </LineChart>
        <XAxis
          formatLabel={(value) => `${value}월`}
          numberOfTicks={data.length}
          style={{
            height: 20,
          }}
          data={xAxisData}
          xAccessor={({ item }) => item}
          contentInset={{ left: 25, right: 25 }}
          svg={{ fontSize: 13, fill: 'black' }}
        />
      </View>
    );
  }
}

export default ReviewGraph;
