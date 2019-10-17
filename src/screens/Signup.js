import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email:"",
      Fname: "",
      Lname:"",
      phonenumber: "",
      password: "",
      border: "transparent"
    };
      this.onFocus = this.onFocus.bind(this);
      this.validateSignup = this.validateSignup.bind(this);
      this.goBack = this.goBack.bind(this);
      
  }
  onFocus() {
    this.setState({
      border: "#665EFF"
    });
  }
  validateSignup() {

    let url = 'https://46a58315.ngrok.io/otogenow/api/v1/signup'
    let phonenumber = this.state.phonenumber

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email: Date.now() + "an@gmail.com",
        phone: this.state.phonenumber,
        firstName: this.state.Fname,
        lastName: this.state.Lname,
        pin: this.state.password
      })
    })
      .then(data => {
        // console.log(JSON.stringify(data))
        return data.json();
      })
      .then(res => {
        return console.log(res);
      })
      .catch(err => console.log(err));

    this.props.navigation.navigate("Verify", {phonenumber});

  }
  goBack() {
    this.props.navigation.navigate("Home");
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#2A2E43",
        color: "#ffffff"
      },
      button: {
        paddingVertical: 20,
        paddingHorizontal: 53,
        borderRadius: 12,
        marginTop: 63
      },
      input: {
        paddingHorizontal: 10,
        paddingVertical: 1,
        marginBottom: 24,
        backgroundColor: "#454F63",
        color: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: this.state.border,
        borderStyle: "solid",
        width: "80%"
      },
      inputWrapper: {
        paddingHorizontal: 17,
        paddingVertical: 17,
        marginBottom: 24,
        backgroundColor: "#454F63",
        color: "#ffffff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: this.state.border,
        borderStyle: "solid",
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

        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 26,
              lineHeight: 34,
              marginBottom: 52,
              marginTop: 57.26,
              color: "#ffffff",
              textAlign: "center"
            }}
          >
            Sign up with your phone number
          </Text>

          <View style={styles.inputWrapper}>
            <TextInput
              style={{ color: "#959DAD" }}
              onFocus={() => this.onFocus()}
              placeholder="First Name"
              onChangeText={Fname => this.setState({ Fname })}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={{ color: "#ffffff" }}
              onFocus={() => this.onFocus()}
              placeholder="Last Name"
              onChangeText={Lname => this.setState({ Lname })}
            />
          </View>


          <View style={styles.input}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Text style={{ color: "#ffffff" }}>+234</Text>
              <Image
                style={{ marginTop: 10, marginLeft: 5 }}
                source={require("../assets/img/chevron.png")}
              />
            </View>

            <TextInput
              style={{ color: "#ffffff" }}
              onFocus={() => this.onFocus()}
              onChangeText={phonenumber => this.setState({ phonenumber })}
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={{ color: "#ffffff" }}
              onFocus={() => this.onFocus()}
              placeholder="Password"
              onChangeText={password => this.setState({ password })}
            />
          </View>

          <TouchableOpacity
            onPress={this.validateSignup}
            style={[styles.button, { backgroundColor: "#665EFF" }]}
          >
            <Text
              style={{
                fontSize: 16,
                lineHeight: 16,
                textAlign: "center",
                fontWeight: "bold",
                color: "#ffffff"
              }}
            >
              CONTINUE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
