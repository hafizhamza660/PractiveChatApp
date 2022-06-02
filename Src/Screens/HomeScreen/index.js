import React, {useContext, useState, useEffect} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {Title, List, Divider} from 'react-native-paper';
import FormButton from '../../Components/FormButton';
import {AuthContext} from '../../Navigation/AuthProvider';
import {commonStyles} from '../../Styles/commonStyles';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../Components/Loading';

const HomeScreen = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('THREADS')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            //give Details
            name: '',
            ...documentSnapshot.data(),
          };
        });
        setThreads(threads);

        if (loading) {
          setLoading(false);
        }
      });
    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <View style={commonStyles.container}>
      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Room', {thread: item})}>
            <List.Item
              title={item.name}
              description="Item description"
              titleNumberOfLines={1}
              titleStyle={commonStyles.listTitle}
              descriptionStyle={commonStyles.listDescription}
              descriptionNumberOfLines={1}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
