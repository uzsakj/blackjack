'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useLobby(code: string) {
    const [lobby, setLobby] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!code) return;

        async function fetchLobby() {
            const { data } = await supabase
                .from("lobbies")
                .select("*")
                .eq("code", code)
                .single();

            setLobby(data);
            setLoading(false);
        }

        fetchLobby();
    }, [code]);

    return { lobby, loading };
}
