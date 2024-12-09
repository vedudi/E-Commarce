import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../themes/Colors';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import {Items} from '../database/Database';
import SectionHeader from '../components/SectionHeader';

const Home = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [accessory, setAccessory] = useState([]);
  useEffect(() => {
    getDataFromDB();
  }, []);
  const getDataFromDB = () => {
    let productsList = [];
    let accessoryList = [];
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].category === 'product') {
        productsList.push(Items[index]);
      } else {
        accessoryList.push(Items[index]);
      }
    }
    setProducts(productsList);
    setAccessory(accessoryList);
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <View style={styles.homeContainer}>
          <Text style={styles.title}>Hi-Fi Shop & Service</Text>
          <Text style={styles.text}>
            {' '}
            Audio shop on Rustaveli Ave 57.
            {'\n'}This shop offers both products and services
          </Text>
        </View>
        <View style={{padding: 16}}>
        <SectionHeader title={"Products "} count={"41"}/>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
            }}>
            {products.map(data => (
              <ProductCard key={data.id} data={data} />
            ))}
          </View>
        </View>
        <View style={{padding: 16}}>
         <SectionHeader title={"Accessories"} count={"80"}/>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
            }}>
            {accessory.map(data => (
              <ProductCard key={data.id} data={data} />
            ))}
          </View>
        </View>
        
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: '100%',
    height: '100%',
  },
  homeContainer: {
    marginBottom: 10,
    padding: 16,
  },
  title: {
    fontSize: 26,
    color: Colors.black,
    fontWeight: '500',
    letterSpacing: 2,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 1,
    lineHeight: 24,
  },
});
