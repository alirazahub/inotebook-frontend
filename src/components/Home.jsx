import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import { useHistory } from 'react-router-dom';

function Home(props) {

  const history = useHistory();
  if(!localStorage.getItem('token')){
    history.push('/login');
  }
  //Adding A Note
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" })

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note added Successfully","success");
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }
  return (
    <>
      <div className="container row">
        <h2 className='text-center my-3'>Add a Note</h2>
        <form className='col-md-5 col-10 mx-auto my-5'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' onChange={onChange}  minLength={5} required value={note.title} />
            <div className="form-text text-danger">*Minimum Length 5 Characters</div>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name="description" onChange={onChange} rows="3" minLength={5} required  value={note.description}></textarea>
            <div className="form-text text-danger">*Minimum Length 5 Characters</div>
          </div>
          <button type="submit" className="btn btn-outline-primary" disabled={note.title.length<5 || note.description.length<5} onClick={handleSubmit}>Add Note</button>
        </form>
      </div>
    </>
  )
}

export default Home;