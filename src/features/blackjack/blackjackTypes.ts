export type CardState = "deck" | "player" | "dealerVisible" | "dealerHidden";

export type Card = {
    value?: string;
    suit?: string;
    state: CardState;
};


export interface Player {
    hand: Card[];
    total: number;
    busted: boolean;
    blackjack: boolean;
}

export interface Dealer {
    hand: Card[];
    total: number;
    hidden: Card | null; // dealer’s hidden card
}

export interface BlackjackState {
    deck: Card[];
    player: Player;
    dealer: Dealer;
    phase: "idle" | "playerTurn" | "dealerTurn" | "result";
    result: "win" | "lose" | "draw" | null;
}
