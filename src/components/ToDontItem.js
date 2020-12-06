import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { height, width } = Dimensions.get("window");

export default function ToDontItem(props) {
  const [text, setText] = useState(props.text);
  const [editing, setEditing] = useState(props.editing);
  const [completed, setCompleted] = useState(props.completed);

  return (
    <View style={styles.container}>
      {/* Complete */}
      <TouchableOpacity
        onPress={() =>
          setCompleted((prevState) => ({
            completed: !prevState.completed,
          }))
        }
      >
        <View
          style={[
            styles.circle,
            completed ? styles.completeCircle : styles.incompleteCircle,
          ]}
        />
      </TouchableOpacity>

      {editing ? (
        <TextInput
          value={text}
          style={[
            styles.text,
            styles.input,
            completed ? styles.strikeText : styles.unstrikeText,
          ]}
          multiline={true}
          returnKeyType={"done"}
          onBlur={() => setEditing(false)}
          onChangeText={(value) => setText(value)}
        />
      ) : (
        <TouchableOpacity onPress={() => setEditing(true)}>
          <Text
            style={[
              styles.text,
              completed ? styles.strikeText : styles.unstrikeText,
            ]}
          >
            {text}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontWeight: "500",
    fontSize: 18,
    marginVertical: 20,
  },
  strikeText: {
    color: "#bbb",
    textDecorationLine: "line-through",
  },
  unstrikeText: {
    color: "#29323c",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20,
  },
  completeCircle: {
    borderColor: "#bbb",
  },
  incompleteCircle: {
    borderColor: "#DA4453",
  },
  input: {
    marginVertical: 15,
    width: width / 2,
    paddingBottom: 5,
  },
});
