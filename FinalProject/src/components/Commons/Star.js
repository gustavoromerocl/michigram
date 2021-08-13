import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import colors from '../../config/colors';

const Star = ({star, save, onPress}) => {
  if (star) {
    return (
      <TouchableOpacity onPress={() => onPress()}>
        <AntDesignIcon
          name="star"
          size={40}
          color={save ? '#FFD200' : colors.gray}
        />
      </TouchableOpacity>
    );
  }
};

export default Star;
