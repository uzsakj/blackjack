import { createSlice } from "@reduxjs/toolkit";
import { createDeck, shuffleDeck, takeCards } from "@/utils/deckUtils";
import { handTotal } from "@/utils/handEvaluator";
import type { BlackjackState } from "./blackjackTypes";

const initialState: BlackjackState = {
    deck: [],
    player: { hand: [], total: 0, busted: false, blackjack: false },
    dealer: { hand: [], total: 0, hidden: null },
    phase: "idle",
    result: null,
};

const blackjackSlice = createSlice({
    name: "blackjack",
    initialState,
    reducers: {
        startGame(state) {
            state.deck = shuffleDeck(createDeck());

            // Deal player 2 cards
            const { taken: playerCards, newDeck } = takeCards(state.deck, 2, "player");
            state.deck = newDeck;
            state.player.hand = playerCards;
            state.player.total = handTotal(playerCards);
            state.player.busted = false;
            state.player.blackjack = state.player.total === 21;

            // Deal dealer 2 cards (one hidden)
            const { taken: dealerCards, newDeck: deckAfterDealer } = takeCards(state.deck, 2);
            dealerCards[0].state = "dealerVisible";
            dealerCards[1].state = "dealerHidden";
            state.dealer.hand = dealerCards;
            state.deck = deckAfterDealer;
            state.dealer.total = handTotal([dealerCards[0]]); // only visible card

            state.phase = "playerTurn";
            state.result = null;
        },

        playerHit(state) {
            if (state.phase !== "playerTurn") return;
            const { taken, newDeck } = takeCards(state.deck, 1, "player");
            state.player.hand.push(...taken);
            state.player.total = handTotal(state.player.hand);
            state.deck = newDeck;

            if (state.player.total > 21) {
                state.player.busted = true;
                state.phase = "result";
                state.result = "lose";
            }
        },

        playerStand(state) {
            if (state.phase !== "playerTurn") return;
            state.phase = "dealerTurn";
        },

        dealerTurn(state) {
            if (state.phase !== "dealerTurn") return;

            // Reveal hidden card
            state.dealer.hand = state.dealer.hand.map((c) =>
                c.state === "dealerHidden" ? { ...c, state: "dealerVisible" } : c
            );

            state.dealer.total = handTotal(state.dealer.hand);

            // Dealer hits until total >= 17
            while (state.dealer.total < 17) {
                const { taken, newDeck } = takeCards(state.deck, 1, "dealerVisible");
                state.dealer.hand.push(...taken);
                state.deck = newDeck;
                state.dealer.total = handTotal(state.dealer.hand);
            }

            state.phase = "result";

            // Determine result
            if (state.player.busted) state.result = "lose";
            else if (state.dealer.total > 21) state.result = "win";
            else if (state.player.total > state.dealer.total) state.result = "win";
            else if (state.player.total < state.dealer.total) state.result = "lose";
            else state.result = "draw";
        },
    },
});

export const { startGame, playerHit, playerStand, dealerTurn } = blackjackSlice.actions;
export default blackjackSlice.reducer;
