import React, { useState, useEffect } from 'react';
import { getCardValue } from '../util';

const deckofCards = 'https://deckofcardsapi.com/api/deck/new/shuffle';

const Player = () => {
    const [deckId, setDeckId] = useState(null);

    // Set to 51 instead of 52 because 1 card is automatically pulled
    const [remainingCards, setRemainingCards] = useState(51);
    const [hand, setHand] = useState([]);

    /**
     * When the component first mounts and does a first render
     * Grab a new deckId and set it into state
     */
    useEffect(() => {
        fetch(deckofCards)
        .then((res) => res.json())
        .then((data) => {
            setDeckId(data.deck_id);
        });
    }, []);

    /*
        useEffect takes 2 parameters:
        1. A function to run (often called an 'effect')
        2. An array of dependencies (often called the dependency array)

        useEffect( () => {
            console.log('Hello Kody!');
        }, [value, value2]);

        // Whenever 'value' or 'value2' changes, the program will console.log('Hello Kody!');
        // When the dependency array is empty (e.g []) - The function will only run once when the component is first rendered

    */
    // useEffect(function, [])

    useEffect(() => {
        if (deckId !== null) {
            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
                .then(res => res.json())
                .then((data) => { 
                    const card = data.cards[0];
                    console.log(card);

                    // NO! Do not mutate state variables. Create copies instead
                    //hand.push()

                    // YES! Create a copy
                    setHand([...hand, {
                        code: card.code,
                        image: card.image,
                        suit: card.suit,
                        value: card.value
                    }]);
                    
                });
        }
        
    }, [deckId, remainingCards]);

    const drawCard = () => {
        setRemainingCards(remainingCards - 1);
    }
    
    
    return (

        <div>
            <button onClick={drawCard} >DRAW CARD</button>
            <div>Deck ID: {deckId}</div>
            <div style={{ display: "flex", flexwrap: "wrap", flexDirection: "row", width: "70%"}}>
                {hand.map( card => {
                    return <img src={card.image} key={card.code} />;
                })}
            </div>   
            {/*This is where the image will go*/}
        </div>
    );
}
/*
    useEffect(() => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckApi}/draw/?count=1`)
        .then(res => {
            return res.blob()
        }).then(data => {
            setCard(data.images)
        })
    }, [setCard]);

    const onBtnClick = (deckApi) => {
        const url = `https://deckofcardsapi.com/api/deck/${deckApi}/draw/?count=1`;
        fetch(url)
        .then(res => {
          return res.json()
        }).then( res => {
            setCard(res.data);
        })
        };
    */

export default Player;