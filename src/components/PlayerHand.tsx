"use client";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { CardView } from "./CardView";

export const PlayerHand: FC = (): React.ReactNode => {
    const player = useSelector((s: RootState) => s.blackjack.player);

    return (
        <div className="flex flex-col items-center mb-6">
            <div className="text-xl font-bold mb-4 text-white">Player</div>

            <div className="relative w-64 h-48">
                {player.hand.map((c, i) => {
                    const offset = i * 30;
                    return (
                        <div
                            key={i}
                            className="absolute"
                            style={{
                                bottom: `${offset}px`,
                                left: `${offset}px`,
                                zIndex: i,
                            }}
                        >
                            <CardView card={c} />
                        </div>
                    );
                })}
            </div>

            <div className="text-lg mt-4 text-white">Total: {player.total}</div>
            {player.busted && <div className="text-red-500 font-bold mt-1">BUST!</div>}
            {player.blackjack && <div className="text-green-500 font-bold mt-1">BLACKJACK!</div>}
        </div>
    );
};
