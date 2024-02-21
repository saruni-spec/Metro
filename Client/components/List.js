import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";

const List = ({ data, search, setSearch, onItemSelected }) => {
  const onSelect = (item) => {
    setSearch(item);
    onItemSelected(item);
  };

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View>
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

export default List;
