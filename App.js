import { AppLoading } from "expo";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  Dimensions,
  Platform,
} from "react-native";

import ToDontList from "./src/components/ToDontList";

const { heigh, width } = Dimensions.get("window");

export default function App() {
  const [dataIsReady, setDataIsReady] = useState(false);
  const [newToDontItem, setNewToDontItem] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setDataIsReady(true);
    }, 1000);
  });

  return !dataIsReady ? (
    <AppLoading />
  ) : (
    <LinearGradient
      style={styles.container}
      colors={["#0f2027", "#203a43", "#2c5364"]}
    >
      <StatusBar barStyle="light-content" />

      <Text style={styles.appTitle}>To-Don't</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="What do you what to forget?"
          value={newToDontItem}
          onChangeText={(text) => setNewToDontItem(text)}
          placeholderTextColor={"#999"}
          returnKeyType={"done"}
          autoCorrect={false}
        />

        <ScrollView contentContainerStyle={styles.listContainer}>
          <ToDontList toDontItem={"New ToDont"} />
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f23657",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50,50,50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
  appTitle: {
    color: "#fff",
    fontSize: 36,
    marginTop: 70,
    marginBottom: 30,
    fontWeight: "300",
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 24,
  },
  listContainer: {
    alignItems: "center",
  },
});
