import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import TextInput from "./input";

const styles = StyleSheet.create({
  flatList: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Ensure the FlatList appears above other elements
  },
  // Other styles...
});

const SearchableList = ({ data, placeholder, onItemSelected }) => {
  const [search, setSearch] = useState("");
  const [showFlatList, setShowFlatList] = useState(true);

  const onSelect = (item) => {
    setSearch(item);
    setShowFlatList(false);
    onItemSelected(item);
  };

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View>
      <TextInput
        label={placeholder}
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="text"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      {search !== "" && showFlatList && (
        <FlatList
          style={styles.flatList}
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSelect(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default SearchableList;
