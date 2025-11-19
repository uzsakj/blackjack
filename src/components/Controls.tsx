'use client';
import React, { FC } from "react";
import { useGameActions } from "../hooks/useGameActions";

interface ControlsProps {
    lobbyId?: string;
    playerId?: string;
}
export const Controls: FC<ControlsProps> = ({ lobbyId, playerId }) => {
    const actions = useGameActions(lobbyId!);

    if (!lobbyId || !playerId) return null;

    return (
        <div className="flex gap-4">
            <button
                onClick={() => actions.hit(playerId)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Hit
            </button>
            <button
                onClick={() => actions.stand(playerId)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Stand
            </button>
            <button
                onClick={() => actions.double(playerId)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
                Double
            </button>
            <button
                onClick={() => actions.resetRound()}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
                Reset
            </button>
        </div>
    );
};
