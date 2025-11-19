'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function useLobbyState(lobbyId: string) {
    const [state, setState] = useState<any>(null);

    async function load() {
        const { data } = await supabase
            .from("lobby_state")
            .select("*")
            .eq("lobby_id", lobbyId)
            .single();

        if (data) setState(data.state);
    }

    useEffect(() => {
        if (!lobbyId) return;

        load();

        const channel = supabase
            .channel(`state-${lobbyId}`)
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "lobby_state",
                    filter: `lobby_id=eq.${lobbyId}`
                },
                (payload) => {
                    setState(payload.new.state);
                }
            )
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, [lobbyId]);

    return [state, setState] as const;
}
