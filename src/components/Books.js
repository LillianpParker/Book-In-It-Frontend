import React, {useState, useEffect} from 'react';

export default function Books (props) {
    const [books, setBooks] = useState([])
    const getBooks = async () => {
       try {
         const response = await fetch('https://book-in-it-api.herokuapp.com/books')
         const data = await response.json()
         setBooks(data)
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
            <div>
                {books.map( book => {
                    return  (
                        <div key={book.id} className="book">
                            <img src={book.cover_image}/>
                            <h3>{ book.title }</h3>
                            <small>{book.author }</small>
                            <p>{ book.synopsis }</p>
                        </div>
                    )
                })}
            </div>
        )
}