import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Items} from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../themes/Colors';

const ProductInfo = () => {
  const scrollX = new Animated.Value(10);
  const position =Animated.divide(scrollX,width)
  const width = Dimensions.get('window').width;
  const navigation = useNavigation();
  const [product, setProduct] = useState([]);
  const route = useRoute();
  const {productID} = route.params;
  useEffect(() => {
    getDataFromDB();
  }, []);
  const getDataFromDB = () => {
    const product = Items.find(item => item.id === productID);
    if (product) {
      setProduct(product);
      return;
    }
  };

  const renderProduct = item => {
    return (
      <View style={{width: width, height: 240}}>
        <Image
          style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          source={item}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            marginTop: 10,
          }}>
          <View
            style={{
              paddingTop: 16,
              paddingLeft: 16,
              width: '100%',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack('Home')}>
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: Colors.backgroundDark,
                  backgroundColor: Colors.white,
                  padding: 12,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.7}
            snapToInterval={width}
            data={product.productImageList}
            renderItem={({item}) => renderProduct(item)}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
              marginTop: 32,
            }}>
            {product.productImageList
              ? product.productImageList.map((data, index) => {
                let opacity=position.interpolate({
                    inputRange:[index-1,index,index+1],
                    outputRange:[0.2,1,0.2],
                    extrapolate:"clamp"
                })
                  return (
                    <Animated.View
                      key={index}
                      style={{
                        width: '16%',
                        height: 2.4,
                        backgroundColor: Colors.black,
                        marginHorizontal: 4,
                        opacity
                      }}></Animated.View>
                  );
                })
              : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
});
