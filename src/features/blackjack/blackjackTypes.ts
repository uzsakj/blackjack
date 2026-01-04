export type CardState = "deck" | "player" | "dealerVisible" | "dealerHidden";
export type Suit = "♠" | "♥" | "♦" | "♣";;

export type Card = {
    value: string;
    suit: Suit;
    state: CardState;
};

export interface PlayerState {
    hand: Card[];
    total: number;
    blackjack: boolean;
    busted: boolean;
}


export interface DealerState {
    hand: Card[];
    total: number;
    hidden: Card | null; // dealer’s hidden card
}

export interface BlackjackState {
    player: PlayerState;
    dealer: DealerState;
    deck: Card[];
    result?: "win" | "lose" | "push";
    phase: "idle" | "dealing" | "playerTurn" | "dealerTurn" | "result";
}
