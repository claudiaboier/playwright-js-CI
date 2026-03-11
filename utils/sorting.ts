export class Sorting {
    static sortAscending(arr: string[]): string[] {
        return [...arr].sort((a, b) => a.localeCompare(b));
    }   

    static sortDescending(arr: string[]): string[] {
        return [...arr].sort((a, b) => b.localeCompare(a));
    }

    static sortByPriceLowToHigh(arr: number[]): number[] {
        return [...arr].sort((a, b) => a - b);
    }

    static sortByPriceHighToLow(arr: number[]): number[] {
        return [...arr].sort((a, b) => b - a);
    }
}