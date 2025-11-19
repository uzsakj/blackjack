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

export function cubicBezier(p0: { x: number, y: number }, p1: { x: number, y: number }, p2: { x: number, y: number }, p3: { x: number, y: number }, t: number) {
    const x =
        Math.pow(1 - t, 3) * p0.x +
        3 * Math.pow(1 - t, 2) * t * p1.x +
        3 * (1 - t) * Math.pow(t, 2) * p2.x +
        Math.pow(t, 3) * p3.x;

    const y =
        Math.pow(1 - t, 3) * p0.y +
        3 * Math.pow(1 - t, 2) * t * p1.y +
        3 * (1 - t) * Math.pow(t, 2) * p2.y +
        Math.pow(t, 3) * p3.y;

    return { x, y };
}
