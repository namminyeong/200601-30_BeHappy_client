import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Counter from '../components/ex_counter'
import { increase, decrease } from '../modules(reducers)/ex_counter'
import { View } from 'react-native'


const CounterContainers = ({ counterNum, increase, decrease }) => {
  return (
    <View>
      <Counter number={counterNum} onIncrease={increase} onDecrease={decrease} />
    </View>
  )
}

const mapStateToProps = (state) => ({
  counterNum: state.counter.number
})

// const mapDispatchToProps = (dispatch) => ({
//   increase: () => dispatch(increase()),
//   decrease: () => dispatch(decrease()),
// });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      increase,
      decrease
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainers);
