"use client";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { CardView } from "./CardView";

export const PlayerHand: FC = (): React.ReactNode => {
    const player = useSelector((s: RootState) => s.blackjack.player);

    return (
        <div className="flex flex-col items-center mb-6">


            <div className="relative w-64 h-64">
                {player.hand.map((c, i) => {
                    return (
                        <div
                            key={i}
                            className="absolute"
                            style={{
                                bottom: `${i * 30}px`,
                                left: `${i * 30}px`,
                                zIndex: i,
                            }}
                        >
                            <CardView card={c} />
                        </div>
                    );
                })}
            </div>
            {!!player.total && < div className="text-lg mt-4 text-white">Total: {player.total}</div>}

        </div >
    );
};
