import React, { useState, useEffect } from 'react';
import Books from './components/Books.js';
import axios from 'axios';


function App() {
  const [formInputs, updateFormInputs] = useState({
    cover_image: '',
    title: '',
    author: '',
    synopsis: ''
  });
  const [books, setBooks] = useState([])

  const getBooks = async () => {
    try {
      const response = await fetch('https://book-in-it-api.herokuapp.com/')
      console.log(response)
      const data = await response.json()
      console.log(data)
      setBooks(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(
    ()=>{
      (
        async function (){
           await getBooks();
        }
      )()
    }, [])

  const handleChange = (event) => {
    const updateInput = Object.assign({}, formInputs, { [event.target.id]: event.target.value })
    updateFormInputs(updateInput)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'https://book-in-it-api.herokuapp.com/',
        formInputs
      );
      const createdBook = response.data
      await updateFormInputs({
        cover_image: '',
        title: '',
        author: '',
        synopsis: ''
      })
      await setBooks([createdBook, ...books])
    } catch (error) {
      console.error(error)
    }
  }



  return (
    <div className="App">
      <div className="container">
        <nav>
          <h4>Add A New Book</h4>
          <form onSubmit={handleSubmit}>
            <label htmlFor="cover_image">Cover Image</label>
            <input type="text" id="cover_image" value={formInputs.cover_image} onChange={handleChange} />
            <label htmlFor="title">Title</label>
            <input type="text" id="title" value={formInputs.title} onChange={handleChange} />
            <label htmlFor="author">Author</label>
            <input type="text" id="author" value={formInputs.author} onChange={handleChange} />
            <label htmlFor="synopsis">Synopsis</label>
            <input type="text" id="synopsis" value={formInputs.synopsis} onChange={handleChange} />
            <input type="submit" className="submit" />
          </form>
        </nav>
        <main>
          <Books books={books} />
        </main>
        <aside></aside>
      </div>
      <footer />
    </div>
  );
}

export default App;