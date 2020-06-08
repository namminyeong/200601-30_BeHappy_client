import React from 'react';
import { connect } from 'react-redux'
import Home from '../components/Home'

const HomeContainer = ({ isLogin }) => {
  return (
    <Home isLogin={isLogin} />
  )
}

const mapStateToProps = (state) => ({
  isLogin: state.handleLogin.isLogin
})

export default connect(mapStateToProps)(HomeContainer);
