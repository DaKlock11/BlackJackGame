import React, { useState, useEffect } from 'react';
import './hand.css';

const Hand = () => {
    const [cardState, setCardState] = useState({ cards: [] });

    useEffect(() => {
        async function getCard() {
            const resp = await fetch(
                "https://deckofcardsapi.com/api/deck/new/draw/?count=2"
            );
            const data = await resp.json();
            setCardState(data);
            console.log(data);
        }
        getCard();
    }, []);

    drawCard = () => {
        
    }

    return (
        <div className="Hand">
            <div>Your Hand</div>
            <div className="cardHandler">
                {cardState.cards.map((card, index) => (
                    <div key={index}>
                        <img src={card.image} alt="Drawn card" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Hand;