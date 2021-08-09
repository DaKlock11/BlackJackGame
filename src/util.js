/**
 * Returns the number value of a card
 * @param {} card - The card to get the number value for
 * @returns The card's value
 */
export const getCardValue = (card) => {
    const numberValue = parseInt(card.value, 10);

    if (isNaN(numberValue)) {
        if (card.value === 'ACE') {
            // Tricky logic to determine 1 or 11
            return 1;
        }
        
        return 10;
    }

    return numberValue;
};
