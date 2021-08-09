import React, { useEffect, useState, useCallback } from 'react';
import Hand from '../hand';
import Dealer from '../dealer';
import Controls from '../controls';
//import Player from '../Player';
//import { getCardValue } from '../util';
import './GameBoard.css';

const DECK_OF_CARDS_API_ENDPOINT = 'https://deckofcardsapi.com/api/deck/new/shuffle';

const GameBoard = () => {
    
    const [apiState, setApiState] = useState(null);
    const [deckId, setDeckId] = useState(null);
    const [playersHand, setPlayersHand] = useState([]);
    const [dealersHand, setDealersHand] = useState([]);
    const [hand, setHand] = useState([]);
    const [remainingCards, setRemainingCards] = useState(51);
    const [gameStarted, setGameStarted] = useState(false);

    const [isError, setError] = useState(false);

    const [playersScore, setPlayersScore] = useState(0);
    const [dealersScore, setDealersScore] = useState(0);

    /*
    useEffect(() => {
        fetch(DECK_OF_CARDS_API_ENDPOINT).then(resp => {
            return resp.json();
        }).then( json => {
            setApiState(json);
        })
    }, []);
    */

    useEffect(() => {
        fetch(DECK_OF_CARDS_API_ENDPOINT)
        .then((res) => res.json())
        .then((data) => {
            setDeckId(data.deck_id);
        })
    }, []);

    useEffect(() => {
        if (deckId !== null) {
            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(res => res.json())
            .then((data) => {
                const card = data.cards[0];
                console.log(card);

                setHand([...hand, {
                    code: card.code,
                    image: card.image,
                    value: card.value,
                    suit: card.suit
                }])
            })
        }
    }, [deckId, remainingCards]);

    const drawCard = () => {
        setRemainingCards(remainingCards - 1);
    }

    const startGame = (() => {
        fetch(`${DECK_OF_CARDS_API_ENDPOINT}/new/shuffle/?deck_count=1`)
        .then((resp) => resp.json())
        .then((body) => {
            setDeckId([body.deck_id]);
        })
    });
    console.log(startGame);

    

    return (
        <div className="gameboard">
             <div>{JSON.stringify(deckId, null, 4)}</div>
             <div>
                <button onClick={drawCard}>Click Me</button>
                <div style={{ display: "flex", width: "5vw"}}>
                     {hand.map( card => {
                         return <img src={card.image} key={card.code} />;
                     })}
                </div>
            </div>
            <Controls startGame={startGame} drawCard={drawCard} /> 
            {/* <Dealer />
             <Hand />
             <Player /> */}
             <div></div>


             {/* 
                **BENS RECOMMENDED FORMAT**
               <div>
                    <Hand owner="dealer" />
                    <Hand owner="player" />
                    <div>
                        Your total is {player's hand total}
                    </div>
                    
                    <Controls 
                        onDrawCardClick={drawCard}
                        onStandClick={stand}
                    />
                    {if game is over, show 'play again' button}
               </div>
             
             */}
        </div>
       
        
    )
};

export default GameBoard;
