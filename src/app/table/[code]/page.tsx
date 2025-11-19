'use client';
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { BlackjackTable } from "@/components/BlackjackTable";
import type { PlayerState } from "@/features/blackjack/blackjackTypes";

export default function TablePage() {
    const router = useRouter();
    const params = useParams();

    const code = params?.code as string;

    const [seatIndex, setSeatIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!code) return;

        const joinLobby = async () => {
            setLoading(true);

            // Get lobby info
            const { data: lobby, error: lobbyError } = await supabase
                .from("lobbies")
                .select("*")
                .eq("code", code)
                .single();

            if (lobbyError || !lobby) {
                console.error("Lobby not found", lobbyError);
                router.push("/"); // redirect to home
                return;
            }

            //  Assign temporary seat index (first empty seat)
            const { data: stateData } = await supabase
                .from("lobby_state")
                .select("state")
                .eq("lobby_id", lobby.id)
                .single();

            const state = stateData?.state;
            if (!state) {
                console.error("Lobby state not found");
                return;
            }

            let newSeatIndex = 0;
            while (state.players?.some((p: PlayerState) => p.seatIndex === newSeatIndex)) {
                newSeatIndex++;
            }

            //  Add this player temporarily
            const playerId = crypto.randomUUID(); // or Supabase auth user id
            const player: PlayerState = {
                id: playerId,
                name: "Player " + (newSeatIndex + 1),
                hand: [],
                total: 0,
                blackjack: false,
                busted: false,
                seatIndex: newSeatIndex,
            };

            const updatedPlayers = [...(state.players || []), player];

            await supabase
                .from("lobby_state")
                .update({ state: { ...state, players: updatedPlayers } })
                .eq("lobby_id", lobby.id);

            setSeatIndex(newSeatIndex);
            setLoading(false);
        };

        joinLobby();
    }, [code, router]);

    if (loading || seatIndex === null) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white text-2xl">
                Joining Lobby...
            </div>
        );
    }

    return <BlackjackTable code={code} seatIndex={seatIndex} />;
}
