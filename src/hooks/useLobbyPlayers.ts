'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useLobbyPlayers(lobbyId: string) {
    const [players, setPlayers] = useState<any[]>([]);

    async function load() {
        const { data } = await supabase
            .from("lobby_players")
            .select("*")
            .eq("lobby_id", lobbyId)
            .order("seat_index");

        setPlayers(data || []);
    }

    useEffect(() => {
        if (!lobbyId) return;

        load();

        const channel = supabase
            .channel(`players-${lobbyId}`)
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "lobby_players",
                    filter: `lobby_id=eq.${lobbyId}`
                },
                () => load()
            )
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, [lobbyId]);

    return players;
}
