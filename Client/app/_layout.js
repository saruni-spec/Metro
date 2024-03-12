import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Index from "./Index";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import CreateTrip from "./CreateTrip";
import Profile from "./Profile";
import History from "./History";
import UserTrips from "./UserTrips";
import MyBooking from "./MyBooking";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Logout from "../components/Logout";
import { RefreshControl, SafeAreaView, ScrollView } from "react-native";

const Drawer = createDrawerNavigator();

const Layout = ({ isLoggedIn, role, setRole, setIsLoggedIn }) => {
  useEffect(() => {
    axios
      .get("http://192.168.222.61:5000/login/role", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.role, "layout");

        setRole(res.data.role);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleLogout = () => {
    // Call your logout function here
    // After logging out, change the logout state to trigger the useEffect hook
    setRole("");
    setIsLoggedIn(!isLoggedIn);
  };

  console.log(role, "role layout");

  return (
    <Drawer.Navigator
      key={role}
      initialRouteName={
        isLoggedIn ? (role === "driver" ? "CreateTrips" : "Home") : "Index"
      }
      drawerContent={(props) =>
        role === "passenger" || role === "driver" ? (
          <Logout {...props} setLogout={handleLogout} />
        ) : null
      }
    >
      <Drawer.Screen
        name="Index"
        component={Index}
        options={{
          headerShown: false,
          drawerItemStyle: role === "" ? undefined : { display: "none" },
        }}
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          drawerItemStyle: role === "" ? undefined : { display: "none" },
        }}
      />
      <Drawer.Screen
        name="Register"
        component={Register}
        options={{
          drawerItemStyle: role === "" ? undefined : { display: "none" },
        }}
      />
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerItemStyle:
            role === "passenger" ? undefined : { display: "none" },
        }}
      />
      <Drawer.Screen
        name="MyBooking"
        component={MyBooking}
        options={{
          drawerItemStyle:
            role === "passenger" ? undefined : { display: "none" },
        }}
      />
      <Drawer.Screen
        name="UserTrips"
        component={UserTrips}
        options={{
          drawerItemStyle:
            role === "passenger" ? undefined : { display: "none" },
        }}
      />
      <Drawer.Screen
        name="CreateTrip"
        component={CreateTrip}
        options={{
          drawerItemStyle: role === "driver" ? undefined : { display: "none" },
        }}
      />
      <Drawer.Screen
        name="History"
        component={History}
        options={{
          drawerItemStyle: role === "driver" ? undefined : { display: "none" },
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerItemStyle:
            role === "passenger" || role === "driver"
              ? undefined
              : { display: "none" },
        }}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  const [role, setRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Layout
          role={role}
          isLoggedIn={isLoggedIn}
          setRole={setRole}
          setIsLoggedIn={setIsLoggedIn}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default App;
