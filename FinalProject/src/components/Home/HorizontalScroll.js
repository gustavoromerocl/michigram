import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../../config/colors';
import {useTheme} from '../../context/Theme';

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 10,
    fontSize: 20,
    fontFamily: 'LondrinaSolid-Light',
    color: colors.white,
  },
  touchable: {
    borderRadius: 10,
    margin: 10,
  },
});

const HorizontalScroll = ({data, onPress}) => {
  const [selectedItem, updateSelectedItem] = useState();
  const {
    mainTheme: {primaryColor},
  } = useTheme();
  const onPressHandler = (id) => {
    updateSelectedItem(id);
  };

  return (
    <View>
      <FlatList
        extraData={selectedItem}
        data={data}
        horizontal
        keyExtractor={({id}) => id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({item: {id, name}}) => (
          <TouchableOpacity
            onPress={() => {
              onPress(id);
              onPressHandler(id);
            }}
            style={
              selectedItem === id
                ? [styles.touchable, {backgroundColor: primaryColor}]
                : [styles.touchable]
            }>
            <Text
              style={
                selectedItem === id
                  ? [styles.text, {color: colors.white}]
                  : [styles.text, {color: primaryColor}]
              }>
              {name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HorizontalScroll;
