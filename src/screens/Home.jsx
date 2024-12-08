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
      <ScrollView>
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                }}>
                Products
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: Colors.black,
                  opacity: 0.5,
                  marginLeft: 10,
                }}>
                41
              </Text>
            </View>
            <TouchableOpacity>
              <Text
                style={{fontSize: 14, color: Colors.blue, fontWeight: '400'}}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
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
