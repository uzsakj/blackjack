"use client";
import React from "react";
import Image from "next/image";
import type { Card } from "@/features/blackjack/blackjackTypes";

export const CardView = ({ card }: { card: Card }) => {
    if (card.state === "dealerHidden" || card.state === "deck") {
        return (
            <div className="w-22 h-32 relative rounded-xs overflow-hidden shadow-md flex items-center justify-center bg-white">
                <Image
                    src="/card-back.svg"
                    alt="Card Back"
                    fill
                    style={{ objectFit: "cover" }}
                />
            </div>

        );
    }

    const color = card.suit === "♥" || card.suit === "♦" ? "text-red-500" : "text-black";

    return (
        <div
            className={`border rounded-xs bg-white shadow-md w-22 h-32 relative  ${color}`}
        >
            <div className={`absolute top-1 left-1 text-sm flex flex-col items-start ${color}`}>
                <span className="font-bold">{card.value}</span>
                <span>{card.suit}</span>
            </div>

            <div className={`absolute inset-0 flex items-center justify-center text-2xl  ${color}`}>
                {card.suit}
            </div>
            <div className={`absolute bottom-1 right-1 text-sm flex flex-col items-end rotate-180 ${color}`}>
                <span className="font-bold">{card.value}</span>
                <span>{card.suit}</span>
            </div>
        </div >

    );
};
