import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import OTPTextView from '../../node_modules/react-native-otp-textinput';
// import OtpInputs from "../components/OtpInputs";

export default class Verify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otp: ""
    };

    this.onFocus = this.onFocus.bind(this);
    this.success = this.success.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  
  getOtp(otp) {
    console.log(otp);
    this.setState({ otp });
  }

  onFocus() {
    this.setState({
      border: "#665EFF"
    });
  }
  success() {

    let url = "https://46a58315.ngrok.io/otogenow/api/v1/otp"

    if(this.state.otp === ""){ 
      Alert.alert("Please enter OTP")
    }
    else{   

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        "userId": this.props.navigation.state.params.phonenumber, 
        "otpString": this.state.otp 
      })
    }) 
    .then(data => {
      // console.log(JSON.stringify(data))
      return data.json()
      
    })
    .then(res => {

      if (res.responseCode === "00"){
        this.props.navigation.navigate("Dashboard");
       
      } else{
        Alert.alert("OTP does'nt match")
        this.props.navigation.navigate("Verify");

      }

      return console.log(res)
    })
    .catch(err => (console.log(err))); 
    

  } 
  }
  goBack() {
    this.props.navigation.navigate("Signup");
  }

  
  async componentDidMount() {
    
   
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
      },
      roundedTextInput: {
        borderRadius: 10,
        borderWidth: 4,
      },

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
            Enter 5-digit pin sent to your device
          </Text>


          <OTPTextView
          containerStyle={styles.textInputContainer}
          handleTextChange={text => this.setState({ otp: text })}
          textInputStyle={styles.roundedTextInput}
          inputCount={5}
          keyboardType="numeric"
          />

          <Text
            style={{
              fontSize: 15,
              lineHeight: 34,
              marginBottom: 52,
              marginTop: 20,
              color: "#ffffff",
              textAlign: "center"
            }}
          >
            Didnt receive your pin? Resend again
          </Text>

          <TouchableOpacity
            onPress={this.success}
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
              VERIFY
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 5,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 20,
  },
  
});
