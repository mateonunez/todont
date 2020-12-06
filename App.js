import { AppLoading } from "expo";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import "react-native-get-random-values";
import { v1 as uuidv1 } from "uuid";
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

import ToDontItem from "./src/components/ToDontItem";

const { height, width } = Dimensions.get("window");

export default function App() {
  const [dataIsReady, setDataIsReady] = useState(false);
  const [newToDont, setNewToDont] = useState("");
  const [toDonts, setToDonts] = useState([]);

  const addToDont = (toDontItem) => {
    setToDonts((prevState) => {
      return [
        {
          id: uuidv1(),
          text: toDontItem,
          editing: false,
          completed: false,
          createdAt: Date.now(),
        },
        ...prevState,
      ];
    });

    setNewToDont("");
  };

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
          placeholder="What do you want to forget?"
          value={newToDont}
          onChangeText={(text) => setNewToDont(text)}
          onSubmitEditing={() => addToDont(newToDont)}
          placeholderTextColor={"#999"}
          returnKeyType={"done"}
          autoCorrect={false}
        />

        <ScrollView contentContainerStyle={styles.listContainer}>
          {toDonts.length > 0 ? (
            toDonts.map((toDont) => <ToDontItem key={toDont.id} {...toDont} />)
          ) : (
            <Text style={styles.message}>Ops... nothing to forget</Text>
          )}
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
  message: {
    fontSize: 28,
    marginTop: 40,
    alignSelf: "center",
    fontWeight: "500",
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
