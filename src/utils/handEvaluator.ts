import { Card } from "../features/blackjack/blackjackTypes";


export function handTotal(hand: Card[]): number {
    let total = 0;
    let aces = 0;

    for (const c of hand) {
        if (c.value === "A") {
            total += 11;
            aces++;
        } else if (["K", "Q", "J"].includes(c.value)) {
            total += 10;
        } else {
            total += parseInt(c.value);
        }
    }

    // adjust aces
    while (total > 21 && aces > 0) {
        total -= 10;
        aces--;
    }

    return total;
}
