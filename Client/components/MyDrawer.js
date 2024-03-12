import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Drawer, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const MyDrawer = () => {
  const navigation = useNavigation();
  const [active, setActive] = React.useState("");

  const Profile = () => {
    navigation.navigate("Profile");
  };
  const History = () => {
    navigation.navigate("History");
  };
  const Summary = () => {
    navigation.navigate("Summary");
  };
  const Logout = () => {
    navigation.navigate("Logout");
  };

  const [showDrawer, setShowDrawer] = React.useState(false);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <View style={styles.container}>
      <Button icon="menu" onPress={toggleDrawer} style={styles.Button}></Button>
      {showDrawer && (
        <Drawer.Section style={styles.Drawer}>
          <Drawer.Item
            label="Profile"
            active={active === "Profile"}
            onPress={() => setActive("Profile")}
          />
          <Drawer.Item
            label="History"
            active={active === "History"}
            onPress={() => setActive("History")}
          />
          <Drawer.Item
            label="Summary"
            active={active === "Summary"}
            onPress={() => setActive("Summary")}
          />
          <Drawer.Item
            label="Logout"
            active={active === "Logout"}
            onPress={() => setActive("Logout")}
          />
        </Drawer.Section>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  Drawer: {
    backgroundColor: "white",
    width: 200,
    height: 200,
  },
  Button: {
    position: "absolute",
    top: 10,
    right: 120,
  },
});

export default MyDrawer;
