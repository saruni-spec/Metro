import { useState } from "react";
import PropTypes from "prop-types";

const SearchableList = ({ data, placeholder, onItemSelect }) => {
  const [search, setSearch] = useState("");

  const onSelect = (item) => {
    setSearch(item);
    onItemSelect(item);
  };

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input
        placeholder={placeholder}
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {search !== "" && (
        <ul>
          {filteredData.map((item, index) => (
            <li key={index} value={item} onClick={() => onSelect(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

SearchableList.propTypes = {
  data: PropTypes.array,
  placeholder: PropTypes.string,
  onItemSelect: PropTypes.func,
};

export default SearchableList;
