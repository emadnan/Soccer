import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import IIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Size, hp, wp } from '../../assets/dimensions'
import { Colors } from '../../assets/color';

export default function IconButton(props) {
  return (
        <TouchableOpacity style={styles.ButtonStyle}>
        <IIcon color='white' name={props.ionName} size={25} />
        </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    
    ButtonStyle:{
      backgroundColor:Colors.primaryLight,
      height:wp(8),
      width:wp(8),
      alignItems:"center",
      justifyContent:'center',
      borderRadius:100,
      marginHorizontal:wp(2)
    },
})