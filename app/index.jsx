import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../components/HomeScreen";
import DetailsScreen from "../components/DetailsScreen";
import CartScreen from "../components/CartScreen";

const Stack = createStackNavigator();

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" options={{ headerShown: false }}>
        {(props) => (
          <HomeScreen {...props} cart={cart} removeFromCart={removeFromCart} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Details" options={{ headerShown: false }}>
        {(props) => <DetailsScreen {...props} addToCart={addToCart} />}
      </Stack.Screen>
      <Stack.Screen name="Cart" options={{ headerShown: false }}>
        {(props) => (
          <CartScreen {...props} cart={cart} removeFromCart={removeFromCart} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default App;
