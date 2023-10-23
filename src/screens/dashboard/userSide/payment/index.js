import { SafeAreaView, StyleSheet, Image, View, Text, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react';
import HomeHeader from '../../../../components/homeHeader'
import CustomSearchbar from '../../../../components/CustomSearchbar'
import { Images } from '../../../../assets/images'
import { Size, hp, wp } from '../../../../assets/dimensions'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors } from '../../../../assets/color'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../../../components/header'
import CardDetailsInput from '../../../../components/cardDetailsInput';
import CustomButton from '../../../../components/CustomButton';






export default function Payment() {
    const [selectedButton, setSelectedButton] = useState(null);
      
        const handleButtonPress = (buttonName) => {
          setSelectedButton(buttonName);
        };

    const SelectableButtonRow = () => {
        
      
        return (
          <View style={styles.container}>
            <TouchableOpacity
              style={[
                styles.button,
                selectedButton === 'button1' ? styles.selectedButton : null,
              ]}
              onPress={() => handleButtonPress('button1')}
            >
              
              <Text style={styles.buttonText}>PayPal</Text>
              <Ionicons name="checkmark-circle" size={Size(2.2)} color="white" />
            </TouchableOpacity>
      
            <TouchableOpacity
              style={[
                styles.button,
                selectedButton === 'button2' ? styles.selectedButton : null,
              ]}
              onPress={() => handleButtonPress('button2')}
            >
              
              <Text style={styles.buttonText}>Credit</Text>
              <Ionicons name="checkmark-circle" size={Size(2.2)} color="white" />
            </TouchableOpacity>
      
            <TouchableOpacity
              style={[
                styles.button,
                selectedButton === 'button3' ? styles.selectedButton : null,
              ]}
              onPress={() => handleButtonPress('button3')}
            >
              
              <Text style={styles.buttonText}>Wallet</Text>
              <Ionicons name="checkmark-circle" size={Size(2.2)} color="white" />
            </TouchableOpacity>
          </View>
        );
      };


  return (
    <SafeAreaView style={{backgroundColor:Colors.white,flex:1}}>
        <Header title ='Payment' centered />
        <View style={{paddingHorizontal:wp(5)}}>
            <Text style={styles.headingStyle}>
                Total Price
            </Text>
            <Text style={styles.amountStyle}>
            $2,280.00
            </Text>
            <Text style={{...styles.headingStyle,marginTop:wp(2)}}>
            Pavment Method
            </Text>
        </View>
        <SelectableButtonRow/>

        <CardDetailsInput/>

        <CustomButton overrideStyle={{width:wp(50)}} buttonTextStyle={{fontSize:Size(1.6)}} text={'Proceed to Confirm'} size="small" onPress={handleButtonPress} />


    

    
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: wp(4),
      marginTop: wp(4),
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: Colors.primaryLight,
      borderRadius: 8,
      paddingVertical: wp(3),
      paddingHorizontal: wp(4),
      opacity: 0.6,
    },
    selectedButton: {
      backgroundColor: Colors.primaryLight,
      opacity: 1,
    },
    buttonText: {
      color: 'white',
      marginRight: wp(2),
      fontSize:Size(1.6)
    },
    amountStyle:{
        fontSize:Size(3),
        color:Colors.primaryLight,
        fontWeight:'bold'
    },
    headingStyle:{
        fontSize:Size(2.2),
        color:Colors.lightBlack
    }
  });