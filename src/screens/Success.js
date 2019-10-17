import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";



export default class Success extends Component {


  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        3000
      )
    )
  }
  async componentDidMount() {
    
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.props.navigation.navigate('Dashboard');
    }
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2A2E43",
        color: "#ffffff"
      },
      button: {
        paddingVertical: 20,
        paddingHorizontal: 53,
        borderRadius: 12
      },
      inputWrapper: {
        paddingHorizontal: 17,
        paddingVertical: 17,
        backgroundColor: "#454F63",
        borderRadius: 12,
        borderColor: "#665EFF",
        borderWidth: 1,
        borderStyle: "solid"
      }
    });

    return (
      <View style={styles.container}>
        <Image
          style={{ marginTop: 168.46, marginBottom: 70.84 }}
          source={require("../assets/img/verified.png")}
        />
       

        <Text
          style={{
            fontSize: 24,
            lineHeight: 34,
            color: "#ffffff"
          }}
        >
          Your profile has been created successfully!
        </Text>
      </View>
    );
  }
}
