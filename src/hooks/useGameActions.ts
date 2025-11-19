'use client';
import { supabase } from '@/lib/supabaseClient';

export function useGameActions(lobbyId: string) {
    const channel = supabase.channel(`game-${lobbyId}`);
    channel.subscribe();

    function sendAction(type: string, payload: any = {}) {
        channel.send({
            type: "broadcast",
            event: "action",
            payload: { type, ...payload },
        });
    }

    return {
        startGame: () => sendAction("startGame"),
        hit: (playerId: string) => sendAction("hit", { playerId }),
        stand: (playerId: string) => sendAction("stand", { playerId }),
        double: (playerId: string) => sendAction("double", { playerId }),
        resetRound: () => sendAction("resetRound"),
    };
}
