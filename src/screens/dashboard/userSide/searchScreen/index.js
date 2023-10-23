import { SafeAreaView, StyleSheet, Image, View, Text, TouchableOpacity, Platform, FlatList } from 'react-native'
import React from 'react'
import { Size, hp, wp } from '../../../../assets/dimensions'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors } from '../../../../assets/color'
import Header from '../../../../components/header'
import ChatCardGrid from '../../../../components/chatCardGrid'
import CustomSearchbar from '../../../../components/CustomSearchbar'
import CustomButton from '../../../../components/CustomButton'
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { sudoOctoboss } from '../../../../assets/Strings'


  
  const HexagonalCircleItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.hexagonContainer}>
          <Image resizeMode='contain' source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={{flex:1,paddingLeft:wp(2),height:'100%'}}>
        <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',flex:1}}>
        <Text style={{...styles.title,color:Colors.primaryLight,fontSize:Size(2.2),fontWeight:'bold'}}>{item.personName}</Text> 
       
          
              <Ionicons color={Colors.lightBlack} name={item.isVerified === true ? "checkmark-circle-outline":"close-circle-outline"} size={Size(2.4)} />
          
        </View>
        <View style={{width:'100%',justifyContent:'space-between',flex:1}}>
        <Text style={{...styles.title,alignSelf:'auto'}}>{item.serviceCategory}</Text>
        <Text style={{...styles.title,alignSelf:'auto'}}>{item.experience}</Text>
        <View style={{flexDirection:'row'}}>
        <Text style={{...styles.title,alignSelf:'auto'}}><Ionicons color={Colors.primaryLight} name="thumbs-up-sharp" size={Size(2)} /> {item.rating}%</Text>
        <Text style={{...styles.title,alignSelf:'center',marginLeft:wp(5),alignItems:'center'}}><Ionicons color={Colors.primaryLight} name="chatbox-ellipses" size={Size(2)} /> {item.numberOfComments}</Text>
            </View> 
            
        
        </View>
        <View style={{width:'100%',alignItems:'center',flex:1,flexDirection:'row'}}>
        <CustomButton overrideStyle={{marginVertical:0,marginTop:wp(3),alignSelf:'flex-start'}} buttonTextStyle={styles.buttonTextStyle} text={'Location'} size="customSmall"/>
        <Text style={{...styles.title, marginLeft:wp(5),marginTop:wp(2)}}><Ionicons color={Colors.primaryLight} name="chatbubbles" size={Size(2.2)} /> Chats</Text>
        </View>
        
        
        </View>
        
        
      </View>
    );
  };


export default function SearchScreen() {

    const renderItem = ({ item }) => {
        return <HexagonalCircleItem item={item} />;
      };

      
  return (
    <SafeAreaView style={{backgroundColor:Colors.white,flex:1}}>
       <View style={styles.headerView}>
       <Header  centered />
       <CustomSearchbar placeholder = 'Search any service'/>
       <View style={{flexDirection:'row',marginHorizontal:wp(2),justifyContent:'space-around'}}>
       <CustomButton buttonTextStyle={styles.buttonTextStyle} text={'Now or Later'} size="customSmall"/>
       <CustomButton buttonTextStyle={styles.buttonTextStyle} text={'Labours'} size="customSmall"/>
       <CustomButton buttonTextStyle={styles.buttonTextStyle} text={'Sort/Filters'} size="customSmall"/>
       </View>
       <View style={{width:wp(100),paddingVertical:hp(1),backgroundColor:Colors.primaryLight,justifyContent:'space-around',flexDirection:'row',alignItems:'center'}}>
       <Text style={{fontSize:Size(2),color:Colors.white}}>
       Result offering Benfits
       </Text>
       <Foundation color='white' name="paperclip" size={Size(3)} />
       </View>
       </View>
        <ScrollView nestedScrollEnabled={true}>
        <View style={styles.container}>
      <FlatList
        data={sudoOctoboss}
        nestedScrollEnabled={true}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </View>

    </ScrollView>
    

    
    </SafeAreaView>
  )
}

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

    cardImage:{ 
    alignSelf: 'center',
    width:wp(100),
    height:hp(45),
    
},
innerButton:{
    alignSelf:'center',
    marginVertical:wp(2),
    height:hp(5),
    borderWidth:0.8,
    paddingHorizontal:wp(5),
    justifyContent:'center',
    borderRadius:wp(10),
    backgroundColor:Colors.white,
    borderColor:Colors.primaryLight,
    ...Platform.select({
        ios: {
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.11,
          shadowRadius: 8,
        },
        android: {
          elevation: 5,
        },
      }),
},
    headerView:{
        backgroundColor:Colors.white,borderBottomLeftRadius:10,borderBottomRightRadius:10, ...Platform.select({
            ios: {
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.11,
              shadowRadius: 8,
            },
            android: {
              elevation: 5,
            },
          }),
    },
    buttonTextStyle:{fontSize:Size(1.2),color:Colors.primaryLight},
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
        marginVertical:  wp(1),
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
        height: wp(25),
        width: wp(25),
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
        width: wp(20),
        height: wp(20),
        borderRadius: wp(100),
        alignSelf:'center'
      },
      title: {
        fontSize: Size(1.6),
        color:Colors.lightBlack
      },
})