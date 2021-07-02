import React, { useEffect, useState } from "react";
import "./style.css";
import Note from "./Note";
import Navbar from "./Navbar";
import db from "./Firebase";
import BG from "../Assets/BG.svg";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (notes.length !== 0) {
      setLoading(false);
    }
  }, [notes]);

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
            {notes.map((note) => (
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
                url={note.url}
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
      </div>
    </div>
  );
}

export default Notes;
