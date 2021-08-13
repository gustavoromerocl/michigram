import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
import CatCard from '../../components/Home/CatCard';
import {useApiInformation} from '../../context/LoadApi';
import {useTheme} from '../../context/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterButton: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    borderRadius: 30,
    padding: 10,
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

const PortfolioList = ({route}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const {
    mainTheme: {backgroundColor, textColor},
  } = useTheme();
  const {portfolioImages} = useApiInformation();
  const {index} = route.params;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <Animated.FlatList
        style={{opacity: fadeAnim}}
        data={portfolioImages}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <CatCard url={item.url} id={item.id} favorite={true} />
        )}
        initialScrollIndex={index}
        getItemLayout={(data, index) => ({
          length: 528,
          offset: 528 * index,
          index,
        })}
        ListEmptyComponent={() => (
          <View style={styles.containerText}>
            <Text style={[styles.text, {color: textColor}]}>
              Empty portfolio
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default PortfolioList;
