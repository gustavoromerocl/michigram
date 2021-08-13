import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../config/colors';
import {useTheme} from '../../context/Theme';
import CatImage from '../Commons/CatImage';
import Heart from '../Commons/Heart';
import Star from '../Commons/Star';
import {useApiInformation} from '../../context/LoadApi';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderColor: colors.gray,
    borderWidth: 0.6,
    marginBottom: 35,
    borderRadius: 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    marginHorizontal: 10,
  },
  catImage: {
    backgroundColor: colors.black,
    width: '100%',
    height: 400,
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  heart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
    height: 80,
  },
  likes: {
    paddingLeft: 10,
    fontSize: 20,
    fontFamily: 'LondrinaSolid-Regular',
  },
});

const CatCard = ({url, id, favorite = false}) => {
  const [like, updateLike] = useState(false);
  const [save, updateSave] = useState(favorite);
  const [lastPress, updateLastPress] = useState(0);
  const [counter, updateCounter] = useState(
    Math.round(Math.random() * (1000000 - 1) + 1),
  );
  const {
    mainTheme: {backgroundColor, textColor},
  } = useTheme();

  const {saveImageHome, deleteImage} = useApiInformation();

  const onDoublePress = () => {
    var delta = new Date().getTime() - lastPress;

    if (delta < 200) {
      updateLike(!like);
      counterLike();
    }

    updateLastPress(new Date().getTime());
  };

  const toggleLike = () => {
    updateLike(!like);
    counterLike();
  };

  const counterLike = () => {
    if (!like) {
      updateCounter(counter + 1);
    } else {
      updateCounter(counter - 1);
    }
  };

  const toggleStar = () => {
    updateSave(!save);
    if (!save) {
      saveImageHome(id);
    } else {
      deleteImage(id);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={[styles.catImage, {backgroundColor: backgroundColor}]}>
          <CatImage toggle={() => onDoublePress()} catUrl={url} />
        </View>
        <View style={[styles.heart, {backgroundColor: backgroundColor}]}>
          <Star star save={save} onPress={() => toggleStar()} />
          <Heart heart like={like} ratingPress={() => toggleLike()} />
          <Text style={[styles.likes, {color: textColor}]}>
            {counter} likes
          </Text>
        </View>
      </View>
    </>
  );
};

export default CatCard;
