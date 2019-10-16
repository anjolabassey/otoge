import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";

export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: ""
      // user: this.props.user
    };
    this.recordWord = this.recordWord.bind(this);
    this.setupContacts = this.setupContacts.bind(this);
  }
  recordWord() {
    this.props.navigation.navigate("Record");
  }
  setupContacts() {
    console.log("setting up contacts");
    this.props.navigation.navigate("ContactSelect");
  }

  goBack() {
    console.log("go back");
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#2A2E43",
        color: "#ffffff"
      },
      nav: {
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        paddingVertical: 30,
        paddingHorizontal: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
      },
      button: {
        paddingVertical: 20,
        paddingHorizontal: 53,
        borderRadius: 12,
        marginBottom: 28,
        backgroundColor: "#665EFF",
        width: "80%"
      }
    });

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.goBack}>
          <Image
            style={{ marginTop: 29.23, marginLeft: 43 }}
            source={require("../assets/img/back.png")}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 26,
            lineHeight: 34,
            marginBottom: 20,
            marginTop: 56,
            color: "#ffffff",
            textAlign: "center"
          }}
        >
          Add emergency contacts
        </Text>

        <Text
          style={{
            fontSize: 18,
            lineHeight: 28,
            marginBottom: 165,
            color: "#ffffff",
            textAlign: "center"
          }}
        >
          O to ge will send SOS messages to 3 emergency contacts, infroming them
          of your location, and encounter with SARS.
        </Text>

        <View style={{ alignItems: "center" }}>
          {/* <TouchableOpacity
            onPress={this.recordWord}
            style={[styles.button, { marginTop: 89 }]}
          >
            <Text
              style={{
                fontSize: 18,
                lineHeight: 28,
                textAlign: "center",
                fontWeight: "bold",
                color: "#ffffff"
              }}
            >
              Record your safe word
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={this.setupContacts} style={styles.button}>
            <Text
              style={{
                fontSize: 18,
                lineHeight: 28,
                textAlign: "center",
                fontWeight: "bold",
                color: "#ffffff"
              }}
            >
              Add emergency contacts
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
