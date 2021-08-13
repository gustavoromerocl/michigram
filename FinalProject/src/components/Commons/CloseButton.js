import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import CloseIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../../context/Theme';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

const CloseButton = ({onPress}) => {
  const {
    mainTheme: {primaryColor},
  } = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <CloseIcon name={'close-circle'} size={40} color={primaryColor} />
    </TouchableOpacity>
  );
};

export default CloseButton;
