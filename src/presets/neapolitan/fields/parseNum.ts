export const parseNum = (raw: string): number => {
    if (raw.length === 0) return 0;
    const n = parseFloat(raw);
    return Number.isFinite(n) ? n : 0;
};

export const fmt = (n: number, decimals = 0): string => {
    if (!Number.isFinite(n)) return "0";
    const p = Math.pow(10, decimals);
    return String(Math.round(n * p) / p);
};
