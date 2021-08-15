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
    const [remainingCards, setRemainingCards] = useState(52);
    const [gameStarted, setGameStarted] = useState(false);
    const [isError, setError] = useState(false);

    useEffect(() => {
        fetch(DECK_OF_CARDS_API_ENDPOINT)
        .then((res) => res.json())
        .then((data) => {
            setDeckId(data.deck_id);
            setRemainingCards(data.remaining);
        })
    }, []);
    /*
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
    */


    //Function to convert default API obj values => game values
    function returnValue(value) {
        const cardValues = {
            "ACE": 11,
            "2": 2,
            "3": 3,
            "4": 4,
            "5": 5,
            "6": 6,
            "7": 7,
            "8": 8,
            "9": 9,
            "10": 10,
            "JACK": 10,
            "QUEEN": 10,
            "KING": 10,
        };
        return cardValues[value];
    }
  
    //BELOW ARE THE BUTTON EVENTS AND CARD DEAL EVENTS FOR PLAYER AND DEALER
    const RestGame = () => {

    }
    //WHEN PLAYER HITS 'START'
    function DealHand() {
        const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`;
        let res = fetch(url).then(res => res.json()).then((data) => {
            const newCard = data.cards[0];
            const newCardOne = data.cards[1];
            const newCardTwo = data.cards[2];

            let dealt = [...playersHand];
            let dealerDealt = [...dealersHand];
            setPlayersHand([...playersHand, {
                code: card.code,
                suit: card.suit,
                image: card.image,
                value: card.value
            }])
            setDealersHand([...dealersHand, {
                code: card.code,
                suit: card.suit,
                image: card.image,
                value: card.value
            }])
            dealt.push(newCard);
            dealerDealt.push(newCardOne);
            dealt.push(newCardTwo);

            setGameStarted(true);

            const value0 = returnValue(data.cards[0].value);
            const value1 = returnValue(res.cards[1].value);
            const value2 = returnValue(res.cards[2].value);

            if (value0 === 11 && value2 === 11) {
            setGameStarted(true);
            setPlayersHand([...playersHand, res.cards[0], res.cards[2]]);
            setPlayerCount(12);
            setDealersHand([...dealersHand], res.cards[1]);
            setDealerCount(dealerCount + value1);
            } else if(value0 === 11 || value2 === 11) {
            setGameStarted(true);
            setPlayersHand([...playersHand, res.cards[0], res.cards[2]]);
            setPlayerCount(playerCount + value0 + value2);
            setDealersHand([...dealersHand], res.cards[1]);
            setDealerCount(dealerCount + value1);
            } else if(value0 === value2) {
            setGameStarted(true);
            setPlayersHand([...playersHand, res.cards[0], res.cards[2]]);
            setPlayerCount(playerCount + value0 + value2);
            setDealersHand([...dealersHand], res.cards[1]);
            setDealerCount(dealerCount + value1);
            } else {
            setGameStarted(true);
            setPlayersHand([...playersHand, res.cards[0], res.cards[2]]);
            setPlayerCount(playerCount + value0 + value2);
            setDealersHand([...dealersHand], res.cards[1]);
            setDealerCount(dealerCount + value1);
            };
        })

        // THIS IS THE CONVERSION FUNCTION CREATED ABOVE BEING USED TO SET AND CHECK THE VALUES OF THE INITIALLY DEALT CARDS
        
    }
    // WHEN PLAYER 'HITS'
    const hit = () => {
        const drawOne = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
        fetch(drawOne)
        .then((resp) => resp.json())
        .then((data) => {
           const card = data.cards[0];
           setPlayersHand(...playersHand => [...playersHand, card]);
           const value = returnValue(data.cards[0].value);
           setPlayerCount(playerCount + value);
        })
    }
    
    

    return (
        <div className="gameboard">
            {/*<div>{JSON.stringify(deckId, null, 4)}</div>*/}
            {/*
            <div>
                <button onClick={drawCard}>Click Me</button>
                <div>{remainingCards}</div>
                <div style={{ display: "flex", width: "5vw"}}>
                    {playersHand.map( card => {
                        return <img src={card.image} key={card.code} />;
                    })}
                </div>
            </div>
            */}
            <Dealer
            dealersHand={dealersHand}
            />
            <div>
                Dealer Total: {dealerCount}
            </div>
            <Controls
            hit={hit()}
            DealHand={DealHand()}
            //stay={stay}
            /> 
            <Hand 
            owner="player"
            playersHand={playersHand}
            />
            <div>
                Player Total: {playerCount}
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
