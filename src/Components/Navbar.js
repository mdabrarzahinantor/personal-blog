import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Note from "./Note";
import { useStateValue } from "../Global/StateProvider";
import { actionTypes } from "../Global/Reducer";
import { useHistory } from "react-router-dom";

function Navbar({ isNote }) {
  const [pathname, setPathname] = useState(window.location.pathname);
  const [showSearch, setShowSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [term, setTerm] = useState("");

  const [{ noteForm, user }, dispatch] = useStateValue();

  const history = useHistory();

  return (
    <div className="notes-navbar navbar">
      <div
        style={{ zIndex: 12, display: `${showSearch ? "" : "none"}` }}
        className="search-container"
      >
        <input
          onChange={(e) => setTerm(e.target.value)}
          onClick={() => setIsSearching(true)}
          type="text"
        ></input>

        <i
          onClick={() => {
            setShowSearch(false);
            setIsSearching(false);
          }}
          class="fas fa-times    "
        ></i>

        <div className="search-btn">
          <div
            onClick={() => {
              if (term.length != 0) {
                history.push(`/search/${term}`);
              }
            }}
          >
            Search
          </div>
        </div>
      </div>

      <div
        className={`${
          pathname === "/articles" ? "active" : ""
        } notes-navbar-link navbar-link`}
      >
        <Link to="/articles">Articles</Link>
      </div>
      <div
        className={`${
          pathname === "/notes" ? "active" : ""
        } notes-navbar-link navbar-link`}
      >
        <Link to="/notes">Notes</Link>
      </div>

      <div
        style={{ display: `${user ? "" : "none"}` }}
        className={`${
          pathname === "/create" ? "active" : ""
        } notes-navbar-link navbar-link`}
      >
        <Link to="/create">Create</Link>
      </div>
      {isNote ? (
        <div
          onClick={() =>
            dispatch({
              type: actionTypes.TOGGLE_NOTE_FORM,
              noteForm: !noteForm,
            })
          }
          style={{
            position: "fixed",
            right: ".1rem",
            fontSize: "1.5rem",
            bottom: ".1rem",
            zIndex: "30",
            backgroundColor: "#53bd95",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <a style={{ color: "#fff" }} href="#">
            <i class="fab fa-rev    "></i>
          </a>
        </div>
      ) : (
        <div
          onClick={() => setShowSearch(!showSearch)}
          style={{
            position: "fixed",
            right: ".1rem",
            fontSize: "1.5rem",
            bottom: ".1rem",
            zIndex: "30",
            backgroundColor: "#53bd95",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <a style={{ color: "#fff" }} href="#">
            <i class="fas fa-search    "></i>
          </a>
        </div>
      )}
    </div>
  );
}

export default Navbar;
