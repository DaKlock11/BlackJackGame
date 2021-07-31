import React, { useState, useEffect } from 'react';


const deckofCards = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

const Player = () => {

    const [card, setCard] = useState([]);
    const [deckApi, setDeckApi] = useState(null);
    

    useEffect(() => {
        fetch(deckofCards)
        .then(response => {
            return response.json();
        }).then((body) => {
            setDeckApi(body.deck_id);
        })
    }, []);

    
    const onBtnClick = (deckApi) => {
        const url = `${deckofCards}${deckApi}/draw/?count=1`;
        fetch(url)
        .then((res) => {
            setCard([...card, res.body.cards[0]]);
        })
        };

    if(!card) {
        return (
            <div>
                <h1>Error</h1>
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={onBtnClick}>DRAW CARD</button>
                <img src={card.image}/>
                <div style={{ display: "flex", flexwrap: "wrap", flexDirection: "row", width: "100%"}}>
                    {card.map((c) => (
                    <img key={c[0]["image"]} src={c[0]["image"]} alt="hand" /> 
                    ))}
                </div>
            </div>
    );
}
}

export default Player;