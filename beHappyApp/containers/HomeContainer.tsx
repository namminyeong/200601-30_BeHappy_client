import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Home from '../components/Home'
import { controlLogin } from '../modules(reducers)/auth'

const HomeContainer = ({ isLogin, controlLogin }) => {
  return (
    <Home isLoginStatus={isLogin} controlLogin={controlLogin} />
  )
}

const mapStateToProps = (state) => ({
  isLogin: state.handleLogin.isLogin
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      controlLogin
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
