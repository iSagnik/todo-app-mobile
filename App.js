import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);

  const handleAddTask = () => {
    console.log(task)
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask('');
  };

  const completeTask = (index) => {
      let itemsCopy = [...taskItems]
      setDoneItems([...doneItems, taskItems[index]])
      itemsCopy.splice(index, 1)
      setTaskItems(itemsCopy)

  }

  const deleteTask = (index) => {
    let itemsCopy = [...doneItems]
    itemsCopy.splice(index, 1)
    setDoneItems(itemsCopy)
  }
  
  return (
    <View style={styles.container}>
      {/* Today's Tasks */}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>My Tasks</Text>
        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
                return (
                    <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                        <Task text={item}></Task>
                    </TouchableOpacity>
                );
            })
          }
        </View>
      </View>
      <View style = {styles.doneSection}>
          {
              doneItems.length > 0 &&
              <Text style={styles.sectionTitle}>Done</Text>
              
            
          }
          <View style= {styles.items}>
            {
                doneItems.length > 0 &&
                doneItems.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => deleteTask(index)}>
                            <Task text={item}></Task>
                            </TouchableOpacity>
                        );
                    })
            }
          </View>
      </View>
      {/* // Write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Add a Task"}
          value = {task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  doneSection: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "c0c0c0",
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "c0c0c0",
    borderWidth: 1,
  },
});
