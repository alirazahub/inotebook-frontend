import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    

    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);




    //Getting All Notes
    const getNotes = async () => {
        //Api Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        // console.log(json);
        setNotes(json);
    }


    //Add Note
    const addNote = async (title, description, tag) => {
        //Api Call
        //eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = await response.json();
        setNotes(notes.concat(note));
    }

    //Delete Note
    const deleteNote = async (id) => {
        //api call
        //eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);

    }

    //Edit Note
    const editNote = async (id, title, description, tag) => {
        //Api Call
        //eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;