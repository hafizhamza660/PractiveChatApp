import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../Screens/HomeScreen';
import AddRoomScreen from '../../Screens/AddRoomScreen';
import {IconButton} from 'react-native-paper';
import RoomScreen from '../../Screens/RoomScreen';
import RoomListScreen from '../../Screens/RoomListScreen';

// create two new instances
const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();

function ChatApp() {
  return (
    <ChatAppStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6646ee',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 22,
        },
      }}>
      <ChatAppStack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <IconButton
              icon="message-plus"
              size={28}
              color="#ffffff"
              onPress={() => navigation.navigate('AddRoom')}
            />
          ),
        })}
      />
      {/* Add this */}
      <ChatAppStack.Screen
        name="Room"
        component={RoomScreen}
        options={({route}) => ({
          title: route.params.thread.name,
        })}
      />

      <ChatAppStack.Screen name="RoomsList" component={RoomListScreen} />
    </ChatAppStack.Navigator>
  );
}

const HomeStack = () => {
  return (
    <ModalStack.Navigator mode="modal" headerMode="none">
      <ModalStack.Screen name="ChatApp" component={ChatApp} />
      <ModalStack.Screen name="AddRoom" component={AddRoomScreen} />
    </ModalStack.Navigator>
  );
};

export default HomeStack;
