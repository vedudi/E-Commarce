import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../themes/Colors';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity>
        <Entypo name="shopping-bag" style={styles.headerIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
        <MaterialCommunityIcons name="cart" style={styles.headerIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerIcon: {
    fontSize: 18,
    color: Colors.backgroundMedium,
    backgroundColor: Colors.backgroundLight,
    padding: 12,
    borderRadius: 30,
    borderColor: Colors.backgroundLight,
    borderWidth: 1,
  },
});
