import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createDeck, shuffleDeck, takeCards } from "@/utils/deckUtils";
import { handTotal } from "@/utils/handEvaluator";
import type { BlackjackState } from "./blackjackTypes";
import { RootState } from "../../store/store";

const initialState: BlackjackState = {
    deck: [],
    player: { hand: [], total: 0, busted: false, blackjack: false },
    dealer: { hand: [], total: 0, hidden: null },
    phase: "idle",
    result: undefined,

};

export const dealerTurn = createAsyncThunk<
    void,
    void,
    { state: RootState }
>(
    "blackjack/dealerTurn",
    async (_, { getState, dispatch }) => {
        let state = getState().blackjack;

        dispatch(blackjackSlice.actions.revealDealerCard());
        await new Promise((r) => setTimeout(r, 1000));

        while (state.dealer.total < 17) {
            const { taken, newDeck } = takeCards(state.deck, 1, "dealerVisible");
            dispatch(blackjackSlice.actions.dealerTakeCard({ taken, newDeck }));
            state = getState().blackjack;

            await new Promise((r) => setTimeout(r, 1000));
        }

        dispatch(blackjackSlice.actions.finishRound());
    }
);




const blackjackSlice = createSlice({
    name: "blackjack",
    initialState,
    reducers: {
        startGame(state) {

            // Only Create new deck if there isn't enough for an other round
            if (state.deck.length < 4) {
                state.deck = shuffleDeck(createDeck());
            }

            // Deal player 2 cards
            const { taken: playerCards, newDeck } = takeCards(state.deck, 2, "player");
            state.deck = newDeck;
            state.player.hand = playerCards;
            state.player.total = handTotal(playerCards);
            state.player.busted = false;
            state.player.blackjack = false;
            state.phase = "playerTurn";
            state.result = undefined;

            // Deal dealer 2 cards (one hidden)
            const { taken: dealerCards, newDeck: deckAfterDealer } = takeCards(state.deck, 2);
            dealerCards[0].state = "dealerVisible";
            dealerCards[1].state = "dealerHidden";
            state.dealer.hand = dealerCards;
            state.deck = deckAfterDealer;
            state.dealer.total = handTotal([dealerCards[0]]); // only visible card

            // Check for Blackjack
            if (state.player.total === 21) {
                state.player.blackjack = state.player.total === 21;
                state.phase = "result";
                state.result = "win";
            }

        },

        playerHit(state) {
            if (state.phase !== "playerTurn") return;
            const { taken, newDeck } = takeCards(state.deck, 1, "player");
            state.player.hand.push(...taken);
            state.player.total = handTotal(state.player.hand);
            state.deck = newDeck;

            // Check for Blackjack
            if (state.player.total === 21) {
                state.player.blackjack = state.player.total === 21;
                state.phase = "result";
                state.result = "win";
            }
            // Check for Bust
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

        revealDealerCard(state) {
            state.dealer.hand = state.dealer.hand.map((c) =>
                c.state === "dealerHidden" ? { ...c, state: "dealerVisible" } : c
            );
            state.dealer.total = handTotal(state.dealer.hand);
        },

        dealerTakeCard(state, action) {
            const { taken, newDeck } = action.payload;
            state.dealer.hand.push(...taken);
            state.deck = newDeck;
            state.dealer.total = handTotal(state.dealer.hand);
        },

        finishRound(state) {
            state.phase = "result";

            if (state.player.busted) state.result = "lose";
            else if (state.dealer.total > 21) state.result = "win";
            else if (state.player.total > state.dealer.total) state.result = "win";
            else if (state.player.total < state.dealer.total) state.result = "lose";
        },

    },
});

export const { startGame, playerHit, playerStand } = blackjackSlice.actions;
export default blackjackSlice.reducer;
