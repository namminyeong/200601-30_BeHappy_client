import React from 'react';

import '../css/list.css';

const List = ({ reqList, userId, centerName }) => {
  const acceptReq = () => {
    return fetch('https://behappy-hope.today/user/admin/request', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, isAcceptance: true }),
    })
      .then((res) => {
        console.log('acceptReq res: ', res);
        res.json();
      })
      .then((res) => {
        console.log('res: ', res);
        reqList();
      })
      .catch((err) => {
        console.log('reqList Err: ', err);
      });
  };

  const refusalReq = () => {
    return fetch('https://behappy-hope.today/user/admin/request', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, isAcceptance: false }),
    })
      .then((res) => {
        console.log('acceptReq res: ', res);
        res.json();
      })
      .then((res) => {
        console.log('res: ', res);
        reqList();
      })
      .catch((err) => {
        console.log('reqList Err: ', err);
      });
  };

  return (
    <div className='reqContainer'>
      <div className='reqText'>{centerName}에서 admin 신청이 왔어요.</div>
      <div className='btnContainer'>
        <button className='acceptBtn' onClick={() => acceptReq()}>
          수락
        </button>
        <button className='refusalBtn' onClick={() => refusalReq()}>
          거절
        </button>
      </div>
    </div>
  );
};

export default List;
