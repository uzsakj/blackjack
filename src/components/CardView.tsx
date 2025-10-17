"use client";
import React from "react";
import Image from "next/image";
import type { Card } from "@/features/blackjack/blackjackTypes";

export const CardView = ({ card }: { card: Card }) => {
    if (card.state === "dealerHidden" || card.state === "deck") {
        return (
            <div className="w-12 h-16 relative bg-white border-0 shadow-md">
                <Image
                    src="/card-back.svg"
                    alt="Card Back"
                    fill
                    style={{ objectFit: "contain" }}
                    className="rounded-xs"
                />
            </div>
        );
    }

    const color = card.suit === "♥" || card.suit === "♦" ? "text-red-500" : "text-black";

    return (
        <div className={`border rounded-xs bg-white shadow-md p-2 w-12 h-16 flex flex-col items-center justify-center ${color}`}>
            <span className="text-lg font-bold">{card.value}</span>
            <span>{card.suit}</span>
            <span className="text-lg font-bold">{card.value}</span>
            <span>{card.suit}</span>
        </div>
    );
};
