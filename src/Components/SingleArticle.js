import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "./Firebase";
import Navbar from "./Navbar";
import Note from "./Note";

function SingleArticle() {
  const [loading, setLoading] = useState(true);
  const { article } = useParams();

  const [noteForDom, setNoteForDom] = useState({});
  const [id, setId] = useState("");

  useEffect(() => {
    db.collection("articles")
      .doc(article)
      .onSnapshot((doc) => {
        setId(doc.id);
        setNoteForDom(doc.data());
        setLoading(false);
      });
  }, []);

  return (
    <div className="notes main">
      <Navbar />
      <div className="notes-container container">
        {!loading ? (
          <Note
            id={id}
            isArticle={true}
            title={noteForDom.title}
            topic={noteForDom.topic}
            body={noteForDom.body}
            date={noteForDom.timestamp}
            author={"Md Abrar Zahin Antor"}
            url={noteForDom.url}
          />
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

export default SingleArticle;
