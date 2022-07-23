import React, { useState, useContext, useEffect, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import { useHistory } from 'react-router-dom';

function YourNotes(props) {
  let history = useHistory();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  const redirectToAddNote = () => {
    history.push('/');
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    }
    else{
      history.push("/login");
    }
    //eslint-disable-next-line
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })


  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Note updated Successfully", "success");
    refClose.current.click();
  }


  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }
  return (
    <>
      <button type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form className='mx-4'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} required minLength={5} />
                  <div className="form-text text-danger">*Minimum Length 5 Characters</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} rows="3" required minLength={5}></textarea>
                  <div className="form-text text-danger">*Minimum Length 5 Characters</div>
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleSubmit} className="btn btn-outline-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <h2 className='text-center my-3'>Your Notes</h2>
      <div className="row my-4">
        {notes.length === 0 && <div className='text-center'><p className=' my-5'>No Notes</p><i onClick={redirectToAddNote} class="fa-solid fa-plus addItem" ></i><div>Add Note</div></div>}
        {
          notes.map((note) => {
            return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />;
          })
        }
      </div>

    </>
  )
}

export default YourNotes;