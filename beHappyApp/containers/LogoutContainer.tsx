import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Logout from '../components/Mypage/Logout'
import { isLogout } from '../modules(reducers)/auth'
import { View } from 'react-native'


const LogoutContainer = ({ isLogout }) => {
  return (
    <View>
      <Logout status={false} isLogout={isLogout} />
    </View>
  )
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      isLogout
    },
    dispatch
  )
}

export default connect(null, mapDispatchToProps)(LogoutContainer);
