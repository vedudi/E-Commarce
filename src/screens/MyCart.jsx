import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Items} from '../database/Database';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../themes/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Cart from '../components/Cart';

const MyCart = () => {
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();
  useEffect(() => {
    getDataFromDB();
  }, [navigation]);
  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem('cartItems');
    items = JSON.parse(items);
    console.log(items);

    let productData = [];
    if (items) {
      Items.forEach(data => {
        if (items.includes(data.id)) {
          data.quantity = 1;
          productData.push(data);
        }
      });
      setProduct(productData);
    } else {
      setProduct([]);
      setTotal(0);
    }
  };

  return (
    <View
      style={{
        backgroundColor: Colors.white,
        width: '100%',
        height: '100%',
        position: 'relative',
      }}>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Entypo name="chevron-left" size={20} />
          </TouchableOpacity>
          <Text style={styles.orderTitle}>Order Details</Text>
        </View>
        <View>
          {product.length > 0
            ? product.map(data => (
                <Cart
                  key={data.id}
                  data={data}
                  product={product}
                  setProduct={setProduct}
                  getDataFromDB={getDataFromDB}
                />
              ))
            : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default MyCart;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    width: '62%',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: Colors.backgroundLight,
    padding: 12,
    borderRadius: 12,
    marginLeft: 15,
  },
  orderTitle: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '400',
  },
  myCart: {
    fontSize: 20,
    color: Colors.black,
    paddingTop: 20,
    paddingLeft: 16,
    marginBottom: 10,
    fontWeight: '500',
  },
  locationText: {
    fontSize: 16,
    color: Colors.black,
    paddingHorizontal: 16,
    marginVertical: 10,
    marginBottom: 10,
    letterSpacing: 1,
    fontWeight: '500',
  },
  deliveryBox: {
    backgroundColor: Colors.backgroundLight,
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
  },
  creditCard: {
    backgroundColor: Colors.backgroundLight,
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
