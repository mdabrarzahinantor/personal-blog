import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Note from "./Note";

function Search({ notes, articles }) {
  const [loading, setLoading] = useState(true);

  const [mNotes, setMNotes] = useState([]);
  const [mArticles, setmArticles] = useState([]);

  const { sterm } = useParams();

  const [term, setTerm] = useState(sterm);

  useEffect(() => {
    setTerm(sterm);
  }, [sterm]);

  useEffect(() => {
    if (notes.length !== 0 && articles.length !== 0) {
      setLoading(false);
    }
    if (notes.length > 0) {
      let matches = notes.filter((note) => {
        const regex = new RegExp(`${term}`, "gi");

        return (
          note.title.match(regex) ||
          note.bookname.match(regex) ||
          note.chaptername.match(regex) ||
          note.body.match(regex)
        );
      });
      setMNotes(matches);
    }
    if (articles.length > 0) {
      let matches = articles.filter((article) => {
        const regex = new RegExp(`${term}`, "gi");

        return (
          article.title.match(regex) ||
          article.topic.match(regex) ||
          article.body.match(regex)
        );
      });
      setmArticles(matches);
    }
  }, [notes, articles, term]);

  return (
    <div className="notes main">
      <Navbar />
      <div className="notes-container container">
        {mNotes.length > 0 ? (
          <div className="h">Notes</div>
        ) : (
          <div className="h">No Notes</div>
        )}

        {!loading ? (
          <>
            {mNotes.map((note) => (
              <Note
                title={note.title}
                body={note.body}
                bookname={note.bookname}
                chaptername={note.chaptername}
                date={note.timestamp}
                author={"Md Abrar Zahin Antor"}
                isNoteEdit={true}
                isNote={true}
                id={note.id}
                key={note.id}
              />
            ))}
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

        {mArticles.length > 0 ? (
          <div className="h">Articles</div>
        ) : (
          <div className="h">No Articles</div>
        )}
        {!loading ? (
          <>
            {" "}
            {mArticles.map((article) => {
              return (
                <Note
                  key={article.id}
                  id={article.id}
                  isArticle={true}
                  title={article.title}
                  topic={article.topic}
                  body={article.body}
                  date={article.timestamp}
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

export default Search;
