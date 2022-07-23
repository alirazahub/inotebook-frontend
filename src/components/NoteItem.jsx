import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
    //Deleting A Note
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note,updateNote } = props;
    return (
        <>
            <div className="col-md-3 col-10">
                <div className="card my-4">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <p className="card-text">{note.tag}</p>
                        <i className="fa-regular fa-trash-can mx-3" onClick={()=>{deleteNote(note._id);
                        props.showAlert("Note Deleted Successfully","success");}}></i>
                        <i className="fa-regular fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem;