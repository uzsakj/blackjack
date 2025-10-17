"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { startGame, playerHit, playerStand, dealerTurn } from "@/features/blackjack/blackjackSlice";

export const Controls = () => {
    const dispatch = useDispatch();
    const { phase, result } = useSelector((s: RootState) => s.blackjack);

    const handleStand = () => {
        dispatch(playerStand());
        dispatch(dealerTurn());
    };

    return (
        <div className="flex flex-wrap gap-3 justify-center mt-4">
            {phase === "idle" && (
                <button
                    onClick={() => dispatch(startGame())}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
                >
                    Start Game
                </button>
            )}
            {phase === "playerTurn" && (
                <>
                    <button
                        onClick={() => dispatch(playerHit())}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
                    >
                        Hit
                    </button>
                    <button
                        onClick={handleStand}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl"
                    >
                        Stand
                    </button>
                </>
            )}
            {phase === "result" && (
                <>
                    <div className="text-lg font-bold text-white bg-gray-800 px-4 py-2 rounded-xl">
                        {result === "win" && "YOU WIN!"}
                        {result === "lose" && "YOU LOSE!"}
                        {result === "draw" && "DRAW!"}
                    </div>
                    <button
                        onClick={() => dispatch(startGame())}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
                    >
                        Play Again
                    </button>
                </>
            )}
        </div>
    );
};
