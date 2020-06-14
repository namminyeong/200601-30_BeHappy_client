import React from 'react';

const List = ({ reqList, userId centerName }) => {
  const acceptReq = () => {
    return fetch('http://13.209.16.103:4000/user/admin/request', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId,isAcceptance: true }),
    })
      .then((res) => {
        console.log('acceptReq res: ', res);
        res.json();
      }).then(res => {
        console.log('res: ', res)
        reqList();
      })
      .catch((err) => {
        console.log('reqList Err: ', err);
      });
  };

  return (
    <div>
      <div>{centerName}에서 admin 신청이 왔어요.</div>
      <button onClick={() => acceptReq()}>수락</button>
      <button>거절</button>
    </div>
  );
};

export default List;
