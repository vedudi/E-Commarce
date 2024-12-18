import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../themes/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = ({data, product, setProduct,getDataFromDB,getTotal}) => {
  const navigation = useNavigation();
  const removeItemFromCart = async id => {
    let itemsArray = await AsyncStorage.getItem('cartItems');
    itemsArray = JSON.parse(itemsArray);
    if (itemsArray) {
      let array = itemsArray.filter(item => item !== id);
      await AsyncStorage.setItem('cartItems', JSON.stringify(array));
      getDataFromDB();
    }
  };
  const updateQuantity = (id, type) => {
    let updateProducts = product.map(item => {
      if (item.id === id) {
        let newQuantity =
          type === 'upcrease' ? item.quantity + 1 : item.quantity - 1;
        item.quantity = newQuantity > 0 ? newQuantity : removeItemFromCart(id);
      }
      return item;
    });
    setProduct(updateProducts);
    getTotal(updateProducts)
  };
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductInfo', {productID: data.id})}
      style={{
        width: '100%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
      }}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={data.productImage} />
      </View>
      <View style={styles.productDetail}>
        <View>
          <Text> {data.productName} </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              opacity: 0.6,
              marginTop: 4,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                marginRight: 4,
                maxWidth: '85%',
              }}>
              {data.productPrice * data.quantity} ₺
            </Text>
            <Text
              style={{
                fontSize: 12,
              }}>
              {data.productPrice * data.quantity +
                (data.productPrice * data.quantity) / 20}{' '}
              ₺ (eski fiyat)
            </Text>
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
            }}>
            <TouchableOpacity
              onPress={() => updateQuantity(data.id, 'decrease')}
              style={styles.button}>
              <Entypo name="minus" />
            </TouchableOpacity>
            <Text> {data.quantity} </Text>
            <TouchableOpacity
              onPress={() => updateQuantity(data.id, 'upcrease')}
              style={styles.button}>
              <Entypo name="plus" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => removeItemFromCart(data.id)}
            style={styles.deleteButton}>
            <MaterialCommunityIcons name="delete-variant" size={16} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Cart;

const styles = StyleSheet.create({
  imageContainer: {
    width: '30%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    marginRight: 22,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  productDetail: {
    flex: 1,

    height: '100%',
    justifyContent: 'space-around',
  },
  buttonGroup: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.backgroundLight,
    padding: 4,
    borderRadius: 100,
    borderWidth: 0.4,
    opacity: 0.5,
  },
  deleteButton: {
    backgroundColor: Colors.backgroundMedium,
    color: Colors.backgroundLight,
    padding: 8,
    borderRadius: 100,
    opacity: 0.5,
    marginLeft: 130,
  },
});
