"use client";
import React, { FC } from "react";
import { PlayerHand } from "@/components/PlayerHand";
import { DealerHand } from "@/components/DealerHand";
import { Controls } from "@/components/Controls";
import { Deck } from "./Deck";

export const BlackjackTable: FC = (): React.ReactNode => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-between bg-green-700 p-6">
            <h1 className="text-4xl font-bold mb-6 text-white">♠ Blackjack ♣</h1>
            <div className="flex items-center justify-between space-x-3">
                <div className="flex  flex-col mt-auto">
                    <DealerHand />
                    <PlayerHand />
                </div>

            </div>
            <div className="mt-6">
                <Controls />
            </div>

            <div className="fixed right-4 top-1/2 transform -translate-y-1/2">
                <Deck />
            </div>
        </div>
    );
};
