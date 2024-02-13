import React, { useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import TextInput from "./input";

const SearchableList = ({ data, placeholder, onItemSelected }) => {
  const [search, setSearch] = useState("");

  const onSelect = (item) => {
    setSearch(item);
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
        textContentType="text"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      {search !== "" && (
        <FlatList
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
