import type { Card, CardState } from "@/features/blackjack/blackjackTypes";

const SUITS = ["♠", "♥", "♦", "♣"];
const VALUES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export function createDeck(): Card[] {
    return SUITS.flatMap((s) =>
        VALUES.map((v) => ({
            value: v,
            suit: s,
            state: "deck" as CardState,
        }))
    );
}

export function shuffleDeck(deck: Card[]): Card[] {
    const arr = [...deck];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function takeCards(deck: Card[], count: number, state: CardState = "deck") {
    const taken = deck.slice(0, count).map((c) => ({ ...c, state }));
    const newDeck = deck.slice(count);
    return { taken, newDeck };
}
