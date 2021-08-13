import {useNavigation} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../../config/colors';
import {useApiInformation} from '../../context/LoadApi';
import {useTheme} from '../../context/Theme';
import CatImage from '../Commons/CatImage';
import Star from '../Commons/Star';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderColor: colors.gray,
    borderWidth: 0.6,
    borderBottomWidth: 0.6,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginHorizontal: 7,
    width: '30%',
    height: 140,
  },
  catImage: {
    backgroundColor: colors.black,
    width: '100%',
    height: 100,
    paddingHorizontal: 5,
    paddingTop: 20,
  },
  heart: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
    height: 20,
  },
  star: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const PortfolioGridCard = ({url, nav, index, id}) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [save, updateSave] = useState(true);
  const [like, updateLike] = useState(false);
  const [lastPress, updateLastPress] = useState(0);
  const {
    mainTheme: {backgroundColor},
  } = useTheme();
  const {deleteImage} = useApiInformation();

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const onDoublePress = () => {
    var delta = new Date().getTime() - lastPress;

    if (delta < 200) {
      updateLike(!like);
    }

    updateLastPress(new Date().getTime());
  };

  const navigation = useNavigation();

  const toggleStar = () => {
    updateSave(!save);
    setTimeout(() => {
      if (save) {
        deleteImage(id);
      }
    }, 2000);
  };

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          {backgroundColor: backgroundColor},
          {opacity: fadeAnim},
        ]}>
        <TouchableOpacity
          style={[styles.catImage, {backgroundColor: backgroundColor}]}
          onPress={() => {
            navigation.navigate(nav, {index});
          }}>
          <CatImage toggle={() => onDoublePress()} catUrl={url} />
        </TouchableOpacity>
        <View style={styles.star}>
          <Star
            star
            save={save}
            onPress={() => {
              fadeOut();
              toggleStar();
            }}
          />
        </View>
      </Animated.View>
    </>
  );
};

export default PortfolioGridCard;
