import React, { useEffect, useState } from 'react';
import Hand from '../hand';
import Dealer from '../dealer';
import Controls from '../controls';
import './GameBoard.css';

const DECK_OF_CARDS_API_ENDPOINT = 'https://deckofcardsapi.com/api/deck/new/';

const GameBoard = () => {
    
    const [apiState, setApiState] = useState(null);
    const [deckId, setDeckId] = useState('');
    const [cardState, setCardState] = useState({ cards: [] });
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [playersScore, setPlayersScore] = useState(0);
    const [dealersScore, setDealersScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [playerPlaying, setPlayerPlaying] = useState(false);

    useEffect(() => {
        fetch(DECK_OF_CARDS_API_ENDPOINT).then(resp => {
            return resp.json();
        }).then( json => {
            setApiState(json);
        }).then( json => {
            setDeckId({
                deckId: json.deck_id
            });
        })
    }, []);

    
    useEffect(() => {

    })
    
    DrawCard = () => {
        useEffect(() => {
            async function getCard() {
                const resp = await fetch(
                    "https://deckofcardsapi.com/api/deck/{setDeckId}/draw/?count=2"
                );
                const data = await resp.json();
                setCardState(data);
                console.log(data);
            }
            getCard();
        }, []);
    }

    return (
        <div className="gameboard">
             <div>{JSON.stringify(apiState, null, 4)}</div>
             <Dealer />
             <Hand cardState={cardState}/>
             <Controls onChildClick={DrawCard}/>
        </div>
       
        
    )
};

export default GameBoard;
