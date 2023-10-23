import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import IIcon from 'react-native-vector-icons/Ionicons';
import { Size, hp, wp } from '../../assets/dimensions'
import { Colors } from '../../assets/color';
import { useNavigation } from '@react-navigation/native';

export default function Header(props) {
  const navigation = useNavigation()
  return (
    <View style={styles.headerContainer}>
        {props?.disableBack === true ? null :  <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backButtonStyle}>
        <IIcon color='white' name="chevron-back" size={Size(2)} />
        </TouchableOpacity> }
       { props?.title && <Text style={props.centered ? {...styles.centeredStyle,...props?.centeredStyle} : styles.titleStyle}>{props?.title}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
    headerContainer:{
        width:wp(90),
        alignSelf:'center',
        paddingTop:hp(2)
    },
    backButtonStyle:{
      backgroundColor:Colors.primaryLight,
      height:wp(8),
      width:wp(8),
      alignItems:"center",
      justifyContent:'center',
      borderRadius:100
    },
    titleStyle:{
      fontSize:Size(2.8),
      color:Colors.primaryLight,
      marginLeft:wp(5),
    },
    centeredStyle:{
      alignSelf:'center',
      fontSize:Size(2.2),
      color:Colors.black,
      bottom:wp(5)
      
    }
})