import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Logout from '../components/Mypage/Logout'
import { controlLogin } from '../modules(reducers)/auth'
import { View } from 'react-native'


const LogoutContainer = ({ controlLogin }) => {
  return (
    <View>
      <Logout status={false} controlLogin={controlLogin} />
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

export default connect(null, mapDispatchToProps)(LogoutContainer);
