import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Index from "./Index";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import BusRegistration from "./BusRegistration";

const Stack = createStackNavigator();

const Layout = () => {
  return (
    <Stack.Navigator initialRouteName="Index">
      <Stack.Screen name="Index" component={Index} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="BusRegistration" component={BusRegistration} />
    </Stack.Navigator>
  );
};

export default Layout;