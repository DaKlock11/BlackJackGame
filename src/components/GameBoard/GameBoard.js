import React, { useEffect, useState } from 'react';
import Hand from '../hand';
import Dealer from '../dealer';
import Controls from '../controls';
import './GameBoard.css';

const DECK_OF_CARDS_API_ENDPOINT = 'https://deckofcardsapi.com/api/deck/new/';
const DECK_OF_CARDS_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

const GameBoard = () => {
    
    const [apiState, setApiState] = useState(null);
    const [deckId, setDeckId] = useState(null);
    const [playersHand, setPlayersHand] = useState([]);
    const [dealersHand, setDealersHand] = useState([]);
    const [playersScore, setPlayersScore] = useState(0);
    const [dealersScore, setDealersScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [playerPlaying, setPlayerPlaying] = useState(false);

    useEffect(() => {
        fetch(DECK_OF_CARDS_API_ENDPOINT).then(resp => {
            return resp.json();
        }).then( json => {
            setApiState(json);
        })/*.then( json => {
            setDeckId({
                deckId: json.deck_id
            });
        })*/
    }, []);

    useEffect(() => {
        const deck_id = fetch(DECK_OF_CARDS_URL)
        .then(resp => resp.data.deck_id);
        setDeckId(deck_id);
    }, []);


    const handleStartGame = () => {
        const playersDrawnCards = fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`).then(resp => resp.data.cards);
        playersHand.push(playersDrawnCards);
        setPlayersHand(playersHand);

        const dealersDrawnCards = fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`).then(resp => resp.data.cards);
        dealersHand.push(dealersDrawnCards);
        setDealersHand(dealersHand);
    }
    
    const drawCard = () => {
        const playerCardDrawn = fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`).then(resp => resp.data.cards);
        playersHand.push(playerCardDrawn)
        setPlayersHand(playersHand);
    }
    
    

    return (
        <div className="gameboard">
             <div>{JSON.stringify(apiState, null, 4)}</div>
             <Dealer />
             <Hand drawCard={drawCard} handleStartGame={handleStartGame} items={playersHand}/>
             <Controls handleStartGame={handleStartGame} drawCard={drawCard}/>
        </div>
       
        
    )
};

export default GameBoard;
