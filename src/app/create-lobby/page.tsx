'use client';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function CreateLobbyPage() {
    const router = useRouter();

    const handleCreateLobby = async () => {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();

        const { data: lobby } = await supabase
            .from('lobbies')
            .insert([{ code }])
            .select()
            .single();

        if (!lobby) return;

        router.push(`/table/${lobby.code}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-950">
            <h1 className="text-white text-4xl mb-6">Create a New Lobby</h1>
            <button
                onClick={handleCreateLobby}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
            >
                Create Lobby
            </button>
        </div>
    );
}
