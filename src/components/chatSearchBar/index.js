import React,{useState} from 'react';
import { TextInput, View, StyleSheet,Text,TouchableOpacity, Platform} from 'react-native';
import { Size, hp, wp } from '../../assets/dimensions';
import { Colors } from '../../assets/color';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

const ChatSearchbar = ({ header, placeholder,rightIcon,value,onChangeText,isSecure }) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(isSecure);

  const toggleSecureTextEntry = () => {
    setIsSecureTextEntry(!isSecureTextEntry);
  };

  return (
    <View style={styles.container}>
      {header && (<View style={styles.headerContainer}>
        <Text style={styles.headerText}>{header}</Text>
      </View>)}
      <View style={styles.textInputContainer}>
      <TouchableOpacity
            style={styles.iconContainer}
            onPress={toggleSecureTextEntry}
          >
            <Ionicons
              name='search'
              size={24}
            />
          </TouchableOpacity>

        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#888"
          secureTextEntry={isSecureTextEntry}
        />
        <View style={{alignSelf:'center'}}>
        <Ionicons  name="add" size={Size(4)} />
     </View>
        
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(2),
    
    alignSelf:'center',
    flexDirection:'row',
    width:wp(92),
    justifyContent:'space-between'
  },
  headerContainer: {
    
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textInputContainer: {
    paddingHorizontal: 10,
    flexDirection:"row",
    borderRadius: 50,
    backgroundColor:Colors.white,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.11,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
    paddingVertical:wp(1),
    justifyContent:"space-between"
   
    
  },
  textInput: {
    height: 50,
    width:wp(70),
    textAlign:'center'
  },
  headerText:{
    fontSize:Size(2.2),
    color:Colors.black
  },
  iconContainer: {
    alignSelf:'center'
  },
});

export default ChatSearchbar;
