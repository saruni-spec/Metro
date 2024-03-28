import { useState, useEffect } from "react";
import Background from "../components/Background";
import { FlatList, View } from "react-native";
import axios from "axios";
import { Divider, Text } from "react-native-paper";
import styles from "../core/styles";

const UserTrips = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    axios
      .get("http://192.168.212.61:5000/profile/user_history", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.data.trips);

        setHistory(res.data.data.trips);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Background>
      <View style={{ flex: 1, width: "100%" }}>
        {history.map((item, key) => (
          <View style={{ width: "100%", paddingBottom: 10 }} key={key}>
            <Text>{item.route}</Text>
            <Text>Booking Id : {item.booking_id}</Text>
            <Text>Transaction Id : {item.transaction_id}</Text>
            <Text>Date : {item.depature_time}</Text>
            <Text>Vehicle Plate : {item.vehicle}</Text>
            <Text>Charges : {item.fare} Ksh</Text>
            <Text>Status : {item.status}</Text>

            <Divider />
          </View>
        ))}
      </View>
    </Background>
  );
};

export default UserTrips;
