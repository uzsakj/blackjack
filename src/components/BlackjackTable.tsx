"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { PlayerHand } from "@/components/PlayerHand";
import { DealerHand } from "@/components/DealerHand";
import { Controls } from "@/components/Controls";

const Deck = () => {
    const deck = useSelector((s: RootState) => s.blackjack.deck);
    const remaining = deck.length;

    return (
        <div className="flex flex-col items-center mb-6">
            <div className="text-white mb-2">Deck ({remaining} cards)</div>
            <div className="relative w-16 h-20">
                {/* Render a stacked deck visually */}
                {Array.from({ length: Math.min(remaining, 5) }).map((_, i) => (
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

export const BlackjackTable = () => {
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
