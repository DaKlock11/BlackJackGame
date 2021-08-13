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
    const [playerCount, setPlayerCount] = useState(0);
    const [dealersHand, setDealersHand] = useState([]);
    const [dealerCount, setDealerCount] = useState(0);
    const [remainingCards, setRemainingCards] = useState(51);
    const [gameStarted, setGameStarted] = useState(false);
    const [isError, setError] = useState(false);

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

                setPlayersHand([...playersHand, {
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

    function ReturnValue(value) {
        const cardValues = {
            ACE: 11,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            10: 10,
            JACK: 10,
            QUEEN: 10,
            KING: 10,
        };
        return cardValues[value];
    }
    /*
    const startGame = (() => {
        fetch(`${DECK_OF_CARDS_API_ENDPOINT}/new/shuffle/?deck_count=1`)
        .then((resp) => resp.json())
        .then((body) => {
            setDeckId([body.deck_id]);
        })
    }, []);
    //console.log(startGame);
    */

    //BELOW ARE THE BUTTON EVENTS AND CARD DEAL EVENTS FOR PLAYER AND DEALER
    const hit = (() => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then((resp) => resp.json())
        .then((data) => {
           const card = data.cards[0];

           setPlayersHand([...playersHand, {
               code: card.code,
               image: card.image,
               value: card.value,
               suit: card.suit
           }])
        })
    }, [deckId, remainingCards]);
    
    function DealHand() {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
        .then((res) => res.json())
        .then((json) => {
            console.log(json);
        })

        const value0= ReturnValue(json.cards[0].value);
        const value1= ReturnValue(json.cards[1].value);
        const value2= ReturnValue(json.cards[2].value);
        const value3= ReturnValue(json.cards[3].value);

        if (value0 === 11 && value2 === 11) {
            setGameStarted(true);
            setPlayersHand([...playersHand, json.cards[0], json.cards[2]]);
            setPlayerCount(12);
            setDealersHand([...dealersHand], json.cards[1], json.cards[3]);
            setDealerCount(dealerCount + value1 + value3);
        } else if(value0 === 11 || value2 === 11) {
            setGameStarted(true);
            setPlayersHand([...playersHand, json.cards[0], json.cards[2]]);
            setPlayerCount(playerCount + value0 + value2);
            setDealersHand([...dealersHand], json.cards[1], json.cards[3]);
            setDealerCount(dealerCount + value1 + value3);
        }
    }

    return (
        <div className="gameboard">
            {/*<div>{JSON.stringify(deckId, null, 4)}</div>*/}
            <div>
                <button onClick={drawCard}>Click Me</button>
                <div style={{ display: "flex", width: "5vw"}}>
                    {playersHand.map( card => {
                        return <img src={card.image} key={card.code} />;
                    })}
                </div>
            </div>
            <Hand
            owner="dealer"
            cards={dealersHand}
            drawCard={drawCard}
            />
            <div>
                Dealer Total: 
            </div>
            <Controls
            //startGame={startGame}
            onDrawCardClick={drawCard}
            hit={hit}
            //stay={stay}
            /> 
            <Hand 
            owner="player"
            cards={playersHand}
            drawCard={drawCard}
            />
            <div>
                Player Total: 
            </div>

            {/* <Dealer />
             <Hand />
             <Player /> */}
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
