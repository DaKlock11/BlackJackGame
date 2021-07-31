import React, { useEffect, useState, useCallback } from 'react';
import Hand from '../hand';
import Dealer from '../dealer';
import Controls from '../controls';
import Player from '../Player';
import './GameBoard.css';

const DECK_OF_CARDS_API_ENDPOINT = 'https://deckofcardsapi.com/api/deck/new/';
const DECK_OF_CARDS_URL = 'https://deckofcardsapi.com/api/deck';


const deckofCards = 'https://deckofcardsapi.com/api/deck/new/';


/*
const initialPlayerState = {
    id: 1,
    cards: [],
    points: 0,
    draws: 0,
    lost: false,
    bot: false,
};

export const changeValue = (obj) => {
    let newObj = {};
  
    switch (obj.value) {
      case "JACK":
        newObj = { ...obj, value: 2 };
        break;
      case "QUEEN":
        newObj = { ...obj, value: 3 };
        break;
      case "KING":
        newObj = { ...obj, value: 4 };
        break;
      case "ACE":
        newObj = { ...obj, value: 11 };
        break;
      default:
        newObj = obj;
    }
  
    return newObj;
  };

*/




const GameBoard = () => {
    
    const [apiState, setApiState] = useState(null);
    const [deckId, setDeckId] = useState("");
    const [playersHand, setPlayersHand] = useState([]);
    const [dealersHand, setDealersHand] = useState([]);
    const [hand, setHand] = useState([]);

    const [deckApi, setDeckApi] = useState(null);
    const [cardImg, setCardImg] = useState([]);
    
    
    useEffect(() => {
        fetch(deckofCards)
        .then(response => {
            return response.json();
        }).then((json) => {
            setDeckApi(json.deck_id);
        })
    }, []);

    /*
    useEffect(() => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckApi}/draw/?count=2`)
        .then(res => res.json())
        .then( data => {
            setCardImg({
                user: data.response.image[0],
            });
        });
    }, []);

    const ButtonClick = ({cardImg}) => {
        setPlayersHand(cardImg.cards.value[0]);
    }

    */

    /*
    useEffect(() => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckApi}/draw/?count=2`)
        .then((res) => {
            return res.text();
        })
        .then((data) => {
            setCardImg({ cardImg: JSON.parse(data.image)})
        })
    }, []);
    
    const SetTheHand = () => {
        let drawResponse = fetch(`https://deckofcardsapi.com/api/deck/${deckApi}/draw/?count=1`)
        .then(drawResponse => drawResponse.json())
        .then((data) => {
            const currentHand = data.cards;
        })
    };

    function setHand( st => ({
        cards: [...st.currentHand, {
            id: currentHand.code,
            name: `${currentHand.suit} ${currentHand.value}`,
            image: currentHand.image,
        }]
    }))

    */ 
    // **** LEFT OFF HERE, Try to figure out how to deconstruct the api to find body and cards and ultimately the suit/cardimg/etc ***** //




    /* 
   
    const [cardImg, setCardImg] = useState();
    const [gameStarted, setGameStarted] = useState(false);
    const [playerPlaying, setPlayerPlaying] = useState({ ...initialPlayerState });
    const [isError, setError] = useState(false);

    // (ABOVE) NOT REQUIRED YET

    const [playersScore, setPlayersScore] = useState(0);
    const [dealersScore, setDealersScore] = useState(0);

    */

    useEffect(() => {
        fetch(DECK_OF_CARDS_API_ENDPOINT).then(resp => {
            return resp.json();
        }).then( json => {
            setApiState(json);
        })
    }, []);

    const startAPIGame = () => {
        setPlayersHand(apiState.body.cards);
    };

    const startGame = (() => {
        fetch(`${DECK_OF_CARDS_URL}/new/shuffle/?deck_count=1`)
        .then((resp) => resp.json())
        .then((body) => {
            setDeckId(body.deck_id);
        })
    });
    console.log(startGame);


    //SET DECK ID
    /*
    useEffect(() => {
        fetch(DECK_OF_CARDS_URL).then(res => {
            return res.json();
        }).then( json => {
            setDeckId(json.data.deck_id);
        })
    }, []);

    

    //GET CARD FROM DECK
    useEffect(() => {
        //async function drawCardImg() {
            fetch(DECK_OF_CARDS_URL.cards)
            .then(resp => {setPlayersHand(`${resp.data.cards[0].value} of ${resp.data.cards[0].suit}`)})
            .then((res) => {setCardImg(resp.data.cards[0].image)});  
        //}
        //drawCardImg();
    }, [setPlayersHand, setCardImg]);
    */
    /*
    const handleStartGame = () => {
        const playersDrawnCards = fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`).then((resp) => resp.data.cards);
        playersHand.push(playersDrawnCards);
        setPlayersHand(playersHand);

        const dealersDrawnCards = fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`).then((resp) => resp.data.cards);
        dealersHand.push(dealersDrawnCards);
        setDealersHand(dealersHand);
    }
    
    //DRAW CARDS*****
    const drawCards = (() => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then((resp) => resp.json())
        .then((body) => {
            const setPlayersHand = body.cards;
            const currentPoints = playersHand
            //.map((e) => changeValue(e))
            .map((e) => parseInt(e.value))
            .reduce((total, curr) => {
                return (total *= curr);
            }, 0);

        })
        
    }, 
    [playersHand]
    );
    */
    //UPDATE PLAYER*******
    /*
    const updatePlayer = (player, draw, points) => {
        setCurrentPlayer({
            ...player,
            cards: [...player.cards, ...draw],
            points: player.points + parseInt(points),
            draws: player.draws + 1,
        });
    };

    const updatePlayers = useCallback((arr, obj) => {
        const arrayTemp = [...arr];
        const objectIndex = arrayTemp.findIndex((e) => e.id === obj.id);

        arrayTemp[objectIndex] = {...obj };

        setPlayers([...arrayTemp]);
    }, []);
    */


    /*
    const drawCard = () => {
        const playerCardDrawn = fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`).then(resp => resp.data.cards);
        playersHand.push(playerCardDrawn)
        setPlayersHand(playersHand);
    }
    */
    

    return (
        <div className="gameboard">
             <div>{JSON.stringify(apiState, null, 4)}</div>
             <Dealer />
             <Hand />
             <Controls />
             <Player startAPIGame={startAPIGame} />
             <div>{JSON.stringify(deckApi, null, 6)}</div>
        </div>
       
        
    )
};

export default GameBoard;
