import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../Global/StateProvider";
import db, { auth } from "./Firebase";
import Navbar from "./Navbar";
import { useHistory } from "react-router";
import BG from "../Assets/BG.svg";

function CreateNote() {
  const [{ noteForm, user }, dispatch] = useStateValue();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");
  const [bookName, setBookName] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [url, setUrl] = useState("");

  const history = useHistory();
  return (
    <div className="notes main">
      <img
        alt=""
        style={{
          position: "fixed",
          width: "100%",
          zIndex: -1,
        }}
        src={BG}
      ></img>
      <Navbar isNote={true} />
      <div className="notes-container container">
        <form
          style={{
            gridTemplateRows: `${
              noteForm ? "60px 60px 60px  60px auto 60px" : ""
            }`,
          }}
        >
          <input
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
          />
          {noteForm ? (
            <>
              {" "}
              <input
                required={true}
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                type="text"
                placeholder="Bookname"
              />
              <input
                required={true}
                value={chapterName}
                onChange={(e) => setChapterName(e.target.value)}
                type="text"
                placeholder="Chaptername"
              />
            </>
          ) : (
            ""
          )}
          {noteForm ? (
            ""
          ) : (
            <input
              onChange={(e) => setTopic(e.target.value)}
              value={topic}
              required={true}
              type="text"
              placeholder="Topic"
            />
          )}
          <input
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            required={true}
            type="text"
            placeholder="Image Url"
          />
          <textarea
            required={true}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            type="text"
            placeholder="Body"
          />
          <button
            onClick={(e) => {
              e.preventDefault();

              if (noteForm) {
                db.collection("notes")
                  .add({
                    title: title,
                    bookname: bookName,
                    chaptername: chapterName,
                    body: body,
                    author: user.displayName,
                    url: url,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  })
                  .then(() => {
                    setBody("");
                    setBookName("");
                    setChapterName("");
                    setTitle("");
                    setTopic("");
                    setUrl("");
                    history.push("/notes");
                  })
                  .catch((err) => alert(err.message));
              } else {
                db.collection("articles")
                  .add({
                    title: title,
                    topic: topic,
                    body: body,
                    url: url,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  })
                  .then(() => {
                    setBody("");
                    setBookName("");
                    setChapterName("");
                    setTitle("");
                    setTopic("");
                    setUrl("");
                    history.push("/articles");
                  })
                  .catch((err) => alert(err.message));
              }
            }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateNote;
