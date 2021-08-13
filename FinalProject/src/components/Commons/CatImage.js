import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    backgroundColor: '#34495e',
    borderRadius: 10,
  },
});

const CatImage = ({toggle, catUrl}) => {
  return (
    <TouchableWithoutFeedback style={styles.touchable} onPress={toggle}>
      <Image source={{uri: catUrl}} resizeMode="cover" style={styles.image} />
    </TouchableWithoutFeedback>
  );
};

export default CatImage;
