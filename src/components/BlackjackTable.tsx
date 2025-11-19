'use client';
import { FC, useMemo } from "react";
import { motion } from "framer-motion";
import { DealerHand } from "./DealerHand";
import { PlayerHand } from "./PlayerHand";
import { Deck } from "./Deck";
import { Controls } from "./Controls";
import { useLobby } from "../hooks/useLobby";
import { useLobbyPlayers } from "../hooks/useLobbyPlayers";
import { useLobbyState } from "../hooks/useLobbyState";
import type { PlayerState, DealerState } from "@/features/blackjack/blackjackTypes";

interface BlackjackTableProps {
    code: string;        // lobby code
    seatIndex: number;   // current player's seat index
}

export const BlackjackTable: FC<BlackjackTableProps> = ({ code, seatIndex }) => {

    const { lobby } = useLobby(code);

    const players = useLobbyPlayers(lobby?.id);
    const [state, loadingState] = useLobbyState(lobby?.id);

    // Determine this player's state
    const playerState: PlayerState | undefined = state?.players?.[seatIndex];
    // Determine the dealer's state
    const dealerState: DealerState | undefined = state?.dealer;


    // Message logic
    const message = useMemo(() => {
        if (!playerState) return "";
        if (playerState.blackjack) return "BLACKJACK!";
        if (playerState.busted) return "BUSTED!";
        if (state?.phase === "result") {
            switch (playerState.result) {
                case "win": return "YOU WIN!";
                case "lose": return "YOU LOSE!";
                case "push": return "PUSH!";
            }
        }
        return "";
    }, [playerState, state?.phase]);

    if (!lobby || loadingState) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white text-2xl">
                Loading lobby...
            </div>
        );
    }

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
                    {/* Dealer */}
                    <DealerHand dealerState={dealerState} />

                    {/* Message */}
                    <motion.div
                        key={message}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className={`absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold drop-shadow-lg ${getColor()} pb-4`}
                    >
                        {message}
                    </motion.div>

                    {/* Deck */}
                    <div className="fixed right-1/5 top-1/2 -translate-y-1/3">
                        <Deck />
                    </div>

                    {/* Current Player */}
                    <PlayerHand playerState={playerState} />

                    {/* Other Players */}
                    <div className="absolute top-1/3 left-1/4 flex gap-4">
                        {players
                            ?.filter((_, i) => i !== seatIndex)
                            .map((p) => (
                                <PlayerHand key={p.id} playerState={p} />
                            ))}
                    </div>

                    {/* Controls */}
                    <div className="fixed bottom-0.5 -translate-y-1/2">
                        <Controls lobbyId={lobby?.id} playerId={playerState?.id} />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
