import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {useApiInformation} from '../../context/LoadApi';
import {useTheme} from '../../context/Theme';
import ProfileCard from '../../components/Profile/ProfileCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterButton: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    borderRadius: 30,
    padding: 10,
  },
});

const ProfileList = ({route}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const {rollPhotos} = useApiInformation();
  const {
    mainTheme: {backgroundColor},
  } = useTheme();
  const {index} = route.params;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <Animated.FlatList
        style={{opacity: fadeAnim}}
        data={rollPhotos}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <ProfileCard url={item.url} id={item.id} favorite={false} />
        )}
        initialScrollIndex={index}
        getItemLayout={(data, index) => ({
          length: 528,
          offset: 528 * index,
          index,
        })}
      />
    </View>
  );
};

export default ProfileList;
