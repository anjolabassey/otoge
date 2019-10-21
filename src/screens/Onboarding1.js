import React, { useState, useEffect, Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  StyleSheet,
  AsyncStorage
} from "react-native";
import * as Font from "expo-font";

/* import twitter */
import twitter, {
  TWLoginButton,
  decodeHTMLEntities,
  getRelativeTime
} from "react-native-simple-twitter";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2A2E43",
    color: "#ffffff"
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 35,
    borderRadius: 12,
    width: "90%"
  }
});

function Onboarding1(props) {
  const [token, setToken] = useState({ token: null, tokenSecret: null });

  var oauthtoken;
  var oauthtokensecret;

  const onGetAccessToken = ({ oauth_token, oauth_token_secret }) => {

    oauthtoken = oauth_token;
    oauthtokensecret = oauth_token_secret;

    setToken({ token: oauth_token, tokenSecret: oauth_token_secret });
    
  };

  const onSuccess = async user => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify({ ...user, ...token }));
    } catch (err) {
      console.log(err);
    }
    

    Alert.alert("", "You have been logged in successfully", [
      {
        text: "Go to your Dashboard",
        onPress: () => {

          let username = user.name;
          let id = user.id;
          

          let url = "http://68.169.59.171:9800/otogenow/api/v1/signup";

          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              firstName: user.name,
              lastName: user.screen_name,
              pin: "082893929",
              authtoken: oauthtoken,
              twittersecret: oauthtokensecret,
              twitteruserid: user.id
            })
          })
            .then(data => {
              // console.log(JSON.stringify(data))
              return data.json();
            })
            .then(res => {
              if (res.responseCode === "00") {
                
                props.navigation.navigate("Dashboard", { username, id });
              }
              //  else {
              //   Alert.alert("user exists");
              // }

              return console.log(res);
            })
            .catch(err => console.log(err));

          props.navigation.navigate("Dashboard", { username, id });
        }
      }
    ]);
  };

  const onPress = e => {
    console.log("button pressed");
  };

  const onClose = e => {
    console.log("press close button");
  };

  const onError = err => {
    console.log(err);
  };

  useEffect(() => {
  
    
  
    // console.log(
    //   decodeHTMLEntities(
    //     "&amp; &apos; &#x27; &#x2F; &#39; &#47; &lt; &gt; &nbsp; &quot;"
    //   )
    // );
    // console.log(getRelativeTime(new Date(new Date().getTime() - 32390)));
    // console.log(getRelativeTime("Thu Apr 06 15:28:43 +0000 2017"));

    /* check AsyncStorage */
    AsyncStorage.getItem("user").then(userData => {
      if (userData !== null) {
        const user = JSON.parse(userData);

        twitter.setAccessToken(user.token, user.tokenSecret);

        const options = {
          include_entities: false,
          skip_status: true,
          include_email: true
        };

        twitter
          .get("account/verify_credentials.json", options)
          .then(response => {
            // console.log(response);
          })
          .catch(err => console.log(err));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Login</Text>
      </View>

      <Image
        style={{ marginTop: 55, marginBottom: 44 }}
        source={require("../assets/img/swipe1.png")}
      />

      <Text
        style={{
          fontSize: 22,
          lineHeight: 34,
          color: "#ffffff",
          textAlign: "center"
        }}
      >
        <Text>
          Automatic tweets via{"\n"}
          voice activation
        </Text>
      </Text>

      <Image
        style={{ marginTop: 93, marginBottom: 92 }}
        source={require("../assets/img/twitter.png")}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#665EFF" }]}
        onPress={() => props.navigation.navigate("Signup")}
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
          SIGN UP WITH PHONE NUMBER
        </Text>
      </TouchableOpacity>

      <TWLoginButton
        style={[styles.button, { backgroundColor: "#D2F1FC", marginTop: 26 }]}
        type="TouchableOpacity"
        onPress={onPress}
        onGetAccessToken={onGetAccessToken}
        onSuccess={onSuccess}
        onClose={onClose}
        onError={onError}
        closeText="close"
        renderHeader={headerProps => (
          <View>
            <TouchableOpacity
              style={{ justifyCntent: "center", alignItems: "center" }}
              onPress={headerProps.onClose}
            >
              <Text style={{ paddingVertical: 20 }}>close modal</Text>
            </TouchableOpacity>
          </View>
        )}
      >
        <Text
          style={{
            fontSize: 16,
            lineHeight: 16,
            textAlign: "center",
            fontWeight: "bold",
            color: "#07074F"
          }}
        >
          CONNECT WITH TWITTER
        </Text>
      </TWLoginButton>

      <Text
        style={{
          fontSize: 18,
          lineHeight: 26,
          color: "#ffffff",
          marginTop: 20
        }}
      >
        Already have an account?{" "}
        <Text style={{ fontWeight: "bold" }}>Log in</Text>
      </Text>
    </View>
  );
}

// Onboarding1.navigationOptions = {
//   header: null
// };

export default Onboarding1;
