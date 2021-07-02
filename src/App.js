import "./App.css";
import Notes from "./Components/Notes";
import { BrowserRouter, Route } from "react-router-dom";
import Articles from "./Components/Articles";
import CreateNote from "./Components/CreateNote";
import Admin from "./Components/Admin";
import { useEffect, useState } from "react";
import db, { auth } from "./Components/Firebase";
import { useStateValue } from "./Global/StateProvider";
import { actionTypes } from "./Global/Reducer";
import Search from "./Components/Search";
import SingleNote from "./Components/SingleNote";
import SingleArticle from "./Components/SingleArticle";

function App() {
  const [{ user }, dispatch] = useStateValue();

  const [articles, setArticles] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      dispatch({
        type: actionTypes.SET_USER,
        user: user,
      });
    });
    return () => {
      unsub();
    };
  }, []);
  useEffect(() => {
    const unsub = () =>
      db
        .collection("articles")
        .orderBy("timestamp", "desc")
        .onSnapshot((snap) => {
          setArticles(
            snap.docs.map((doc) => ({
              id: doc.id,
              title: doc.data().title,
              topic: doc.data().topic,
              body: doc.data().body,
              author: doc.data().author,
              timestamp: doc.data().timestamp,
            }))
          );
        });

    return unsub();
  }, []);

  useEffect(() => {
    const unsub = () =>
      db
        .collection("notes")
        .orderBy("timestamp", "desc")
        .onSnapshot((snap) => {
          setNotes(
            snap.docs.map((doc) => ({
              id: doc.id,
              title: doc.data().title,
              bookname: doc.data().bookname,
              chaptername: doc.data().chaptername,

              body: doc.data().body,
              author: doc.data().author,
              timestamp: doc.data().timestamp,
            }))
          );
        });

    return unsub();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/notes">
          <Notes />
        </Route>
        <Route exact path="/">
          <Articles />
        </Route>
        <Route exact path="/articles">
          <Articles />
        </Route>
        <Route exact path="/create">
          <CreateNote />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Route exact path="/search/:sterm">
          <Search articles={articles} notes={notes} />
        </Route>
        <Route exact path="/notes/:note">
          <SingleNote />
        </Route>
        <Route exact path="/articles/:article">
          <SingleArticle />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
