import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";

export default class DashboardContact extends Component {
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
    this.setState({
      border: "#665EFF"
    });
  }
    setupContacts() {
      

        console.log("setting up contacts");
        
        let phonenumber = this.props.navigation.state.params.phonenumber;
        let name = this.props.navigation.state.params.name;

        this.props.navigation.navigate("ContactSelect", {
          phonenumber: phonenumber,
          name: name
        });
  }

  goBack() {
    console.log("go back");
    this.props.navigation.navigate("Signup");
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
        backgroundColor: "#89AAE6",
        width: "80%"
      }
    });

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.goBack}>
          <View style={styles.nav}>
            <TouchableOpacity>
              <Image source={require("../assets/img/settings.png")} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("../assets/img/swipe1.png")} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("../assets/img/stopwatch.png")} />
            </TouchableOpacity>
          </View>
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
          Hello, {this.props.navigation.state.params.name}
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
          To get started with O to ge, please add your emergency contacts
        </Text>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={this.setupContacts}
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
              Add emergency contacts
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
