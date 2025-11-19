export type CardState = "deck" | "player" | "dealerVisible" | "dealerHidden";

export type Card = {
    value?: string;
    suit: "♠" | "♥" | "♦" | "♣";
    state: CardState;
};

export interface PlayerState {
    id: string;           // unique player id (Supabase user id or username)
    name: string;         // display name
    hand: Card[];
    total: number;
    blackjack: boolean;
    busted: boolean;
    result?: "win" | "lose" | "push";
    seatIndex: number;
}


export interface DealerState {
    hand: Card[];
    total: number;
    hidden: Card | null; // dealer’s hidden card
}

export interface LobbyState {
    id: string;                   // Supabase lobby id
    code: string;                 // lobby code
    players: PlayerState[];
    dealer: DealerState;
    phase: "betting" | "dealing" | "playerTurn" | "dealerTurn" | "result";
}
