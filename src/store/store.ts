import { configureStore } from '@reduxjs/toolkit';
import blackjackReducer from '@/features/blackjack/blackjackSlice';

export const store = configureStore({
    reducer: {
        blackjack: blackjackReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
