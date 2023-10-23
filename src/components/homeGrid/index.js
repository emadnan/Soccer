import React from 'react';
import { View, FlatList, StyleSheet, Image, Text, Platform } from 'react-native';
import { hp, wp } from '../../assets/dimensions';

const data = [
  { id: '1', title: 'Mobile', image: 'https://picsum.photos/seed/11/200/200' },
  { id: '2', title: 'A/C', image: 'https://picsum.photos/seed/12/200/200' },
  { id: '3', title: 'Elevator', image: 'https://picsum.photos/seed/13/200/200' },
  { id: '4', title: 'Electricity', image: 'https://picsum.photos/seed/14/200/200'},
  { id: '5', title: 'Plumbing', image: 'https://picsum.photos/seed/15/200/200' },
  { id: '6', title: 'Camera',image: 'https://picsum.photos/seed/51/200/200'},
  { id: '7', title: 'Carpenter',image: 'https://picsum.photos/seed/24/200/200'},
  { id: '8', title: 'Garage', image: 'https://picsum.photos/seed/8/200/200' },
  { id: '9', title: 'Flooring', image: 'https://picsum.photos/seed/9/200/200' },
];

const HexagonalCircleItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.hexagonContainer}>
        {/* <View style={styles.hexagon} /> */}
        <Image resizeMode='contain' source={{ uri: item.image }} style={styles.image} />
      </View>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
};

const HomeGrid = () => {
  const renderItem = ({ item }) => {
    return <HexagonalCircleItem item={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        nestedScrollEnabled={true}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height:hp(25),
    width:wp(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  flatListContent: {
    flex:1,
    width:wp(95),
    alignItems:'center',
    // paddingVertical: 10,
  },
  itemContainer: {
    // alignItems: 'center',
    marginHorizontal:  wp(7),
    marginVertical:  wp(2),
  },
  hexagonContainer: {
    width: wp(20),
    height: wp(20),
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
        ios: {
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.11,
          shadowRadius: 10,
        },
        android: {
          elevation: 8,
        },
      }),
    
    // transform: [{ rotate: '-30deg' }],
  },
  hexagon: {
    width: wp(20),
    height: wp(20),
    backgroundColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 20,
  },
  image: {
    width: wp(20),
    height: wp(20),
    borderRadius: 40,
    alignSelf:'center'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeGrid;
