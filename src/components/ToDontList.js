import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { height, width } = Dimensions.get("window");

export default function ToDontList(props) {
  const [todoItem, setTodoItem] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const startEditing = () => {
    const { todoItem } = props;
    console.log(todoItem);
    setTodoItem(todoItem);
    setIsEditing(true);
  };

  return (
    <View style={styles.container}>
      {/* Complete */}
      <TouchableOpacity
        onPress={() =>
          setIsCompleted((previousCompleted) => ({
            isCompleted: !previousCompleted.isCompleted,
          }))
        }
      >
        <View
          style={[
            styles.circle,
            isCompleted ? styles.completeCircle : styles.incompleteCircle,
          ]}
        />
      </TouchableOpacity>

      {isEditing ? (
        <TextInput
          value={todoItem}
          style={[
            styles.text,
            styles.input,
            isCompleted ? styles.strikeText : styles.unstrikeText,
          ]}
          multiline={true}
          returnKeyType={"done"}
          onBlur={() => setIsEditing(false)}
          onChangeText={(value) => setTodoItem(value)}
        />
      ) : (
        <TouchableOpacity onPress={startEditing}>
          <Text
            style={[
              styles.text,
              isCompleted ? styles.strikeText : styles.unstrikeText,
            ]}
          >
            {todoItem}
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
