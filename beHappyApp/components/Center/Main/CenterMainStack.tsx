import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CenterMainContainer from '../../../containers/center/CenterMainContainer';
import CenterInfo from './CenterInfo';
import ModifyCenterInfo from './ModifyCenterInfo';

const Stack = createStackNavigator();

function CenterMainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='CenterMainContainer'
        component={CenterMainContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='CenterInfo'
        component={CenterInfo}
        options={{
          headerStyle: {
            backgroundColor: '#62CCAD',
          },
          headerTintColor: 'white',
          title: '마이페이지',
        }}
      />
      <Stack.Screen
        name='ModifyCenterInfo'
        component={ModifyCenterInfo}
        options={{
          headerStyle: {
            backgroundColor: '#62CCAD',
          },
          headerTintColor: 'white',
          title: '센터 정보 수정',
        }}
      />
    </Stack.Navigator>
  );
}

export default CenterMainStack;
