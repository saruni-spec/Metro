import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import TextOutput from "../components/TextOutput";
import Background from "../components/Background";
import axios from "axios";
import TextInput from "../components/input";
import Button from "../components/Button";
import PasswordInput from "../components/PasswordInput";
import EmailInput from "../components/EmailInput";
import { Alert } from "react-native";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [update, setUpdate] = useState(false);
  const [reload, setReload] = useState(false);

  const showEditProfile = () => {
    setUpdate(!update);
  };

  const reloadProfile = () => {
    setReload(!reload);
  };

  useEffect(() => {
    axios
      .get("http://192.168.222.61:5000/profile/", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.data);

        setProfile(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);
  return (
    <Background>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ position: "absolute", top: 0, left: 180 }}
          onPress={showEditProfile}
        >
          <Text>Edit Profile</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 40 }}>
          <TextOutput>{profile.name}</TextOutput>
          <TextOutput>{profile.email}</TextOutput>
          <TextOutput>{profile.phone}</TextOutput>
        </View>
        {update && (
          <UpdateProfile setReload={reloadProfile} setUpdate={setUpdate} />
        )}
      </View>
    </Background>
  );
};

export default Profile;

const UpdateProfile = ({ setReload, setUpdate }) => {
  const [first_name, setFirstName] = useState("");
  const [other_name, setLastName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const Update = () => {
    axios.defaults.xsrfCookieName = "csrf_token";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios
      .post("http://192.168.222.61:5000/profile/update", {
        email,
        first_name,
        other_name,
        phone,
        password,
        confirmPassword,
      })
      .then((res) => {
        console.log(res.data);
        setUpdate(false);
      })
      .then(() => {
        Alert.alert(
          "Success",
          "Profile Updated",
          [
            {
              text: "OK",
              onPress: () => {
                setReload();
              },
            },
          ],
          { cancelable: false }
        );
      })

      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  return (
    <>
      <TouchableOpacity onPress={Update}>
        <Text>Update Profile</Text>
      </TouchableOpacity>
      <View>
        <TextInput
          placeholder="First Name"
          value={first_name}
          autoCapitalize="words"
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          placeholder="Last Name"
          value={other_name}
          autoCapitalize="words"
          onChangeText={(text) => setLastName(text)}
        />
      </View>
      <View>
        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={(text) => setPhoneNumber(text)}
          returnKeyType="next"
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
        />
        <EmailInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
      </View>
      <View>
        <PasswordInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <PasswordInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
    </>
  );
};
