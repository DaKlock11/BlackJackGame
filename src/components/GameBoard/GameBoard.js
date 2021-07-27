import React, { useEffect, useState, useCallback } from 'react';
import Hand from '../hand';
import Dealer from '../dealer';
import Controls from '../controls';
import './GameBoard.css';

const DECK_OF_CARDS_API_ENDPOINT = 'https://deckofcardsapi.com/api/deck/new/';
const DECK_OF_CARDS_URL = 'https://deckofcardsapi.com/api/deck';

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

const GameBoard = () => {
    
    const [apiState, setApiState] = useState(null);
    const [deckId, setDeckId] = useState("");
    const [playersHand, setPlayersHand] = useState([]);
    const [dealersHand, setDealersHand] = useState([]);
    const [playerNum, setPlayerNum] = useState(1);

   // const [cardImg, setCardImg] = useState();
    const [gameStarted, setGameStarted] = useState(false);
   // const [playerPlaying, setPlayerPlaying] = useState({ ...initialPlayerState });
    const [isError, setError] = useState(false);
   // const [playersScore, setPlayersScore] = useState(0);
   // const [dealersScore, setDealersScore] = useState(0);

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

    const startGame = () => {
        fetch(`${DECK_OF_CARDS_URL}/new/shuffle/?deck_count=1`)
        .then((resp) => resp.json())
        .then((data) => {
            setError(false);
            setDeckId(data.deck_id);
        })
        .catch((error) => {
            console.error("error:", error);
            setError(true);
            setGameStarted("initial");
        })
    }

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

    const handleStartGame = () => {
        const playersDrawnCards = fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`).then((resp) => resp.data.cards);
        playersHand.push(playersDrawnCards);
        setPlayersHand(playersHand);

        const dealersDrawnCards = fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`).then((resp) => resp.data.cards);
        dealersHand.push(dealersDrawnCards);
        setDealersHand(dealersHand);
    }
    
    //DRAW CARDS*****
    const drawCards = useCallback((player, num) => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${num}`)
        .then((resp) => resp.json())
        .then((data) => {
            const currentDraw = data.cards;
            const currentPoints = currentDraw
            .map((e) => changeValue(e))
            .map((e) => parseInt(e.value))
            .reduce((total, curr) => {
                return (total *= curr);
            }, 0);

           // updatePlayer(player, currentDraw, currentPoints);
        })
        .catch((error) => {
            console.error("error:", error);
            setError(true);
            //resetGame();
        });
    }, 
    [deckId]
    );

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
             <Hand drawCards={(num) => drawCards(num)} playersHand={playersHand} handleStartGame={handleStartGame} />
             <Controls handleStartGame={handleStartGame} startGame={startGame} drawCards={drawCards}/>
        </div>
       
        
    )
};

export default GameBoard;
