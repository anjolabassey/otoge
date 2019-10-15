// import React, { Component } from "react";

// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   TouchableHighlight,
//   TouchableWithoutFeedback,
//   Modal,
//   WebView
// } from "react-native";

// export default class Verify extends Component {
//   constructor() {
//     this.onPressButton = this.onPressButton.bind(this);
//   }
//   _onPressButton() {
//     alert("You tapped the button!");
//   }
//   render() {
//     const styles = StyleSheet.create({
//       container: {
//         flex: 1,
//         // justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#2A2E43",
//         color: "#ffffff"
//       },
//       button: {
//         paddingVertical: 20,
//         paddingHorizontal: 53,
//         borderRadius: 12
//       },
//       inputWrapper: {
//         paddingHorizontal: 17,
//           paddingVertical: 17,
//         backgroundColor: "#454F63",
//         borderRadius: 12,
//         borderColor: "#665EFF",
//         borderWidth: 1,
//         borderStyle: "solid"
//       }
//     });

//     return (
//       <View style={styles.container}>
//         <Image
//           style={{ marginTop: 29.23, marginBottom: 57.26 }}
//           source={require("../assets/img/back.png")}
//         />
//         <Text
//           style={{
//             fontSize: 26,
//             lineHeight: 34,
//             color: "#ffffff"
//           }}
//         >
//           Enter 4-digit pin sent to your device
//         </Text>

//         <View></View>

//         <Text
//           style={{
//             fontSize: 15,
//             lineHeight: 20,
//             color: "#ffffff"
//           }}
//         >
//           Didnt receive your pin? Resend again
//         </Text>

//         <TouchableOpacity
//           style={[styles.button, { backgroundColor: "#665EFF" }]}
//         >
//           <Text
//             style={{
//               fontSize: 16,
//               lineHeight: 16,
//               textAlign: "center",
//               fontWeight: "bold",
//               color: "#ffffff"
//             }}
//           >
//             VERIFY
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }
