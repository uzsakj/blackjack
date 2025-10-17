"use client";
import React, { FC } from "react";
import { PlayerHand } from "@/components/PlayerHand";
import { DealerHand } from "@/components/DealerHand";
import { Controls } from "@/components/Controls";
import { Deck } from "./Deck";

export const BlackjackTable: FC = (): React.ReactNode => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-700 p-6">
            <h1 className="text-4xl font-bold mb-6 text-white">♠ Blackjack ♣</h1>
            <div className="flex items-center space-x-3">
                <div className="flex  flex-col">
                    <DealerHand />
                    <PlayerHand />
                </div>
                <Deck />
            </div>
            <Controls />
        </div>
    );
};
