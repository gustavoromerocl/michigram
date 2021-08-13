import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';
import {ThemeContext} from '../../context/Theme';
import ChangePhotoOptions from './ChangePhotoOptions';
import {useState} from 'react';
import {useUserInformation} from '../../context/User';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  squareContainer: {
    width: '100%',
    height: 200,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoContainer: {
    borderColor: colors.black,
    borderWidth: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageFrame: {
    width: '100%',
    height: '100%',
  },
  textStyle: {
    paddingTop: 15,
    fontFamily: 'LondrinaSolid-Light',
  },
});

const BackgroundAddPhoto = ({uri = null}) => {
  const [modalActive, updateModalActive] = useState(false);
  const {updateBackgroudImage} = useUserInformation();

  const {
    mainTheme: {backgroundColor, textColor},
  } = useContext(ThemeContext);

  const toggleModal = () => updateModalActive(!modalActive);

  const ImagePhoto = !uri ? (
    <View
      style={[
        styles.addPhotoContainer,
        styles.imageFrame,
        {borderColor: textColor},
      ]}>
      <Icon name="image-plus" color={textColor} size={30} />
      <Text style={[styles.textStyle, {color: textColor}]}>Add Background</Text>
    </View>
  ) : (
    <Image style={styles.imageFrame} source={{uri: uri}} />
  );

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={toggleModal}
        underlayColor={textColor}
        style={[styles.squareContainer, {backgroundColor: backgroundColor}]}>
        {ImagePhoto}
      </TouchableHighlight>
      <Modal visible={modalActive} transparent={true} animationType={'fade'}>
        <ChangePhotoOptions
          onPress={toggleModal}
          setImage={updateBackgroudImage}
          modal={updateModalActive}
          title={'Anadir Fondo'}
        />
      </Modal>
    </View>
  );
};

export default BackgroundAddPhoto;
