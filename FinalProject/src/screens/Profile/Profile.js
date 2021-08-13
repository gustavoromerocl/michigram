import React, {useContext, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';
import AddPhoto from '../../components/Photo/AddPhoto';
import {useUserInformation} from '../../context/User';
import {ThemeContext} from '../../context/Theme';
import BackgroundAddPhoto from '../../components/Photo/BackgroundAddPhoto';
import {useApiInformation} from '../../context/LoadApi';
import {useNavigation} from '@react-navigation/native';
import ProfileGridCard from '../../components/Profile/ProfileGridCard';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerImage: {
    height: 200,
    width: '100%',
    backgroundColor: '#000',
  },
  circleImage: {
    position: 'absolute',
    top: 135,
  },
  image: {
    height: '100%',
    width: '100%',
    backgroundColor: '#34495e',
  },
  containerInfo: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  edit: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 40,
    fontFamily: 'LondrinaSolid-Regular',
  },
  text: {
    fontSize: 20,
    fontFamily: 'LondrinaSolid-Light',
  },
  modalStyle: {
    marginVertical: 200,
    marginHorizontal: 10,
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 15,
    borderColor: colors.pink,
    borderWidth: 2,
  },
});

const Profile = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();
  const {name, email, number, photo, backgroundImage} = useUserInformation();
  const {rollPhotos} = useApiInformation();

  const {
    mainTheme: {backgroundColor, textColor, primaryColor},
  } = useContext(ThemeContext);

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
        ListHeaderComponent={
          <>
            <View style={styles.containerImage}>
              <BackgroundAddPhoto uri={backgroundImage} />
            </View>
            <View style={styles.circleImage}>
              <AddPhoto uri={photo} />
            </View>
            <View style={styles.edit}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Edit Profile')}>
                <MaterialCommunityIcons
                  name="content-save-edit"
                  color={primaryColor}
                  size={50}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.containerInfo}>
              <View>
                <Text style={[styles.title, {color: primaryColor}]}>
                  {name}
                </Text>
                <Text style={[styles.text, {color: textColor}]}>{email}</Text>
                <Text style={[styles.text, {color: textColor}]}>{number}</Text>
              </View>
            </View>
          </>
        }
        numColumns={3}
        data={rollPhotos}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => (
          <ProfileGridCard url={item.url} nav={'Profile List'} index={index} />
        )}
      />
    </View>
  );
};

export default Profile;
