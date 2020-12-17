import React, { useEffect, useState } from "react";
import headers from "./auth/headers";
import "./styles.css";
import SearchList from "./SearchList";
const queryString = require("query-string");

const Search = ({ currentUser, location, logOut }) => {
  console.log(currentUser);
  // const people = location.state.searchResult;
  const parsedString = queryString.parse(location.search);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const getSearchResult = async () => {
      const response = await fetch(
        `/users/search?q=${parsedString.q}`,
        {
          headers: headers(),
          mode: "cors",
        }
      );
      const searchResult = await response.json();
      setPeople(searchResult.data);
    };
    getSearchResult();
  }, [parsedString.q]);

  return (
    <>
      <div className="conatiner">
        <div className="row">
          <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3">
            {people.length ? (
              <div className="container mt-5">
                {people.length &&
                  people.map((person) => {
                    return <SearchList key={person._id} person={person} />;
                  })}
              </div>
            ) : (
              <div className="conatiner m-5">No user Available</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
