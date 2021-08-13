import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import CatCard from './CatCard';

const CatList = ({data, index, favorite = false}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <>
      <Animated.FlatList
        style={{opacity: fadeAnim}}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <CatCard url={item.url} id={item.id} favorite={favorite} />
        )}
        initialScrollIndex={index}
        getItemLayout={(data, index) => ({
          length: 528,
          offset: 528 * index,
          index,
        })}
      />
    </>
  );
};

export default CatList;
