'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { LobbyState } from '@/features/blackjack/blackjackTypes';

export function useLobbyState(lobbyId?: string): [LobbyState | null, boolean] {
    const [state, setState] = useState<LobbyState | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!lobbyId) {
            setState(null);
            setLoading(true);
            return;
        }


        const fetchState = async () => {
            setLoading(true);

            const { data, error } = await supabase
                .from('lobby_state')
                .select('state')
                .eq('lobby_id', lobbyId)
                .single();

            if (error) {
                console.error('Error fetching lobby state:', error);
                setState(null);
            } else {
                setState(data?.state || null);
            }

            setLoading(false);
        };

        fetchState();

        // Realtime subscription 
        const channel = supabase
            .channel(`lobby-${lobbyId}`)
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'lobby_state', filter: `lobby_id=eq.${lobbyId}` },
                (payload) => {
                    setState(payload.new.state);
                }
            )
            .subscribe();

        // Cleanup on unmount
        return () => {
            if (channel) supabase.removeChannel(channel);
        };
    }, [lobbyId]);

    return [state, loading];
}
