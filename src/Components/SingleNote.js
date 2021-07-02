import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "./Firebase";
import Navbar from "./Navbar";
import Note from "./Note";

function SingleNote() {
  const [loading, setLoading] = useState(true);
  const { note } = useParams();

  const [noteForDom, setNoteForDom] = useState({});
  const [id, setId] = useState("");

  useEffect(() => {
    db.collection("notes")
      .doc(note)
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
            title={noteForDom.title}
            body={noteForDom.body}
            bookname={noteForDom.bookname}
            chaptername={noteForDom.chaptername}
            date={noteForDom.timestamp}
            author={"Md Abrar Zahin Antor"}
            isNoteEdit={true}
            isNote={true}
            id={id}
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

export default SingleNote;
