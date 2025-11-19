'use client';
import React, { FC } from "react";
import { CardView } from "./CardView";
import { DealerState } from "../features/blackjack/blackjackTypes";

interface DealerHandProps {
    dealerState?: DealerState;
}

export const DealerHand: FC<DealerHandProps> = ({ dealerState }) => {
    if (!dealerState) return null;

    return (
        <div>
            {dealerState.hand.map((c) => (
                <CardView key={c.id} card={c} />
            ))}
            <div>Total: {dealerState.total}</div>
        </div>
    );
};