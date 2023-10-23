import { SafeAreaView, StyleSheet, Image, View, Text, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { hp, wp } from '../../../../assets/dimensions'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors } from '../../../../assets/color'
import Header from '../../../../components/header'
import ChatCardGrid from '../../../../components/chatCardGrid'
import ChatSearchbar from '../../../../components/chatSearchBar'

export default function ChatScreen() {
  return (
    <SafeAreaView style={{backgroundColor:Colors.white,flex:1}}>
       <View style={styles.headerView}>
       <Header  centered />
        <ChatSearchbar placeholder = 'Message'/>
       </View>
        <ScrollView nestedScrollEnabled={true}>
    <ChatCardGrid/>

    </ScrollView>
    

    
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
    }
})