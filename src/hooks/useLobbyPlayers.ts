import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { PlayerState } from "@/features/blackjack/blackjackTypes";

export function useLobbyPlayers(lobbyId?: string): PlayerState[] {
    const [players, setPlayers] = useState<PlayerState[]>([]);

    useEffect(() => {
        if (!lobbyId) return;

        const fetchPlayers = async () => {
            const { data } = await supabase
                .from("lobby_state")
                .select("state")
                .eq("lobby_id", lobbyId)
                .single();

            setPlayers(data?.state?.players || []);
        };

        fetchPlayers();
    }, [lobbyId]);

    return players;
}
