import React, {useState, useEffect} from 'react';

export default function Books (props) {
    return (
        <div>
            {props.books.map( book => {
                return  (
                    <div key={book.id} className="book">
                        <img src={book.cover_image}/>
                        <h3>{ book.title }</h3>
                        <small>{book.author }</small>
                        <p className="summary">{ book.synopsis }</p>
                    </div>
                )
            })}
        </div>
    )
}