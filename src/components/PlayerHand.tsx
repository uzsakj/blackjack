"use client";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { CardView } from "./CardView";

export const PlayerHand: FC = (): React.ReactNode => {
    const player = useSelector((s: RootState) => s.blackjack.player);

    return (
        <div className="flex flex-col items-center mb-4">
            <div className="text-xl font-bold mb-2 text-white">Player</div>
            <div className="flex gap-2">
                {player.hand.map((c, i) => (
                    <CardView key={i} card={c} />
                ))}
            </div>
            <div className="text-lg mt-2 text-white">Total: {player.total}</div>
            {player.busted && <div className="text-red-500 font-bold mt-1">BUST!</div>}
            {player.blackjack && <div className="text-green-500 font-bold mt-1">BLACKJACK!</div>}
        </div>
    );
};
