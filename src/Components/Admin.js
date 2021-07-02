import React, { useState } from "react";
import { Link } from "react-router-dom";
import Note from "./Note";
import Navbar from "./Navbar";
import { auth } from "./Firebase";
import { Redirect } from "react-router";
import { useStateValue } from "../Global/StateProvider";
function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="admin main">
      <Navbar />

      <div className="admin-container notes-container container">
        {!user ? (
          <form>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                auth
                  .signInWithEmailAndPassword(email, password)
                  .then(() => {
                    <Redirect to="/articles" />;
                  })
                  .catch((err) => alert(err.message));
              }}
              type="submit"
            >
              Admin Login
            </button>
          </form>
        ) : (
          <div
            onClick={() => auth.signOut()}
            style={{
              backgroundColor: "#53bd9413;",
              fontSize: "2rem",
              padding: "1rem",
              borderRadius: "3px",
              marginTop: "2rem",
              cursor: "pointer",
              color: "#53bd95",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            Logout
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
