import React from 'react';
import {Text, View, TextInput as TextInputRN, StyleSheet} from 'react-native';
import colors from '../../config/colors';
import {useTheme} from '../../context/Theme';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    padding: 5,
  },
  label: {
    fontSize: 15,
    color: colors.black,
    fontFamily: 'LondrinaSolid-Light',
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 7,
  },
  textInput: {
    fontSize: 20,
    marginVertical: 10,
    paddingLeft: 10,
    color: colors.black,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.pink,
    fontFamily: 'LondrinaSolid-Light',
  },
});

const TextInput = ({
  value,
  placeholder,
  type = 'default',
  labelTag,
  onChange = () => {},
}) => {
  const {
    mainTheme: {textColor, primaryColor},
  } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, {color: textColor}]}>{labelTag}</Text>
      <View style={styles.inputContainer}>
        <TextInputRN
          testID="TextInput"
          value={value}
          style={[
            styles.textInput,
            {color: textColor, borderBottomColor: primaryColor},
          ]}
          placeholder={placeholder}
          keyboardType={type}
          onChangeText={onChange}
        />
      </View>
    </View>
  );
};

export default TextInput;
