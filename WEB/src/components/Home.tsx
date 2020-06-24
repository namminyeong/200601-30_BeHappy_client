import React from 'react';

import List from './List';
import '../css/Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reqList: [],
    };

    this.reqList = this.reqList.bind(this);
  }

  componentDidMount() {
    this.reqList();
  }

  reqList() {
    fetch('https://behappy-hope.today/user/admin/request', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log('res: ', res);
        this.setState({
          reqList: res,
        });
      })
      .catch((err) => {
        console.log('reqList Err: ', err);
      });
  }

  render() {
    const { reqList } = this.state;

    return (
      <div className='container'>
        {/* <nav className='navbar'>
          <div className='logo'><img src='/images/behappy.png' /></div>
          <div className='title'>admin 신청 관리 화면</div>
        </nav> */}
        {reqList.map((req, index) => (
          <List
            key={index}
            reqList={this.reqList}
            userId={req.userId}
            centerName={req.centerName}
          />
        ))}
      </div>
    );
  }
}

export default Home;
