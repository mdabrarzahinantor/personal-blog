import React, { useEffect, useState } from "react";
import "./style.css";
import Note from "./Note";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import db from "./Firebase";
import BG from "../Assets/BG.svg";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (articles.length !== 0) {
      setLoading(false);
    }
  }, [articles]);

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
              url: doc.data().url,
              body: doc.data().body,
              author: doc.data().author,
              timestamp: doc.data().timestamp,
            }))
          );
        });

    return unsub();
  }, []);

  return (
    <div className="notes main">
      <Navbar />
      <div className="notes-container container">
        {!loading ? (
          <>
            {" "}
            {articles.map((article) => {
              return (
                <Note
                  key={article.id}
                  id={article.id}
                  isArticle={true}
                  title={article.title}
                  topic={article.topic}
                  body={article.body}
                  date={article.timestamp}
                  url={article.url}
                  author={"Md Abrar Zahin Antor"}
                />
              );
            })}
          </>
        ) : (
          <div className="loader">
            <div class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Articles;
