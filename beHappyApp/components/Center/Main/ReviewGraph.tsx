import React from 'react';
import { View } from 'react-native';
import { Grid, LineChart, YAxis, XAxis } from 'react-native-svg-charts';
import { Text, Circle } from 'react-native-svg';

class ReviewGraph extends React.PureComponent {
  render() {
    const data = this.props.rateAvgOfEachMonth;
    const xAxisData = this.props.xAxisData;

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
        <View style={{ flexDirection: 'row' }} key={index}>
          <Text
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
            {Number.isInteger(value) && value !== 0 ? value + '.0' : value}
          </Text>
        </View>
      ));

    return (
      <View style={{ height: 110, padding: 10 }}>
        {/* <YAxis
          style={{
            height: 77,
            position: 'absolute',
            top: 10,
          }}
          data={yAxisData}
          formatLabel={(value) => ' '}
          contentInset={{ left: 10, right: 10, top: 10, bottom: 10 }}
          svg={{ fontSize: 8, fill: 'black' }}
          numberOfTicks={5}
        /> */}
        <LineChart
          style={{ flex: 1, height: 80 }}
          data={data}
          yMin={0}
          yMax={5}
          gridMin={0}
          gridMax={5}
          numberOfTicks={5}
          contentInset={{ top: 10, bottom: 5, left: 40, right: 40 }}
          svg={{ stroke: '#d3e6df', strokeWidth: 2 }}
        >
          <Grid svg={{ stroke: '#f2f2f2' }} />
          <Labels />
          <Decorator />
        </LineChart>
        <XAxis
          formatLabel={(value, index) =>
            `${value}月 (${this.props.reviewCountOfEachMonth[index]}개)`
          }
          numberOfTicks={data.length}
          style={{
            height: 20,
          }}
          data={xAxisData}
          xAccessor={({ item }) => item}
          contentInset={{ left: 40, right: 40 }}
          svg={{ fontSize: 11, fill: 'black' }}
        />
      </View>
    );
  }
}

export default ReviewGraph;
