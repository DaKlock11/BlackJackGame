import React, { useEffect, useState, useCallback, useReducer } from 'react';
import Hand from '../hand';
import Dealer from '../dealer';
import Controls from '../controls';
//import Player from '../Player';
//import { getCardValue } from '../util';
import './GameBoard.css';

const DECK_OF_CARDS_API_ENDPOINT = 'https://deckofcardsapi.com/api/deck/new/shuffle';

//Functions to convert default API obj values => game values **returnValue & convertCard**
const returnValue = (value) => {
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
        "KING": 10
    };
    return cardValues[value];
};

const convertCard = (card) => {
    const copy = { ...card };
    const value = returnValue(copy.value[0]);
    const newCard = {
        code: copy.code,
        suit: copy.suit,
        image: copy.image,
        value
    };
  return newCard;
};


    const initialState = {
        cardDeck: {},
        playersHand: [],
        playerCount: 0,
        dealersHand: [],
        dealerCount: 0,
        remainingCards: 52,
        gameStarted: false,
        playerWin: false,
        dealerWin: false,
        isError: false
    };

    const Reducer = (state, action) => {
        switch(action.type) {
            case "UPDATE_PLAYERS_HAND":
                return {
                    ...state,
                    playersHand: [...action.hand] // Note action.hand
                }
            case 'UPDATE_GAMESTARTED':
                return {
                    ...state,
                    gameStarted: action.value
                }
            case 'UPDATE_PLAYERCOUNT':
                return {
                    ...state,
                    playerCount: action.number
                }
            case 'UPDATE_DEALER_HAND': 
                return {
                    ...state,
                    dealersHand: [...action.hand]
                };            
            case 'UPDATE_DEALERCOUNT': 
                return {
                    ...state,
                    dealerCount: action.number
                };
            case 'UPDATE_REMAINING_CARDS': 
                return {
                    ...state,
                    remainingCards: action.number
                }
            case 'UPDATE_PLAYER_WIN':
                return {
                    ...state,
                    playerWin: action.value
                }
            case 'UPDATE_DEALER_WIN':
                return {
                    ...state,
                    dealerWin: action.value
                }
            case 'UPDATE_WINNER':
                return {
                    ...state,
                    winner: action.value
                }
            case 'RESET_GAME': {
                return {
                    ...initialState,
                    playersHand: [],
                    playerCount: 0,
                    dealersHand: [],
                    dealerCount: 0,
                    remainingCards: 52,
                    gameStarted: false,
                    playerWin: false,
                    dealerWin: false,
                    winner: "",
                    isError: false
                };
            }
            
            default: 
                return state;
        }   
    }


// LESSON HOMEWORK FOR 9/5 - remove ALL uses of useState()
//                          - Fix ResetGame rendering issue
//                          - Clean up commented / dead code

