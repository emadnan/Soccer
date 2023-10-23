import React from 'react';
import { View, FlatList, StyleSheet, Image, Text, Platform } from 'react-native';
import { Size, hp, wp } from '../../assets/dimensions';
import { Colors } from '../../assets/color';
import Ionicons from 'react-native-vector-icons/Ionicons';

const data = [
  { id: '1',timeSlot:'11:00 to 12:00pm',shortDisc:'Lorem ipsum', title: 'Amil', image: 'https://picsum.photos/seed/11/200/200' },
  { id: '2',timeSlot:'11:00 to 12:00pm',shortDisc:'Lorem ipsum', title: 'Ali', image: 'https://picsum.photos/seed/12/200/200' },
  { id: '3',timeSlot:'11:00 to 12:00pm',shortDisc:'Lorem ipsum', title: 'Kafyat', image: 'https://picsum.photos/seed/13/200/200' },
  { id: '4',timeSlot:'11:00 to 12:00pm',shortDisc:'Lorem ipsum', title: 'Furr', image: 'https://picsum.photos/seed/14/200/200'},
  { id: '5',timeSlot:'11:00 to 12:00pm',shortDisc:'Lorem ipsum', title: 'John', image: 'https://picsum.photos/seed/15/200/200' },
  { id: '6',timeSlot:'11:00 to 12:00pm',shortDisc:'Lorem ipsum', title: 'Lorem',image: 'https://picsum.photos/seed/51/200/200'},
  { id: '7',timeSlot:'11:00 to 12:00pm',shortDisc:'Lorem ipsum', title: 'William',image: 'https://picsum.photos/seed/24/200/200'},
  { id: '8',timeSlot:'11:00 to 12:00pm',shortDisc:'Lorem ipsum', title: 'George', image: 'https://picsum.photos/seed/8/200/200' },
  { id: '9',timeSlot:'11:00 to 12:00pm',shortDisc:'Lorem ipsum', title: 'Kaifi', image: 'https://picsum.photos/seed/9/200/200' },
];

const HexagonalCircleItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.hexagonContainer}>
        <Image resizeMode='contain' source={{ uri: item.image }} style={styles.image} />
      </View>
      <View style={{flex:1,paddingLeft:wp(2),height:'100%'}}>
      <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',flex:1}}>
      <Text style={{...styles.title,color:Colors.primaryLight,fontSize:Size(1.8),fontWeight:'bold'}}>{item.title}</Text> 
      
      </View>
      <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',alignItems:'flex-end',flex:1}}>
      <Text style={{...styles.title,alignSelf:'auto'}}>{item.shortDisc}</Text> 
      <View style={styles.rightIconStyle}>
        {item.id >=6 ? (
            <Ionicons color='white' name="checkmark" size={Size(2)} />
        ) : 
        <Text style={{...styles.title,alignSelf:'auto',color:Colors.white}}>{item.id}</Text>
        }
        
        </View>
      </View>
      </View>
      
    </View>
  );
};

const ChatCardGrid = () => {
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
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:wp(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  flatListContent: {
    flex:1,
    width:wp(100),
  },
  rightIconStyle:{
    backgroundColor:Colors.primaryLight,
    height:wp(6),
    width:wp(6),
    alignItems:"center",
    justifyContent:'center',
    borderRadius:100
  },
  itemContainer: {
    flexDirection:"row",
    paddingHorizontal:  wp(2),
    paddingVertical:wp(4),
    // marginVertical:  wp(1),
    alignItems:'center',
    backgroundColor:Colors.white,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  hexagonContainer: {
    height: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
        ios: {
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
        android: {
          elevation: 6,
        },
      }),
  },
  hexagon: {
    width: wp(20),
    height: wp(20),
    backgroundColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(100),
    alignSelf:'center'
  },
  title: {
    fontSize: Size(1.3),
    color:Colors.lightBlack
  },
});

export default ChatCardGrid;
