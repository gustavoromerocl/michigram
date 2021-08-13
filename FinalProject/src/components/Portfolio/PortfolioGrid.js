import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import {useTheme} from '../../context/Theme';
import PortfolioGridCard from './PortfolioGridCard';

const styles = StyleSheet.create({
  flatListContainer: {
    justifyContent: 'space-between',
  },
  containerText: {
    paddingTop: '50%',
  },
  text: {
    fontSize: 20,
    fontFamily: 'LondrinaSolid-Light',
    textAlign: 'center',
  },
});

const PortfolioGrid = ({data, nav}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const {
    mainTheme: {textColor},
  } = useTheme();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <>
      <View style={styles.flatListContainer}>
        <Animated.FlatList
          style={{opacity: fadeAnim}}
          numColumns={3}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => {
            return (
              <PortfolioGridCard
                url={item.url}
                nav={nav}
                index={index}
                id={item.id}
              />
            );
          }}
          ListEmptyComponent={() => (
            <View style={styles.containerText}>
              <Text style={[styles.text, {color: textColor}]}>
                You did not add images to the portfolio
              </Text>
            </View>
          )}
        />
      </View>
    </>
  );
};

export default PortfolioGrid;
