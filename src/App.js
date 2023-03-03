import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://v2.jokeapi.dev/joke/Programming?amount=10')
            .then(res => res.json())
            .then(
                result => {
                    setIsLoaded(true);
                    setItems(result);
                },
                error => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <section className="container">
                <h1>Programmer Jokes</h1>
                {items.jokes.map(item => {
                    if (item.type === 'single') {
                        return (
                            <div
                                className="quote box"
                                key={item.id}>
                                <p>{item.joke}</p>
                            </div>
                        );
                    } else {
                        return (
                            <div
                                className="qa box"
                                key={item.id}>
                                <p>Question:</p>
                                <p className="quoestion">{item.setup}</p>
                                <p>Answer:</p>
                                <p className="answer"> {item.delivery}</p>
                            </div>
                        );
                    }
                })}
            </section>
        );
    }
}

export default App;
