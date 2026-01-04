"use client";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { CardView } from "./CardView";
import { Card } from "../features/blackjack/blackjackTypes";

export const PlayerHand: FC = (): React.ReactNode => {
    const player = useSelector((s: RootState) => s.blackjack.player);

    return (
        <div className="flex flex-col  justify-center items-center mb-6">

            <div className="relative w-32 h-32 xl:w-64 xl:h-64">
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
                {!!player.total && player.hand.length > 0 && (
                    <div
                        className="absolute w-16 h-24 md:w-22 md:h-32 pointer-events-none"
                        style={{
                            bottom: `${(player.hand.length - 1) * 30}px`,
                            left: `${(player.hand.length - 1) * 30}px`,
                            zIndex: 50,
                        }}
                    >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 text-lg text-white whitespace-nowrap drop-shadow-md">
                            Total: {player.total}
                        </div>
                    </div>
                )}
            </div>

        </div >
    );
};
