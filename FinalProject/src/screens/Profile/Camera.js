import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import CameraInterface from '../../components/Photo/CameraInterface';
import colors from '../../config/colors';
import {useUserInformation} from '../../context/User';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.black,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  pendingPreview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const PendingPreview = () => (
  <View style={styles.pendingPreview}>
    <Text>Esperando</Text>
  </View>
);

const Camera = () => {
  const navigation = useNavigation();

  const {updatePhoto} = useUserInformation();

  const takePicture = async (camera) => {
    const options = {quality: 0.4, base64: true};
    const data = await camera.takePictureAsync(options);

    if (data?.uri) {
      updatePhoto(data?.uri);
      navigation.pop();
    }
  };

  const selectImage = () =>
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        updatePhoto(response.uri);
        navigation.navigate('Profile');
      },
    );

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        captureAudio={false}>
        {({camera, status}) => {
          if (status !== 'READY') {
            return <PendingPreview />;
          }

          return (
            <CameraInterface
              takePicture={takePicture}
              camera={camera}
              selectImage={selectImage}
            />
          );
        }}
      </RNCamera>
    </View>
  );
};

export default Camera;
