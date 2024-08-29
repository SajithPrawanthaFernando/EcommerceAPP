import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

const colorMap = {
  blue: "#0000FF",
  red: "#FF0000",
  green: "#00FF00",
  yellow: "#FFFF00",
  black: "#000000",
  white: "#FFFFFF",
};

const DetailsScreen = ({ route, addToCart, navigation }) => {
  const { product } = route.params;

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert("Success", "Added to cart successfully");
    navigation.navigate("Home");
  };

  const dotColor = colorMap[product.colour.toLowerCase()] || "#000000";

  const isInStock = product.stockStatus.toLowerCase() === "in stock";

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.mainImage }} style={styles.image} />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>£{product.price.amount}</Text>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.detailsContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Brand:</Text>
            <Text style={styles.infoText}>{product.brandName || "N/A"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Color:</Text>
            <View style={styles.infoTextWithIcon}>
              <View
                style={[styles.colorIndicator, { backgroundColor: dotColor }]}
              />
              <Text style={styles.infoText}>{product.colour}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sizes:</Text>
            <View style={styles.sizeContainer}>
              {isInStock ? (
                product.sizes.length > 0 ? (
                  product.sizes.map((size, index) => (
                    <TouchableOpacity key={index} style={styles.sizeBox}>
                      <Text style={styles.sizeText}>{size}</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={styles.infoText}>No sizes available</Text>
                )
              ) : (
                <Text style={styles.infoText}>No sizes available</Text>
              )}
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Stock Status:</Text>
            <Text
              style={[
                styles.infoText,
                isInStock ? styles.inStock : styles.outOfStock,
              ]}
            >
              {product.stockStatus}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  imageContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
    backgroundColor: "#fff",
  },
  infoContainer: {
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "#B12704",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 20,
    marginTop: 10,
    marginBottom: 5,
    color: "#333",
  },
  description: {
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 10,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    flex: 2,
  },
  infoTextWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    flex: 2,
  },
  colorIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  sizeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sizeBox: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  sizeText: {
    fontSize: 14,
    color: "#333",
  },
  inStock: {
    color: "green",
    fontWeight: "bold",
  },
  outOfStock: {
    color: "red",
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "#FF9900",
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  addToCartButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DetailsScreen;
