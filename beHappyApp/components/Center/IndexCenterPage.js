import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CenterPageContainer from '../../containers/center/CenterPageContainer';

import BookingDetail from './BookingDetail';
import { View, Text } from 'native-base';

const Stack = createStackNavigator();

function IndexCenterPage() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='CenterPageContainer'
        component={CenterPageContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='BookingDetail'
        component={BookingDetail}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons
                name='access-time'
                size={20}
                style={{ color: 'white', paddingRight: 10 }}
              />
              <Text style={{ fontSize: 20, color: 'white' }}>예약정보</Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#62CCAD',
          },
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
}

export default IndexCenterPage;