const GameBoard = () => {
    

    const [state, dispatch] = useReducer(Reducer, initialState);

    const [cardDeck, setCardDeck] = useState({
        id: {},
        remaining: 52,
        shuffled: false
    });
    
    const [isError, setError] = useState(false);

    useEffect(() => {
            fetch(DECK_OF_CARDS_API_ENDPOINT)
            .then((res) => res.json())
            .then((data) => {
            setCardDeck({
                id: data.deck_id,
                remaining: data.remaining,
                shuffled: data.shuffled
            });
        })
    }, []);
    
  
    //BELOW ARE THE BUTTON EVENTS AND CARD DEAL EVENTS FOR PLAYER AND DEALER
    const ResetGame = () => {

        dispatch({ type: 'RESET_GAME' });
        // dispatch({ type: 'UPDATE_GAMESTARTED', value: false });
        // dispatch({ type: 'UPDATE_PLAYERCOUNT', number: 0});
        // dispatch({type: 'UPDATE_PLAYER_HAND', hand: [] });
        // setDealerCount(0);
        // setDealersHand([]);
        // setRemainingCards(52);
        // setCardDeck({});
    }
    //WHEN PLAYER HITS 'START'
    const DealHand = () => {
        const url = `https://deckofcardsapi.com/api/deck/${cardDeck.id}/draw/?count=3`;
        fetch(url)
        .then(res => res.json()).then((data) => {
            let newCardZero = data.cards[0];
            let newCardOne = data.cards[1];
            let newCardTwo = data.cards[2];

            if (cardDeck.remaining > 0) {
                dispatch({ type: 'UPDATE_PLAYERS_HAND', hand: [...state.playersHand, newCardZero, newCardTwo]});
                dispatch({ type: 'UPDATE_DEALER_HAND', hand: [...state.dealersHand, newCardOne]});
                //setDealersHand([...dealersHand, newCardOne]);
                const valueZero = returnValue(data.cards[0].value);
                const valueOne = returnValue(data.cards[1].value);
                const valueTwo = returnValue(data.cards[2].value);
                dispatch({ type: 'UPDATE_PLAYERCOUNT', number: state.playerCount + valueZero + valueTwo});
                dispatch({type: 'UPDATE_DEALERCOUNT', number: state.dealerCount + valueOne});
                //setDealerCount(dealerCount + valueOne);
            }
            dispatch({ type: 'UPDATE_GAMESTARTED', value: true });
            dispatch({ type: 'UPDATE_REMAINING_CARDS', number: state.remainingCards - 3});
            //setRemainingCards(remainingCards - 3);
        })
    }
    // WHEN PLAYER 'HITS'
    const Hit = () => {
        const drawOne = `https://deckofcardsapi.com/api/deck/${cardDeck.id}/draw/?count=1`;
        fetch(drawOne)
        .then((resp) => resp.json())
        .then((data) => {
            const card = data.cards[0];
            dispatch({type: 'UPDATE_PLAYERS_HAND', hand: [...state.playersHand, card]});
            const value = returnValue(data.cards[0].value);
            dispatch({type: 'UPDATE_PLAYERCOUNT', number: state.playerCount + value});
            dispatch({type: 'UPDATE_REMAINING_CARDS', number: state.remainingCards - 1});
            //setRemainingCards(remainingCards - 1);
        })
        if(state.playerCount === 21) {
            dispatch({type: 'UPDATE_PLAYER_WIN', value: true});
        }
        if(state.playerCount > 21) {
            dispatch({type: 'UPDATE_DEALER_WIN', value: true});
        }
    }
    //WHEN PLAYER CLICKS 'STAND'
    const Stand = () => {
        if(state.dealerCount < 17) {
            const draw = `https://deckofcardsapi.com/api/deck/${cardDeck.id}/draw/?count=1`;
            fetch(draw)
            .then(res => res.json())
            .then((data) => {
                const card = data.cards[0];
                dispatch({type: 'UPDATE_DEALER_HAND', hand: [...state.dealersHand, card]});
                const value = returnValue(data.cards[0].value);
                dispatch({type: 'UPDATE_DEALERCOUNT', number: state.dealerCount + value});
                dispatch({type: 'UPDATE_REMAINING_CARDS', number: state.remainingCards - 1});
            })
        }
    }

    return !state.gameStarted ? (
        <div>
            <h1>Ready to Play?</h1>
            <button onClick={DealHand}>Let's Play!</button>
        </div>
    ) : 
     (
        <div className="gameboard">
            <Dealer
            hand={state.dealersHand}
            />
            <div className="card-score">
                Dealer Score: {state.dealerCount}
            </div>
            <Controls
            Hit={Hit}
            Stand={Stand}
            reset={ResetGame}
            /> 
            <Hand 
            owner="player"
            playHand={state.playersHand}
            />
            <div className="card-score">
                Player Score: {state.playerCount}
            </div>
        </div>     
    )
};

export default GameBoard;



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
            // useEffect(() => {
    //     if (deckId !== null) {
    //         fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    //         .then(res => res.json())
    //         .then((data) => {
    //             const card = data.cards[0];
    //             console.log(card);

    //             setPlayersHand([...playersHand, {
    //                 code: card.code,
    //                 image: card.image,
    //                 value: card.value,
    //                 suit: card.suit
    //             }])
    //         })
    //     }
    // }, [deckId, remainingCards]);


/*
const Reducer = (state, action) => {
    switch (action.type) {
        case 'DRAW_CARD': {
            // Return a new state value depending on the values passed
            // in from action
            if (action.owner === 'player') {
                return {
                    ...state,
                    playersHand: [...state.playersHand, card]
                };
            }
            
        }

        default: {
            return state;
        }
    }
}
*/
// useReducer requires the following:
    // Actions
    // reducer function (big switch case)

    // state - This is what useReducer will do!
    /*
    initialState
        {
            apiState: null,
            deckId: null,
            playerHand: [],
            playerCount: 0,
            dealersHand: [],
            dealerCount: 0
        }
    */
   //const [state, dispatch ] = useReducer(initialState, Reducer);
    //dispatch({ type: 'DRAW_CARD', card: convertCard(someCard), owner: 'player'} )

    //const [playerCount, setPlayerCount] = useState(0);
    //const [dealersHand, setDealersHand] = useState([]);
    //const [dealerCount, setDealerCount] = useState(0);
    //const [remainingCards, setRemainingCards] = useState(52);