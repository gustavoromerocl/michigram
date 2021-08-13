import React, { useContext } from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';
import { ThemeContext } from '../../context/Theme';

const Heart = ({heart, like, ratingPress}) => {
  const {
    mainTheme: {primaryColor},
  } = useContext(ThemeContext);

  if (heart) {
    return (
      <TouchableOpacity onPress={() => ratingPress()}>
        <Icon
          name="heart"
          size={40}
          color={like ? primaryColor : colors.gray}
        />
      </TouchableOpacity>
    );
  }
};

export default Heart;
