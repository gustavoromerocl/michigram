import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../config/colors';
import CloseButton from '../Commons/CloseButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.5)',
  },
  contain: {
    height: 200,
    width: 300,
    backgroundColor: colors.white,
    borderRadius: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'LondrinaSolid-Regular',
  },
  text: {
    fontSize: 20,
    fontFamily: 'LondrinaSolid-Light',
  },
});

const ChangePhotoOptions = ({onPress, setImage, modal, title}) => {
  const navigation = useNavigation();

  const takePhoto = () =>
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
        saveToPhotos: true,
      },
      (response) => {
        setImage(response.uri);
        navigation.navigate('Profile');
      },
    );

  const selectImage = () =>
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        setImage(response.uri);
        navigation.navigate('Profile');
      },
    );

  return (
    <View style={styles.container}>
      <View style={styles.contain}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          onPress={() => {
            takePhoto();
            modal(false);
          }}>
          <Text style={styles.text}> Usar la cámara </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            selectImage();
            modal(false);
          }}>
          <Text style={styles.text}> Elegir de la galería </Text>
        </TouchableOpacity>
        <CloseButton onPress={onPress} />
      </View>
    </View>
  );
};

export default ChangePhotoOptions;
