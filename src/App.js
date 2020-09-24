import React, {useState, useEffect} from 'react';
import Books from './components/Books.js';


function App () {
  const [formInputs, updateFormInputs] = useState({
    cover_image: '',
    title: '',
    author: '',
    synopsis: ''
  });
  const [books, setBooks] = useState([])
  useEffect(
    ()=>{
      const callBooks = async ()=>{
       await getBooks();	
     }
     callBooks();
    }, 
    []
    )

const handleChange = (event) => {
  const updateInput = Object.assign({}, formInputs, { [event.target.id]: event.target.value })
  updateFormInputs(updateInput)
}

const handleSubmit  = async (event) =>{
  event.preventDefault()
  try{
    const response = await fetch('https://book-in-it-api.herokuapp.com/books', {
      body: JSON.stringify(formInputs),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    updateFormInputs({
      cover_image: '',
      title: '',
      author: '',
      synopsis: ''
    })
    setBooks([data, ...books])
  }catch(error){
    console.error(error)
  }
}

const getBooks = async () => {
  try {
    const response = await fetch('https://book-in-it-api.herokuapp.com/books')
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

export default App;