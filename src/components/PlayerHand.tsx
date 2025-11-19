'use client';
import React, { FC } from "react";
import { CardView } from "./CardView";
import { PlayerState } from "../features/blackjack/blackjackTypes";

interface PlayerHandProps {
    playerState?: PlayerState;
}

export const PlayerHand: FC<PlayerHandProps> = ({ playerState }) => {
    if (!playerState) return null;

    return (
        <div>
            {playerState.hand.map((c) => (
                <CardView key={c.id} card={c} />
            ))}
            <div>Total: {playerState.total}</div>
        </div>
    );
};