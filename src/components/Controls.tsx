"use client";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { startGame, playerHit, playerStand, dealerTurn } from "@/features/blackjack/blackjackSlice";

export const Controls: FC = (): React.ReactNode => {
    const dispatch = useDispatch<AppDispatch>();
    const { phase } = useSelector((s: RootState) => s.blackjack);

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
