import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../../config/colors';
import {useTheme} from '../../context/Theme';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  inputSubmit: {
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
    padding: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
  },
  buttonText: {
    fontSize: 20,
    color: colors.white,
    marginRight: 10,
    fontFamily: 'LondrinaSolid-Regular',
  },
});

const CustomButton = ({onPress, contain}) => {
  const {
    mainTheme: {primaryColor},
  } = useTheme();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.inputSubmit, {backgroundColor: primaryColor}]}
        onPress={onPress}>
        <Text style={styles.buttonText}>{contain}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
