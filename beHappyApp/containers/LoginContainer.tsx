import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Login from '../components/LogIn'
import { controlLogin } from '../modules(reducers)/auth'
import { View } from 'react-native'


const LoginContainer = ({ controlLogin }) => {
  return (
    <View>
      <Login status={true} controlLogin={controlLogin} />
    </View>
  )
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      controlLogin
    },
    dispatch
  )
}

export default connect(null, mapDispatchToProps)(LoginContainer);
