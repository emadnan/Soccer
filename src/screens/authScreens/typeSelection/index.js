/* eslint-disable react-native/no-inline-styles */
/// import libraries
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  Platform,
  TouchableOpacity,
  Alert,
  Linking,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
//// import style component
import {styles} from './styles';
import { Colors } from '../../../assets/color';
import { Strings } from '../../../assets/Strings';
import { Images } from '../../../assets/images';
import { Size, wp } from '../../../assets/dimensions';
import Button from '../../../components/Button';
import Header from '../../../components/header';
//// global veiable
const flex = 1;
const flex01 = 0.1;
const flex02 = 0.02;
const flex055 = 0.055;
//// Declare function component
const TypeSelection = ({route}) => {
  /// get props from previous route
  const fdata = route?.params?.data;
  //// its use for navigation route
  const navigation = useNavigation();
  //// initlized state hook for data manage in this components
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);


  //// its hook call when data is update (it behave like as component did update)
  // useEffect(() => {
  //   setType(data);
  // }, [data]);
  ///// type selection
  const onSelection = (props) => {
    let params;
    if (props === 1) {
      params = 'octoboss';
      setType('octoboss');
    } else if (props === 2) {
      params = 'user';
      setType('user');
    }
    
    const cbSuccess = (param) => {
      setType(param);
    };
    const cbFailure = (err) => {
      Alert.alert(err || Strings.ServerError, '');
    };
  };
  
  

  function handlePress(urls) {
    const url = urls;
    // Linking.canOpenURL(url).then((supported) => {
    //   if (supported) {
    Linking.openURL(url);
    // } else {
    //   console.log(`Can't open url: ${url}`);
    // }
    // });
  }

 
  const ButtonRender = useCallback(
    () => (
      <View style={styles.buttonstyle}>
        <Button
          onPress={() => {
            if (type) {
                navigation.navigate('Login', {
                    type: type,
                  })
            } else {
              Alert.alert(Strings.SelectType, '');
            }
          }}
          backgroundColor={Colors.primaryLight}
          borderRadius={wp(3)}
          text={'Select'}
          width="100%"
          textColor={Colors.white}
          disabled={loading}
          textSize={Size(2)}
          textAlign="center"
        />
      </View>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [type],
  );
  return (
    <SafeAreaView
      style={styles.container}
      >
        <Header centered centeredStyle={{color:Colors.primaryLight}} disableBack={true} title='Select User Type' />
      
      <View style={styles.ChildContainer}>
        <View style={{flex: flex}}>
          <View style={{flex: flex01}} />
          <View style={styles.textjustify}>
            <Text style={{fontSize: Size(3)}}>
              {Strings.AccountTypeSelect}
            </Text>
          </View>
          <View style={{flex: flex02 * 3}} />
          <View
            style={[
              styles.tyleselection,
              {
                borderWidth: type === Strings.hire ? 0 : 1,
                backgroundColor:
                  type === Strings.hire ? Colors.primaryLight : Colors.white,
                elevation: type === Strings.hire ? 5 : 0,
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                onSelection(2);
              }}
              style={styles.selctioncon}>
              <View style={styles.Selectionchild}>
                
                <View style={{flex: flex01 * 7}}>
                  <View style={{flex: flex02 * 21.5}} />
                  <Text
                    style={{
                      fontSize: Size(2.2),
                      color:
                        type === Strings.hire ? Colors.white : Colors.darkBlack,
                    }}>
                    Sign In as User
                  </Text>
                  <View style={{flex: flex02 * 7.5}} />
                  <Text
                    style={{
                      fontSize: Size(1.4),
                      paddingHorizontal: wp(1),
                      color:
                        type === Strings.hire ? Colors.white : Colors.darkBlack,
                    }}>
                    {Strings.FindYourSP}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: flex02}} />
          <View
            style={[
              styles.tyleselection,
              {
                borderWidth: type === Strings.work ? 0 : 1,
                backgroundColor:
                  type === Strings.work ? Colors.primaryLight : Colors.white,
                elevation: type === Strings.work ? 5 : 0,
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                onSelection(1);
              }}
              style={styles.selctioncon}>
              <View style={styles.Selectionchild}>
                
                <View style={{flex: flex01 * 7}}>
                  <View style={{flex: flex02 * 21.5}} />
                  <Text
                    style={{
                      fontSize: Size(2.2),
                      color:
                        type === Strings.work ? Colors.white : Colors.darkBlack
                    }}>
                    Sign In as OCTOBOSS
                  </Text>
                  <View style={{flex: flex02 * 7.5}} />
                  <Text
                    style={{
                      fontSize: Size(1.4),
                      paddingHorizontal: wp(1),
                      color:
                        type === Strings.work ? Colors.white : Colors.darkBlack
                    }}>
                    {Strings.BrowseAndBid}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: flex055}} />
          <View style={{flex: flex02 + 0.01}} />
          {ButtonRender()}
          <View style={{flex: flex02 * 3}} />
          
        </View>
      </View>
    </SafeAreaView>
  );
};

export {TypeSelection};
