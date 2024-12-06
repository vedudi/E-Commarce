import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import React from 'react';
import { Colors } from '../themes/Colors';

const Home = () => {
  return (
    <View>
      <ScrollView>
        <View>
          <TouchableOpacity>
            <Entypo name='shopping-bag' style={{fontsize:88, color:Colors.black}}/>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
