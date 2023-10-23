import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Size, hp, wp} from '../../assets/dimensions';
import {Colors} from '../../assets/color';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomTextInput = ({
  header,
  placeholder,
  rightIcon,
  value,
  onChangeText,
  isSecure,
  overrideInputStyle,
  overrideStyle,
  leftIcon,
  error,
}) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(isSecure);

  const toggleSecureTextEntry = () => {
    setIsSecureTextEntry(!isSecureTextEntry);
  };

  return (
    <View style={{...styles.container, ...overrideStyle}}>
      {header && (
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{header}</Text>
        </View>
      )}
      <View style={{...styles.textInputContainer, ...overrideInputStyle}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {leftIcon}
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor="#888"
            secureTextEntry={isSecureTextEntry}
          />
          {isSecure && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={toggleSecureTextEntry}>
              <Ionicons
                name={isSecureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color={Colors.darkGrey30}
              />
            </TouchableOpacity>
          )}
        </View>
        {rightIcon}
      </View>
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
    alignSelf: 'center',
  },
  headerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textInputContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    // borderRadius: 50,
    backgroundColor: Colors.white,
    borderBottomWidth: 0.2,
    paddingVertical: wp(1),
    justifyContent: 'space-between',
  },
  textInput: {
    height: 50,
    width: '85%',
    color: 'black',
  },
  headerText: {
    fontSize: Size(2.2),
    color: Colors.black,
  },
  iconContainer: {
    alignSelf: 'center',
  },
  errorMessage: {
    color: 'red',
    margin: hp(2),
  },
});

export default CustomTextInput;
