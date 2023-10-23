import React, {useState} from 'react';
import {View, Text, TextInput, Switch, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../assets/color';
import CustomTextInput from '../CustomTextInput';
import {Size, hp, wp} from '../../assets/dimensions';

const CardDetailsInput = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [saveCardData, setSaveCardData] = useState(false);

  // Function to determine card type based on the card number input
  const getCardType = () => {
    if (/^4/.test(cardNumber)) {
      return 'Visa';
    } else if (/^5[1-5]/.test(cardNumber)) {
      return 'Mastercard';
    } else if (/^3[47]/.test(cardNumber)) {
      return 'American Express';
    } else {
      return 'Card Type';
    }
  };

  // Function to handle card number input change
  const handleCardNumberChange = text => {
    setCardNumber(text);
  };

  // Function to handle expiry date input change
  const handleExpiryDateChange = text => {
    setExpiryDate(text);
  };

  // Function to handle CVV input change
  const handleCvvChange = text => {
    setCvv(text);
  };

  // Function to handle cardholder name input change
  const handleCardholderNameChange = text => {
    setCardholderName(text);
  };

  // Function to handle save card data toggle switch change
  const handleSaveCardDataChange = () => {
    setSaveCardData(!saveCardData);
  };

  // Function to validate card details before submission
  const validateCardDetails = () => {
    // Perform validation logic here
    // You can check for the required format, length, etc.
    // Return true if card details are valid, false otherwise
    // You can customize the validation based on your requirements
    return (
      cardNumber.length === 16 &&
      expiryDate.length === 5 &&
      cvv.length === 3 &&
      cardholderName.length >= 2
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CustomTextInput
          header="Card Number"
          placeholder="Card Number"
          value={cardNumber}
          onChangeText={handleCardNumberChange}
          keyboardType="numeric"
          maxLength={16}
          overrideInputStyle={{borderRadius: 10}}
          overrideStyle={{marginVertical: 0}}
          // rightIcon={<Text style={styles.cardType}>{getCardType()}</Text>}
        />
      </View>

      <View
        style={{
          ...styles.row,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <CustomTextInput
          header="Expiry Date"
          placeholder="DD/MM/YYY"
          value={expiryDate}
          onChangeText={handleExpiryDateChange}
          keyboardType="numeric"
          maxLength={5}
          overrideInputStyle={{borderRadius: 10}}
          overrideStyle={{marginVertical: 0, width: wp(48)}}
        />

        <CustomTextInput
          header="CVV"
          placeholder="CVV"
          value={cvv}
          onChangeText={handleCvvChange}
          keyboardType="numeric"
          maxLength={3}
          overrideInputStyle={{borderRadius: 10}}
          overrideStyle={{marginVertical: 0, width: wp(38)}}
        />
      </View>

      <View style={styles.row}>
        <CustomTextInput
          header="Card Holder Name"
          placeholder="Card Holder Name"
          value={cardholderName}
          onChangeText={handleCardholderNameChange}
          overrideInputStyle={{borderRadius: 10}}
          overrideStyle={{marginVertical: 0}}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>
            Save card data for future Payment
          </Text>
          <Switch
            trackColor={{false: '#767577', true: Colors.primaryLight}}
            thumbColor={saveCardData ? Colors.white : '#f4f3f4'}
            onValueChange={handleSaveCardDataChange}
            value={saveCardData}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: hp(5),
  },
  row: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    paddingBottom: 8,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: 'black',
  },
  cardType: {
    alignSelf: 'center',
    color: '#999',
    fontSize: Size(1.2),
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleLabel: {
    fontSize: Size(1.6),
  },
});

export default CardDetailsInput;
