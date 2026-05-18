import { NeapolitanDerived, NeapolitanState } from "./types";

const roundToTenths = (n: number): number => Math.round(n * 10) / 10;

const splitMass = (mass: number, hydration: number): { flour: number; water: number } => {
    if (mass <= 0) return { flour: 0, water: 0 };
    const flour = mass / (1 + hydration / 100);
    return { flour, water: mass - flour };
};

export const derive = (s: NeapolitanState): NeapolitanDerived => {
    const totalFlour = s.hydration === -100 ? 0 : s.total / (1 + s.hydration / 100);
    const totalWater = s.total - totalFlour;

    const { flour: poolishFlour, water: poolishWater } = s.poolishOn
        ? splitMass(s.poolishMass, s.poolishHydration)
        : { flour: 0, water: 0 };

    const restFlour = totalFlour - poolishFlour;
    const restWater = totalWater - poolishWater;
    const servings = s.ballWeight > 0 ? roundToTenths(s.total / s.ballWeight) : 0;
    const saltWeight = (totalFlour * s.saltPercent) / 100;

    return {
        flour: restFlour,
        water: restWater,
        servings,
        saltWeight,
        totalFlour,
        totalWater,
        poolishFlour,
        poolishWater,
    };
};

// ---------- canonical-state transitions ----------

export const applyHydrationChange = (s: NeapolitanState, hydration: number): NeapolitanState => {
    if (s.poolishOn) {
        // Poolish anchor (limited resource) + total stays. Only hydration changes.
        return { ...s, hydration };
    }
    // Poolish off → flour anchor (= totalFlour, since no poolish). total recomputes.
    const { totalFlour } = derive(s);
    return { ...s, hydration, total: totalFlour * (1 + hydration / 100) };
};

export const applyFlourChange = (s: NeapolitanState, restFlour: number): NeapolitanState => {
    // hydration fixed, poolish fixed → adjust total.
    const { poolishFlour } = derive(s);
    const newTotalFlour = restFlour + poolishFlour;
    return { ...s, total: newTotalFlour * (1 + s.hydration / 100) };
};

export const applyWaterChange = (s: NeapolitanState, restWater: number): NeapolitanState => {
    if (s.hydration <= 0) return s;
    const { poolishWater } = derive(s);
    const newTotalWater = restWater + poolishWater;
    const newTotalFlour = (newTotalWater * 100) / s.hydration;
    return { ...s, total: newTotalFlour + newTotalWater };
};

export const applyTotalChange = (s: NeapolitanState, total: number): NeapolitanState => ({
    ...s,
    total,
});

export const applyBallWeightChange = (s: NeapolitanState, ballWeight: number): NeapolitanState => ({
    ...s,
    ballWeight,
});

export const applyServingsChange = (s: NeapolitanState, servings: number): NeapolitanState => ({
    ...s,
    total: servings * s.ballWeight,
});

export const applyPoolishMassChange = (s: NeapolitanState, poolishMass: number): NeapolitanState => ({
    ...s,
    poolishMass,
});

export const applyPoolishHydrationChange = (s: NeapolitanState, poolishHydration: number): NeapolitanState => ({
    ...s,
    poolishHydration,
});

export const applySaltPercentChange = (s: NeapolitanState, saltPercent: number): NeapolitanState => ({
    ...s,
    saltPercent,
});

export const applyPoolishToggle = (s: NeapolitanState, poolishOn: boolean): NeapolitanState => ({
    ...s,
    poolishOn,
});
