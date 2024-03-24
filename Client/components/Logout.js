import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import axios from "axios";

const Logout = (props) => {
  const { setLogout } = props;
  handleLogout = () => {
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post(
        "http://192.168.4.61:5000/login/logout",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        setLogout();
        props.navigation.navigate("Login");
      })
      .catch((err) => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          if (err.response.status === 400) {
            // Handle 400 error
            Alert.alert("Error", err.response.data.msg);
          } else {
            // Handle any other error status
            Alert.alert("Error", "An error occurred. Please try again.");
          }
        } else if (err.request) {
          // The request was made but no response was received
          console.log(err.request);
          Alert.alert("Error", "No response from server. Please try again.");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", err.message);
          Alert.alert("Error", "An error occurred. Please try again.");
        }
      });
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          handleLogout();
        }}
      />
    </DrawerContentScrollView>
  );
};

export default Logout;
