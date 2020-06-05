import * as React from 'react';

import AgeStore from '../stores/AgeStore';
import { observer } from 'mobx-react';

import '../css/practice';

const ageState = new AgeStore(30);

@observer // mobx가 observable state를 rerendring
class Age extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
    this.addAge = this.addAge.bind(this);
  }

  addAge() {
    const age = ageState.getAge();
    ageState.setAge(age + 1);
    console.log(ageState.getAge());
  }

  render() {
    return (
      <div className='Age'>
        <h1>{ageState.getAge()}</h1>
        <button onClick={() => this.addAge()}>나이 증가</button>
      </div>
    );
  }
}

export default Age;
