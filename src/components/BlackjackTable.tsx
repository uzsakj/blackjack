"use client";
import { motion } from "framer-motion";
import { DealerHand } from "./DealerHand";
import { PlayerHand } from "./PlayerHand";
import { Deck } from "./Deck";
import { Controls } from "./Controls";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const BlackjackTable: FC = (): React.ReactNode => {
    const { player, phase, result } = useSelector(
        (s: RootState) => s.blackjack
    );

    // Determine message text
    let message = "";
    if (player.blackjack) message = "BLACKJACK!";
    else if (player.busted) message = "BUSTED!";
    else if (phase === "result") {
        if (result === "win") message = "YOU WIN!";
        else if (result === "lose") message = "YOU LOSE!";
        else message = "PUSH!";
    }

    // Choose color based on outcome
    const colorMap: Record<string, string> = {
        BLACKJACK: "text-green-400",
        BUSTED: "text-red-500",
        WIN: "text-green-400",
        LOSE: "text-red-500",
        PUSH: "text-yellow-300",
    };

    const getColor = () => {
        if (message.includes("BLACKJACK")) return colorMap.BLACKJACK;
        if (message.includes("BUSTED")) return colorMap.BUSTED;
        if (message.includes("WIN")) return colorMap.WIN;
        if (message.includes("LOSE")) return colorMap.LOSE;
        if (message.includes("PUSH")) return colorMap.PUSH;
        return "text-white";
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-green-950">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-5/6 h-5/6 rounded-[9999px] bg-emerald-700 border-[16px] border-yellow-900 shadow-2xl flex flex-col justify-between items-center py-6 relative"
            >
                <div className="absolute inset-0 rounded-[9999px] bg-gradient-to-b from-white/10 to-transparent" />

                <div className="z-10 flex flex-col items-center w-full h-full justify-between">
                    <DealerHand />

                    <motion.div
                        key={message}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className={`absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold drop-shadow-lg ${getColor()} pb-4`}
                    >
                        {message}
                    </motion.div>

                    <div className="fixed right-1/5 top-1/2 -translate-y-1/3">
                        <Deck />
                    </div>

                    <PlayerHand />

                    <div className="fixed  bottom-0.5 -translate-y-1/2">
                        <Controls />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
