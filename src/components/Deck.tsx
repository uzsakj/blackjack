import { FC, JSX } from "react";
import { useSelector } from "react-redux";
import { Card } from "../features/blackjack/blackjackTypes";
import { RootState } from "../store/store";

interface DeckProps {
    maxVisible?: number;
}

export const Deck: FC<DeckProps> = ({ maxVisible = 5 }): React.ReactNode => {
    const deck: Card[] = useSelector((s: RootState) => s.blackjack.deck);
    const remaining: number = deck.length;

    return (
        <div className="flex flex-col items-center mb-6">
            <div className="text-white mb-2">Deck ({remaining} cards)</div>
            <div className="relative w-16 h-20">
                {Array.from({ length: Math.min(remaining, maxVisible) }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute top-0 left-0 w-16 h-20 border rounded-xl bg-gray-800 shadow-md"
                        style={{ transform: `translate(${i * 2}px, ${i * 2}px)` }}
                    />
                ))}
            </div>
        </div>
    );
};
