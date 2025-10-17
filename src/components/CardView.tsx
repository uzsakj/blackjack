"use client";
import React from "react";
import type { Card } from "@/features/blackjack/blackjackTypes";

export const CardView = ({ card }: { card: Card }) => {
    // If the card is hidden, show a back
    if (card.state === "dealerHidden") {
        return (
            <div className="border rounded-xl bg-gray-800 shadow-md w-12 h-16 flex items-center justify-center text-white">
                ❓
            </div>
        );
    }

    const color = card.suit === "♥" || card.suit === "♦" ? "text-red-500" : "text-black";

    return (
        <div
            className={`border rounded-xl bg-white shadow-md p-2 w-12 h-16 flex flex-col items-center justify-center ${color}`}
        >
            <span className="text-lg font-bold">{card.value}</span>
            <span>{card.suit}</span>
        </div>
    );
};
