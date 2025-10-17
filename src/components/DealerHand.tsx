"use client";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { CardView } from "./CardView";

export const DealerHand: FC = (): React.ReactNode => {
    const dealer = useSelector((s: RootState) => s.blackjack.dealer);
    const phase = useSelector((s: RootState) => s.blackjack.phase);

    return (
        <div className="flex flex-col items-center mb-6">
            <div className="text-xl font-bold mb-2 text-white">Dealer</div>
            <div className="flex gap-2">
                {dealer.hand.map((c, i) => (
                    <CardView key={i} card={c} />
                ))}
            </div>
            {phase !== "playerTurn" && <div className="text-lg mt-2 text-white">Total: {dealer.total}</div>}
        </div>
    );
};
