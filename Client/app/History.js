import { useState, useEffect } from "react";
import Background from "../components/Background";
import { FlatList, View } from "react-native";
import axios from "axios";
import { Divider, Text } from "react-native-paper";
import styles from "../core/styles";

const History = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    axios
      .get("http://192.168.222.61:5000/profile/driver_history", {
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
        {history.map((item, index) => (
          <View style={{ flex: 1, width: "100%" }}>
            <Text>{item.route}</Text>
            <Text>Date : {item.depature_time}</Text>
            <Text>Seats : {item.booked_seats}</Text>
            <Text>Charges : {item.fare}</Text>
            <Divider />
          </View>
        ))}
      </View>
    </Background>
  );
};

export default History;
