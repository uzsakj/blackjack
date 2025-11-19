import { FC } from "react";
import { useSelector } from "react-redux";
import { Card } from "../features/blackjack/blackjackTypes";
import { RootState } from "../store/store";
import { CardView } from "./CardView";
import React from "react";

interface DeckProps {
    maxVisible?: number;
}

export const deckRef = React.createRef<HTMLDivElement>();

export const Deck: FC<DeckProps> = ({ maxVisible = 5 }): React.ReactNode => {
    const deck: Card[] = useSelector((s: RootState) => s.blackjack.deck);
    const remaining: number = deck.length;

    return (
        <div className="flex flex-col items-center mb-6">
            <div className="text-white mb-2">Deck ({remaining} cards)</div>
            <div ref={deckRef} className="relative w-22 h-32">
                {Array.from({ length: Math.min(remaining, maxVisible) }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute top-0 left-0 w-22 h-32"
                        style={{ transform: `translate(${i * 2}px, ${i * 2}px)` }}
                    >
                        <CardView card={{ state: "deck" }}></CardView>
                    </div>
                ))}
            </div>
        </div>
    );
};
