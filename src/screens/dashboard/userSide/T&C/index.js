import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Size, hp, wp} from '../../../../assets/dimensions';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors} from '../../../../assets/color';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../../../components/CustomButton';

export default function TermsAndConditions() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      <View
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: 'white',
          overflow: 'hidden',
          flex: 1,
        }}>
        <ScrollView nestedScrollEnabled={true}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: wp(5),
              paddingHorizontal: wp(5),
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                alignItems: 'center',
                padding: wp(1),
                borderRadius: wp(100),
                backgroundColor: Colors.extralightgray,
              }}>
              <Ionicons
                color={Colors.grey}
                name="chevron-back"
                size={Size(3)}
              />
            </TouchableOpacity>
            <Text style={styles.welcomeText}>Terms And Conditions</Text>
            <Ionicons color={Colors.white} name="pencil" size={Size(3)} />
          </View>
          <Text style={styles.content}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            posuere risus in nunc tincidunt rutrum. Morbi non felis vel urna
            pulvinar bibendum. Morbi eget tempus massa. Duis pretium sapien
            dolor, a eleifend mauris mollis eu. In dignissim, ipsum ac tincidunt
            euismod, elit dui tempor neque, et maximus magna elit id nisl. Nunc
            diam magna, mattis a lectus sit amet, volutpat suscipit ipsum.
            Curabitur quis luctus dui. Integer lobortis vitae velit ac
            fermentum. Etiam eu bibendum odio, vitae molestie nunc. Vestibulum
            placerat velit sed ipsum pharetra molestie. Proin tincidunt ligula
            in ante egestas, in cursus ex faucibus. Nunc aliquet tristique
            augue. Suspendisse iaculis eros eget purus faucibus porta. Proin
            odio purus, condimentum in ultrices vel, feugiat eu magna. Phasellus
            sodales egestas risus, malesuada maximus lacus volutpat id.
            Vestibulum nec risus sit amet orci condimentum auctor eget quis
            nulla. Suspendisse iaculis eros eget purus faucibus porta. Proin
            odio purus, condimentum in ultrices vel, feugiat eu magna. Phasellus
            sodales egestas risus, malesuada maximus lacus volutpat id.
            Vestibulum nec risus sit amet orci condimentum auctor eget quis
            nulla.
          </Text>
          <CustomButton
            buttonTextStyle={{fontSize: Size(1.8)}}
            gradient
            text={'I Agree to T&Cs'}
            size="medium"
          />
          <CustomButton
            buttonTextStyle={{
              fontSize: Size(1.8),
              color: Colors.grey,
            }}
            text={'Cancel'}
            size="medium"
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: Size(2.4),
    color: Colors.black,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  content: {
    marginHorizontal: wp(5),
    textAlign: 'justify',
    marginVertical: wp(2),
    fontSize: Size(1.8),
    color: Colors.black,
  },
});
