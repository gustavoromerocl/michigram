import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {View, StyleSheet, TouchableHighlight, Image, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';
import {ThemeContext} from '../../context/Theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  circleContainer: {
    width: 130,
    height: 130,
    borderRadius: 100,
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
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  textStyle: {
    paddingTop: 15,
    fontFamily: 'LondrinaSolid-Light',
  },
});

const AddPhoto = ({uri = null}) => {
  const navigation = useNavigation();

  const {
    mainTheme: {backgroundColor, textColor},
  } = useContext(ThemeContext);

  const ImagePhoto = !uri ? (
    <View
      style={[
        styles.addPhotoContainer,
        styles.imageFrame,
        {borderColor: textColor},
      ]}>
      <Icon name="image-plus" color={textColor} size={30} />
      <Text style={[styles.textStyle, {color: textColor}]}>Add Photo</Text>
    </View>
  ) : (
    <Image style={styles.imageFrame} source={{uri}} />
  );

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => navigation.navigate('Camera')}
        underlayColor={colors.gray}
        style={[styles.circleContainer, {backgroundColor: backgroundColor}]}>
        {ImagePhoto}
      </TouchableHighlight>
    </View>
  );
};

export default AddPhoto;
