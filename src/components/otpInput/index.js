import React, {useRef, useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {hp, wp} from '../../assets/dimensions';
import {Colors} from '../../assets/color';

const OTPInput = ({onOtpChange, OTPError}) => {
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const inputRefs = useRef([null, null, null, null]);

  const handleTextChange = (text, index) => {
    if (text.length === 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    const newOtpValues = [...otpValues];
    newOtpValues[index] = text;
    setOtpValues(newOtpValues);

    if (index === newOtpValues.length - 1 && text !== '') {
      const concatenatedOtp = newOtpValues.join('');
      onOtpChange(concatenatedOtp);
    }
  };

  return (
    <View>
      <View style={[styles.container]}>
        {otpValues.map((value, index) => (
          <TextInput
            key={index}
            style={styles.input}
            maxLength={1}
            keyboardType="numeric"
            value={value}
            onChangeText={text => handleTextChange(text, index)}
            ref={ref => (inputRefs.current[index] = ref)}
          />
        ))}
      </View>
      {OTPError ? <Text style={styles.errorMessage}>{OTPError}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(88),
    alignSelf: 'center',
    marginVertical: hp(4),
    // borderWidth: 1,
    // borderColor: Colors.black,
  },
  input: {
    width: wp(15),
    height: wp(15),
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
  },
  errorMessage: {
    color: 'red',
    margin: hp(2),
  },
});

export default OTPInput;
