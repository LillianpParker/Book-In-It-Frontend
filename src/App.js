import React, {useState, useEffect} from 'react';
import './App.css';
import Books from './components/Books.js';


export default function App(props) {
  const [books, setBooks] = useState([])
  const [formInputs, updateFormInputs] = useState({
    author: '',
    content: '',
    title: ''
  })
  
const handleChange = (event) => {
  const updateInput = Object.assign({}, formInputs, { [event.target.id]: event.target.value })
  updateFormInputs(updateInput)
}

const handleSubmit  = async (event) =>{
  event.preventDefault()
  try{
    const response = await fetch('http://localhost:3000/books', {
      body: JSON.stringify(formInputs),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    updateFormInputs({
      author: '',
      content: '',
      title: ''
    })
    setBooks([data, ...books])
  }catch(error){
    console.error(error)
  }
}
const getBooks = async () => {
  try {
    const response = await fetch('https://localhost:3000/books')
    const data = await response.json()
    console.log(data)
   } catch(error){
     console.error(error)
   }
 } 
useEffect(()=>{
 (async function (){
   await getBooks()
     })()
   },[])

  return (
    <div className="App">
      <div className="container">
          <nav>
            <h4>Add A New Book</h4>
          <form onSubmit={handleSubmit}>
          <label htmlFor="cover_image">Cover Image</label>
            <input type="text" id="cover_image" value={formInputs.cover_image} onChange={handleChange}/>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" value={formInputs.title} onChange={handleChange}/>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" value={formInputs.author} onChange={handleChange}/>
            <label htmlFor="synopsis">Synopsis</label>
            <input type="text" id="synopsis" value={formInputs.synopsis} onChange={handleChange}/>
            <input type="submit" className="submit" />
          </form>
        </nav>
        <main>
        <Books books={books}/>
          </main>
        <aside></aside>
      </div>
    <footer />
  </div>
  );
}