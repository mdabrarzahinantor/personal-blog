import React, { useEffect, useState } from "react";
import Linkify from "react-linkify";
import { useStateValue } from "../Global/StateProvider";
import db from "./Firebase";
import { Link, useParams } from "react-router-dom";
import IMG from "../Assets/Frame 5.png";
function Note({
  isNote,
  isNoteEdit,
  isArticle,
  title,
  topic,
  body,
  bookname,
  chaptername,
  date,
  author,
  id,
  url,
}) {
  const [showForm, setShowForm] = useState(false);
  const [{ user }, dispatch] = useStateValue();

  const [titleEdit, setTitleEdit] = useState(title);
  const [booknameEdit, setBooknameEdit] = useState(bookname);
  const [chapternameEdit, setChapternameEdit] = useState(chaptername);
  const [topicEdit, setTopicEdit] = useState(topic);
  const [bodyEdit, setBodyEdit] = useState(body);
  const { note, article } = useParams();
  const [urlEdit, setUrlEdit] = useState(url);
  return (
    <div
      id={id}
      data-aos="zoom-in"
      data-aos-ease="ease-in-quad"
      className="note"
      style={{ minHeight: `${showForm ? "500px" : ""}` }}
    >
      {/* <img alt="" src={`${url ? url : IMG}`}></img> */}
      <div
        style={{ display: `${showForm ? "" : "none"}` }}
        className="notes-container note-form"
      >
        <form
          style={{
            gridTemplateRows: `${
              isNoteEdit
                ? "60px 60px 60px 60px auto 60px 60px"
                : "60px 60px 60px auto 60px 60px"
            }`,
          }}
        >
          <input
            value={titleEdit}
            onChange={(e) => setTitleEdit(e.target.value)}
            type="text"
            placeholder="Title"
          />
          {isNoteEdit ? (
            <>
              {" "}
              <input
                value={booknameEdit}
                onChange={(e) => setBooknameEdit(e.target.value)}
                type="text"
                placeholder="Bookname"
              />
              <input
                value={chapternameEdit}
                onChange={(e) => setChapternameEdit(e.target.value)}
                type="text"
                placeholder="Chaptername"
              />
            </>
          ) : (
            <>
              {" "}
              <input
                value={topicEdit}
                onChange={(e) => setTopicEdit(e.target.value)}
                type="text"
                placeholder="Topic"
              />
            </>
          )}
          <input
            value={urlEdit}
            onChange={(e) => setUrlEdit(e.target.value)}
            type="text"
            placeholder="Image Url"
          />
          <textarea
            value={bodyEdit}
            onChange={(e) => setBodyEdit(e.target.value)}
            type="text"
            placeholder="Body"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (isNote) {
                db.collection("notes")
                  .doc(id)
                  .update({
                    title: titleEdit,
                    bookname: booknameEdit,
                    chaptername: chapternameEdit,
                    body: bodyEdit,
                    url: urlEdit,
                  })
                  .then(() => {
                    setShowForm(false);
                  });
              }
              if (isArticle) {
                db.collection("articles")
                  .doc(id)
                  .update({
                    title: titleEdit,
                    topic: topicEdit,
                    body: bodyEdit,
                    url: urlEdit,
                  })
                  .then(() => {
                    setShowForm(false);
                  });
              }
            }}
            type="submit"
          >
            Submit
          </button>
          <button
            onClick={(e) => setShowForm(false)}
            style={{ backgroundColor: "#f4f4f4", color: "#1e1e1e" }}
            type="button"
          >
            Cancel
          </button>
        </form>
      </div>
      <div className="  note-title">{title}</div>{" "}
      {isNote ? (
        <>
          {" "}
          <div className="s note-book">
            <i class="fas fa-book-reader    "></i> <span> {bookname}</span>
          </div>
          {chaptername.length > 0 ? (
            <div className="s note-book">
              <i class="fas fa-th-list    "></i> <span> {chaptername}</span>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        ""
      )}
      <div className="note-additional">
        <div className="s note-author">
          <i class="fas fa-pen    "></i>
          <span>{author}</span>
        </div>
        <div className="s note-author">
          <i class="fas fa-calendar    "></i>
          <span>
            {new Date(date?.toDate()).toUTCString() === "Invalid Date"
              ? " "
              : new Date(date?.toDate()).toLocaleDateString()}
          </span>
        </div>
        {isNote ? (
          ""
        ) : (
          <div style={{ marginRight: "0" }} className="s note-author">
            <i class="fas fa-book    "></i> <span>{topic}</span>
          </div>
        )}
      </div>
      <div className="note-main">
        <Linkify>{body}</Linkify>
      </div>
      <div className=" note-footer">
        {note == null && article == null ? (
          <Link
            to={`${isArticle ? `/articles/${id}` : `/notes/${id}`}`}
            className="note-edit"
          >
            <i class="fas fa-expand    "></i>
          </Link>
        ) : (
          <></>
        )}

        <div
          style={{ display: `${user ? "" : "none"}` }}
          onClick={() => setShowForm(true)}
          className="note-edit"
        >
          <i class="fas fa-edit    "></i>
        </div>
        <div
          style={{ display: `${user ? "" : "none"}` }}
          onClick={() => {
            const del = window.confirm("Really Wanna Del?");

            if (del && isArticle) {
              db.collection("articles").doc(id).delete();
            }
            if (del && isNote) {
              db.collection("notes").doc(id).delete();
            }
          }}
          className="note-del"
        >
          <i class="fas fa-trash    "></i>
        </div>
      </div>
    </div>
  );
}

export default Note;
