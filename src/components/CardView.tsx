"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import type { Card } from "@/features/blackjack/blackjackTypes";
import { motion, useAnimation } from "framer-motion";
import { deckRef } from "./Deck";
import { cubicBezier } from "../utils/deckUtils";

interface CardViewProps {
    card: Card;
    delay?: number;
}

export const CardView: React.FC<CardViewProps> = ({ card, delay = 0 }) => {
    const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
    const [ready, setReady] = useState(false);
    const [isBackFacing, setIsBackFacing] = useState(
        card.state === "dealerHidden" || card.state === "deck"
    );

    const color = card.suit === "♥" || card.suit === "♦" ? "text-red-500" : "text-black";
    const controls = useAnimation();



    const generateBezierPath = (start: { x: number, y: number }, end: { x: number, y: number }) => {
        const control1 = {
            x: start.x + (end.x - start.x) * 0.25,
            y: start.y - 150,
        };
        const control2 = {
            x: start.x + (end.x - start.x) * 0.75,
            y: end.y - 150,
        };

        const points = [];
        for (let i = 0; i <= 20; i++) {
            const t = i / 20;
            points.push(cubicBezier(start, control1, control2, end, t));
        }

        return points;
    };

    const path = generateBezierPath(
        { x: initialPos.x, y: initialPos.y },
        { x: 0, y: 0 }
    );


    useEffect(() => {
        if (deckRef.current) {
            const rect = deckRef.current.getBoundingClientRect();
            const x = rect.left + rect.width / 2 - window.innerWidth / 2;
            const y = rect.top + rect.height / 2 - window.innerHeight / 2;
            setInitialPos({ x, y });
            setReady(true);
        }

    }, [card.state]);

    useEffect(() => {
        (async () => {
            if (!(card.state === "dealerHidden" || card.state === "deck") && isBackFacing) {
                await controls.start({
                    rotateY: 90,
                    transition: { duration: 0.3, ease: "easeInOut" },
                });

                setIsBackFacing(false);

                await controls.start({
                    rotateY: 180,
                    transition: { duration: 0.3, ease: "easeInOut" },
                });
            }
        })();
    }, [card.state, controls, isBackFacing]);

    if (!ready) return null;

    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.5,
                x: path[0].x,
                y: path[0].y,
                rotate: -20,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                x: path.map(p => p.x),
                y: path.map(p => p.y),
                rotate: path.map((_, i) => -20 + i * (20 / path.length)),
            }}
            transition={{
                delay,
                duration: 0.8,
                ease: "easeOut",
            }}

            className="relative w-16 h-24 md:w-22 md:h-32"
            style={{ perspective: 600 }}
        >
            <motion.div
                animate={controls}
                initial={{ rotateY: isBackFacing ? 0 : 180 }}
                style={{
                    transformStyle: "preserve-3d",
                    width: "100%",
                    height: "100%",
                    transformOrigin: "center",
                }}
                className="absolute inset-0"
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(0deg)",
                    }}
                >
                    <div className="w-16 h-24 md:w-22 md:h-32 relative rounded overflow-hidden shadow-md flex items-center justify-center bg-white">
                        <Image
                            src="/card-back.svg"
                            alt="Card Back"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                </div>
                <div
                    className={`absolute inset-0 ${color}`}
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    <div className="border rounded bg-white shadow-md w-16 h-24 md:w-22 md:h-32 relative">
                        <div className="absolute top-1 left-1 text-xs md:text-sm flex flex-col items-start">
                            <span className="font-bold">{card.value}</span>
                            <span>{card.suit}</span>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center text-xl md:text-2xl">
                            {card.suit}
                        </div>

                        <div className="absolute bottom-1 right-1 text-xs md:text-sm flex flex-col items-end rotate-180">
                            <span className="font-bold">{card.value}</span>
                            <span>{card.suit}</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
