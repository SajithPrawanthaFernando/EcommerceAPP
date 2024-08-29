import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const HomeScreen = ({ navigation, cart, removeFromCart }) => {
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    fetch(
      "https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/products.json"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setFetchedData(data.data);
        } else {
          setFetchedData([]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.header}>Products</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Cart", { cart, removeFromCart })}
        >
          <Icon name="cart-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      {fetchedData.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {fetchedData.map((item, index) => {
            if (index % 2 === 0) {
              return (
                <View key={index} style={styles.row}>
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() =>
                      navigation.navigate("Details", { product: item })
                    }
                  >
                    <Image
                      source={{ uri: item.mainImage }}
                      style={styles.cardImage}
                    />
                    <Text style={styles.cardTitle} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.cardPrice}>£{item.price.amount}</Text>
                  </TouchableOpacity>

                  {fetchedData[index + 1] && (
                    <TouchableOpacity
                      style={styles.card}
                      onPress={() =>
                        navigation.navigate("Details", {
                          product: fetchedData[index + 1],
                        })
                      }
                    >
                      <Image
                        source={{ uri: fetchedData[index + 1].mainImage }}
                        style={styles.cardImage}
                      />
                      <Text style={styles.cardTitle} numberOfLines={1}>
                        {fetchedData[index + 1].name}
                      </Text>
                      <Text style={styles.cardPrice}>
                        £{fetchedData[index + 1].price.amount}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            }
            return null;
          })}
        </ScrollView>
      ) : (
        <Text style={styles.noDataText}>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    width: "48%",
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 150,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 10,
    paddingLeft: 10,
    flexShrink: 1,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingBottom: 6,
    flexShrink: 1,
  },
  noDataText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 50,
  },
});

export default HomeScreen;
