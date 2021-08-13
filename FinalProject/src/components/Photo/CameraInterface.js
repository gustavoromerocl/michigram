import React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import colors from '../../config/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window'); //Se usa para dimensionar y adaptar el tamaño según el dispositivo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  photoBoxContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoBoxCircle: {
    width: width * 0.6,
    height: width * 0.6,
    borderWidth: 5,
    backgroundColor: 'transparent',
    borderColor: colors.gray,
    borderRadius: 200,
  },
  bottomButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  captureBottonContainer: {
    width: 100,
    height: 100,
    borderColor: colors.gray,
    borderWidth: 2,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  captureInnerButtonContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.gray,
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

const CameraInterface = ({
  takePicture = () => {},
  camera,
  selectImage = () => {},
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.photoBoxContainer}>
        <View style={styles.photoBoxCircle} />
      </View>
      <View style={styles.bottomButtons}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon name="keyboard-backspace" color={colors.white} size={50} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => takePicture(camera)}
          style={styles.captureBottonContainer}>
          <View style={styles.captureInnerButtonContainer} />
        </TouchableOpacity>
        <TouchableOpacity onPress={selectImage}>
          <Icon name="image-multiple-outline" color={colors.white} size={50} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraInterface;
