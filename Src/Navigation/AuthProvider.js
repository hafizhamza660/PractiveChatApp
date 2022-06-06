import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState();
  const usersCollection = firestore().collection('Users');
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (error) {
            console.error(error);
          }
        },
        register: async (email, password, name, imageUrl) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(user => {
                console.log('User account created & signed in!');
                const uploadUri = imageUrl.uri;
                const filename = user.user.getIdToken(true);
                try {
                  const downloadedUrl = storage()
                    .ref(filename)
                    .putFile(uploadUri);
                  downloadedUrl.on('state_changed', taskSnapshot => {
                    console.log(
                      `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
                    );
                  });

                  downloadedUrl.then(() => {
                    console.log('Image uploaded to the bucket!');
                    usersCollection.add({
                      _id: filename,
                      name: name,
                      email: email,
                      imageUrl: downloadedUrl.ref.getDownloadURL(),
                    });
                  });
                } catch (error) {}
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
