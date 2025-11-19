'use client';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useLobbyState } from './useLobbyState';
import { blackjackReducer } from '@/features/blackjack/blackjackReducer';

export function useGameHost(lobbyId: string, isHost: boolean) {
    const [state, setState] = useLobbyState(lobbyId);

    useEffect(() => {
        if (!isHost) return;

        const channel = supabase
            .channel(`game-${lobbyId}`)
            .on("broadcast", { event: "action" }, async (msg) => {
                const action = msg.payload;

                // Run your blackjack reducer
                const newState = blackjackReducer(state, action);

                setState(newState);

                // Push to Supabase
                await supabase
                    .from("lobby_state")
                    .update({ state: newState })
                    .eq("lobby_id", lobbyId);
            })
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, [isHost, state, lobbyId]);

    return state;
}
