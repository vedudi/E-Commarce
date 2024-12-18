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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
      getTotal(productData);
    } else {
      setProduct([]);
      setTotal(0);
    }
  };
  const getTotal = productData => {
    let total = 0;
    for (let index = 0; index < productData.length; index++) {
      const productPrice =
        productData[index].productPrice * productData[index].quantity;
      total += productPrice;
    }
    setTotal(total);
  };
  const checkOut = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
    } catch (error) {
      return error;
    }
    navigation.navigate('Home');
  };
  return (
    <>
      {product.length > 0 ? (
        <View
          style={{
            backgroundColor: Colors.white,
            width: '100%',
            height: '100%',
            position: 'relative',
          }}>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Entypo name="chevron-left" size={20} />
            </TouchableOpacity>
            <Text style={styles.orderTitle}>Order Details</Text>
          </View>
          <ScrollView>
            <Text style={styles.myCart}> My Cart</Text>
            <View>
              {product.length > 0
                ? product.map(data => (
                    <Cart
                      key={data.id}
                      data={data}
                      product={product}
                      setProduct={setProduct}
                      getDataFromDB={getDataFromDB}
                      getTotal={getTotal}
                    />
                  ))
                : null}
            </View>
            <Text style={styles.locationText}>Delivery Location</Text>
            <TouchableOpacity>
              <View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 16,
                      marginVertical: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '80%',
                        alignItems: 'center',
                      }}>
                      <View style={styles.deliveryBox}>
                        <MaterialCommunityIcons
                          name="truck-delivery-outline"
                          size={20}
                          color={Colors.blue}
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 14,
                            color: Colors.black,
                            fontWeight: '500',
                          }}>
                          İstanbul-Kadıkoy
                        </Text>
                      </View>
                    </View>
                    <Entypo name="chevron-right" size={20} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <Text style={styles.locationText}>Payment Method</Text>
            <TouchableOpacity>
              <View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 16,
                      marginVertical: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '80%',
                        alignItems: 'center',
                      }}>
                      <View style={styles.deliveryBox}>
                        <FontAwesome
                          name="cc-visa"
                          size={20}
                          color={Colors.blue}
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 14,
                            color: Colors.black,
                            fontWeight: '500',
                          }}>
                          VISA Classic
                        </Text>
                        <Text style={{opacity: 0.5}}>****-2147</Text>
                      </View>
                    </View>
                    <Entypo name="chevron-right" size={20} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <Text style={styles.locationText}>Order Info</Text>
            <View style={{paddingHorizontal: 16, marginVertical: 10, gap: 10}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{opacity: 0.5, fontSize: 12, fontWeight: '400'}}>
                  Subtotal
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 12,
                    fontWeight: '400',
                  }}>
                  {' '}
                  {total} ₺
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{opacity: 0.5, fontSize: 12, fontWeight: '400'}}>
                  Shipping Cost
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 12,
                    fontWeight: '400',
                  }}>
                  {' '}
                  + {total / 20} ₺
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{opacity: 0.5, fontSize: 12, fontWeight: '400'}}>
                  Total
                </Text>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 17,
                    fontWeight: '600',
                  }}>
                  {' '}
                  {total + total / 20} ₺
                </Text>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              height: '8%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => checkOut()}
              style={{
                backgroundColor: Colors.blue,
                height: '86%',
                width: '90%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 16,
                  fontWeight: '600',
                  letterSpacing: 2,
                }}>
                CheckOut {'>>'} {total + total / 20} ₺
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            backgroundColor: Colors.white,
          }}>
          <Text>Sepette Ürün Yoktur</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{marginTop: 20}}>
            <Text style={{
              textDecorationLine:"underline",color:Colors.blue
            }}>Ürün Eklemek İçin Anasayfaya Git</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
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
