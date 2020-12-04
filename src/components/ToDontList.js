import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { height, width } = Dimensions.get("window");

class ToDontList extends Component {
  // const [isEditing, setIsEditing] = useState(false);
  // const [isCompleted, setIsCompleted] = useState(false);
  state = {
    isEditing: false,
    isCompleted: false,
  };

  toggleItem = () => {
    this.setState((prevState) => ({
      isCompleted: !prevState.isCompleted,
    }));
  };

  render() {
    const { isCompleted } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.toggleItem}>
          <View
            style={[
              styles.circle,
              isCompleted ? styles.completeCircle : styles.incompleteCircle,
            ]}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.text,
            isCompleted ? styles.strikeText : styles.unstrikeText,
          ]}
        >
          ToDon't List
        </Text>
      </View>
    );
  }
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
});

export default ToDontList;
