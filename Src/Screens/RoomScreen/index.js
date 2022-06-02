import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
// Step 1: import Send
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
// Step 2: import IconButton
import {IconButton} from 'react-native-paper';
import {AuthContext} from '../../Navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

export default function RoomScreen({route}) {
  const {user} = useContext(AuthContext);
  const currentUser = user.toJSON();
  const {thread} = route.params;
  const [messages, setMessages] = useState();

  async function handleSend(messages) {
    const text = messages[0].text;

    firestore()
      .collection('THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.uid,
          email: currentUser.email,
        },
      });

    await firestore()
      .collection('THREADS')
      .doc(thread._id)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
        },
        {merge: true},
      );
  }

  useEffect(() => {
    const messagesListener = firestore()
      .collection('THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();
          console.log('======>' + firebaseData);

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email,
            };
          }

          return data;
        });

        setMessages(messages);
      });

    return () => messagesListener();
  }, []);
  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon="chevron-double-down" size={36} color="#6646ee" />
      </View>
    );
  }
  useEffect(() => {
    console.log({user});
  }, []);

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    );
  }

  function renderBubble(props) {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: '#6646ee',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={32} color="#6646ee" />
        </View>
      </Send>
    );
  }
  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{_id: currentUser.uid}}
      renderBubble={renderBubble}
      placeholder="Type your message here..."
      showUserAvatar
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottomComponent={scrollToBottomComponent}
      // Step 3: add the prop
      renderLoading={renderLoading}
    />
  );
}

// Step 3: add corresponding styles
const styles = StyleSheet.create({
  // rest remains same
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
