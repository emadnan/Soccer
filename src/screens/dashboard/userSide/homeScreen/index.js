import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import HomeHeader from '../../../../components/homeHeader';
import {Size, hp, wp} from '../../../../assets/dimensions';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors} from '../../../../assets/color';
import {useNavigation} from '@react-navigation/native';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import ToggleViews from './toggleViews';
import axios from 'axios';

export default function Home() {
  const navigation = useNavigation();

  const [liveData, setLiveData] = useState(null);
  const fetchLiveData = async () => {
    try {
      const response = await axios.get(
        'https://api.bring-the-boom.com/public/storage/livescores.json',
      );
      const data = response.data.data;
      setLiveData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // fetchLiveData();
    const interval = setInterval(() => {
      fetchLiveData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      <AnimatedLinearGradient
        customColors={Colors.primaryGradient}
        speed={6000}
      />
      <HomeHeader
        // title="Hi John Doe!"
        // onBellPress={() => navigation.navigate('Notifications')}
      />
      <View
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: 'white',
          overflow: 'hidden',
        }}>
        <ScrollView nestedScrollEnabled={true}>
          <Text style={styles.welcomeText}>Fixtures</Text>

          <ToggleViews liveData={liveData} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardImage: {
    alignSelf: 'center',
    width: wp(100),
    height: hp(45),
  },
  welcomeText: {
    fontSize: Size(2.4),
    color: Colors.black,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: wp(5),
  },
});
