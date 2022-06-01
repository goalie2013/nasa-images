import React, { useState } from "react";
import Button from "react-bootstrap/Button";

export default function QueryForm({ updateUrl }) {
  const [query, setQuery] = useState("");
  const [titleWord, setTitleWord] = useState("");

  return (
    <div>
      {titleWord ? (
        <h4 className="form-heading">Images for {titleWord}</h4>
      ) : (
        <h4 className="form-heading">Images for ...</h4>
      )}
      <form
        className="query-form"
        onSubmit={(e) => {
          e.preventDefault();
          updateUrl(`https://images-api.nasa.gov/search?q=${query}`);

          if (query.split(" ").length > 1) {
            const arr = query.split(" ");
            const newArr = arr.map(
              (word) => word[0].toUpperCase() + word.substring(1).toLowerCase()
            );
            const newStr = newArr.join(" ");
            setTitleWord(newStr);
          } else if (query === "nasa" || query === "Nasa") {
            setTitleWord(query.toUpperCase());
          } else {
            setTitleWord(
              query[0].toUpperCase() + query.substring(1).toLowerCase()
            );
          }
        }}
      >
        <input
          className="query-form-input"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button className="query-form-btn" type="submit" variant="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}
