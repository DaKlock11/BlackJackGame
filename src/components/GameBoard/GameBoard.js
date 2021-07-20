import React, { useEffect, useState } from 'react';
import Hand from '../hand';
import Dealer from '../dealer';
import Controls from '../controls';
import './GameBoard.css';

const DECK_OF_CARDS_API_ENDPOINT = 'https://deckofcardsapi.com/api/deck/new/';

const GameBoard = () => {
    
    const [apiState, setApiState] = useState(null);
    useEffect(() => {
        fetch(DECK_OF_CARDS_API_ENDPOINT).then(resp => {
            return resp.json();
        }).then( json => {
            setApiState(json);
        })
    }, []);

    return (
        <div className="gameboard">
             <div>{JSON.stringify(apiState, null, 4)}</div>
             <Dealer />
             <Hand />
             <Controls />
        </div>
       
        
    )
};

export default GameBoard;
