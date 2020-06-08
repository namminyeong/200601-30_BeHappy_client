import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Login from '../components/LogIn'
import { isLogin } from '../modules(reducers)/auth'
import { View } from 'react-native'


const LoginContainer = ({ isLogin }) => {
  return (
    <View>
      <Login status={true} isLogin={isLogin} />
    </View>
  )
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      isLogin
    },
    dispatch
  )
}

export default connect(null, mapDispatchToProps)(LoginContainer);
