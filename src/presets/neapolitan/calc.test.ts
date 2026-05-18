import { describe, expect, it } from "vitest";
import defaults from "./defaults";
import {
    applyBallWeightChange,
    applyFlourChange,
    applyHydrationChange,
    applyPoolishHydrationChange,
    applyPoolishMassChange,
    applyPoolishToggle,
    applySaltPercentChange,
    applyServingsChange,
    applyTotalChange,
    applyWaterChange,
    derive,
} from "./calc";
import { NeapolitanState } from "./types";

const close = (a: number, b: number, eps = 1e-6) => Math.abs(a - b) < eps;

describe("derive (defaults)", () => {
    it("computes totals from defaults: 70% hydration, 460g total", () => {
        const d = derive(defaults);
        // total_flour = 460 / 1.7 ≈ 270.588
        expect(close(d.totalFlour, 460 / 1.7)).toBe(true);
        expect(close(d.totalWater, 460 - 460 / 1.7)).toBe(true);
    });

    it("splits poolish 200g @ 100% into 100/100", () => {
        const d = derive(defaults);
        expect(close(d.poolishFlour, 100)).toBe(true);
        expect(close(d.poolishWater, 100)).toBe(true);
    });

    it("rest = total - poolish", () => {
        const d = derive(defaults);
        expect(close(d.flour, d.totalFlour - 100)).toBe(true);
        expect(close(d.water, d.totalWater - 100)).toBe(true);
    });

    it("servings = total / ballWeight, rounded to 0.1", () => {
        const d = derive(defaults);
        expect(d.servings).toBe(2);
    });

    it("salt weight = totalFlour × saltPercent / 100", () => {
        const d = derive(defaults);
        expect(close(d.saltWeight, (d.totalFlour * 2.5) / 100)).toBe(true);
    });
});

describe("derive (poolish off)", () => {
    const s: NeapolitanState = { ...defaults, poolishOn: false };

    it("poolish flour/water are zero", () => {
        const d = derive(s);
        expect(d.poolishFlour).toBe(0);
        expect(d.poolishWater).toBe(0);
    });

    it("rest equals total when poolish off", () => {
        const d = derive(s);
        expect(close(d.flour, d.totalFlour)).toBe(true);
        expect(close(d.water, d.totalWater)).toBe(true);
    });
});

describe("derive (edge cases)", () => {
    it("ballWeight=0 → servings=0 (no NaN)", () => {
        const d = derive({ ...defaults, ballWeight: 0 });
        expect(d.servings).toBe(0);
    });

    it("rounds servings to 1 decimal (3.4 case)", () => {
        // 3.4 servings × 230 = 782 → 782/230 = 3.4
        const d = derive({ ...defaults, total: 782 });
        expect(d.servings).toBe(3.4);
    });

    it("rounds 2.55 down to 2.6", () => {
        // total = 2.55 × 230 = 586.5
        const d = derive({ ...defaults, total: 586.5 });
        expect(d.servings).toBe(2.6);
    });
});

describe("applyHydrationChange", () => {
    it("poolish on: keeps total, only hydration changes", () => {
        const next = applyHydrationChange(defaults, 80);
        expect(next.total).toBe(defaults.total);
        expect(next.hydration).toBe(80);
        expect(next.poolishMass).toBe(defaults.poolishMass);
    });

    it("poolish off: keeps flour anchor, total recomputes", () => {
        const off: NeapolitanState = { ...defaults, poolishOn: false };
        const before = derive(off);
        const next = applyHydrationChange(off, 80);
        const after = derive(next);
        expect(close(after.totalFlour, before.totalFlour)).toBe(true);
        expect(close(next.total, before.totalFlour * 1.8)).toBe(true);
    });
});

describe("applyFlourChange", () => {
    it("changes total flour, keeps hydration + poolish", () => {
        const next = applyFlourChange(defaults, 200); // rest_flour = 200
        const before = derive(defaults);
        const after = derive(next);
        expect(next.hydration).toBe(defaults.hydration);
        expect(next.poolishMass).toBe(defaults.poolishMass);
        expect(close(after.flour, 200)).toBe(true);
        expect(close(after.totalFlour, 200 + before.poolishFlour)).toBe(true);
        // total respects hydration
        expect(close(next.total, after.totalFlour * 1.7)).toBe(true);
    });
});

describe("applyWaterChange", () => {
    it("changes total water, keeps hydration + poolish", () => {
        const next = applyWaterChange(defaults, 150);
        const before = derive(defaults);
        const after = derive(next);
        expect(close(after.water, 150)).toBe(true);
        expect(close(after.totalWater, 150 + before.poolishWater)).toBe(true);
        expect(close(after.totalWater / after.totalFlour, defaults.hydration / 100)).toBe(true);
    });

    it("hydration=0 → no-op (no div-by-zero)", () => {
        const s: NeapolitanState = { ...defaults, hydration: 0 };
        expect(applyWaterChange(s, 100)).toEqual(s);
    });
});

describe("applyTotalChange / applyBallWeightChange / applyServingsChange", () => {
    it("total: only total changes", () => {
        const next = applyTotalChange(defaults, 920);
        expect(next.total).toBe(920);
        expect(next.hydration).toBe(defaults.hydration);
        expect(next.ballWeight).toBe(defaults.ballWeight);
    });

    it("ballWeight: only ballWeight changes; servings recomputes", () => {
        const next = applyBallWeightChange(defaults, 250);
        expect(next.ballWeight).toBe(250);
        expect(next.total).toBe(defaults.total);
        expect(derive(next).servings).toBe(1.8); // 460/250 = 1.84 → 1.8
    });

    it("servings: total = servings × ballWeight", () => {
        const next = applyServingsChange(defaults, 3);
        expect(next.total).toBe(3 * defaults.ballWeight);
        expect(derive(next).servings).toBe(3);
    });
});

describe("applyPoolishMassChange / applyPoolishHydrationChange", () => {
    it("mass changes: hydration + total fixed, rest recomputes", () => {
        const next = applyPoolishMassChange(defaults, 300);
        const after = derive(next);
        const before = derive(defaults);
        expect(next.total).toBe(defaults.total);
        expect(next.hydration).toBe(defaults.hydration);
        expect(close(after.totalFlour, before.totalFlour)).toBe(true);
        // rest = total - poolish (new split)
        expect(close(after.flour, after.totalFlour - after.poolishFlour)).toBe(true);
        expect(close(after.water, after.totalWater - after.poolishWater)).toBe(true);
        // poolish 300g @ 100% → 150/150
        expect(close(after.poolishFlour, 150)).toBe(true);
        expect(close(after.poolishWater, 150)).toBe(true);
    });

    it("poolish hydration changes: poolish split changes, totals unchanged", () => {
        const next = applyPoolishHydrationChange(defaults, 50); // 200g @ 50%
        const after = derive(next);
        // 200 / 1.5 ≈ 133.33 flour, 66.67 water
        expect(close(after.poolishFlour, 200 / 1.5)).toBe(true);
        expect(close(after.poolishWater, 200 - 200 / 1.5)).toBe(true);
        expect(close(after.totalFlour, 460 / 1.7)).toBe(true);
    });
});

describe("applySaltPercentChange", () => {
    it("only saltWeight recomputes", () => {
        const next = applySaltPercentChange(defaults, 3);
        const before = derive(defaults);
        const after = derive(next);
        expect(close(after.totalFlour, before.totalFlour)).toBe(true);
        expect(close(after.saltWeight, (before.totalFlour * 3) / 100)).toBe(true);
    });
});

describe("applyPoolishToggle", () => {
    it("off: poolish flour/water=0, totals unchanged (total + hydration anchored)", () => {
        const next = applyPoolishToggle(defaults, false);
        const before = derive(defaults);
        const after = derive(next);
        expect(after.poolishFlour).toBe(0);
        expect(after.poolishWater).toBe(0);
        expect(close(after.totalFlour, before.totalFlour)).toBe(true);
        expect(close(after.totalWater, before.totalWater)).toBe(true);
        // rest now == total (no subtraction)
        expect(close(after.flour, after.totalFlour)).toBe(true);
        expect(close(after.water, after.totalWater)).toBe(true);
    });

    it("memory: toggling off then on restores poolish split", () => {
        const off = applyPoolishToggle(defaults, false);
        const back = applyPoolishToggle(off, true);
        expect(back.poolishMass).toBe(defaults.poolishMass);
        expect(back.poolishHydration).toBe(defaults.poolishHydration);
        const d = derive(back);
        expect(close(d.poolishFlour, 100)).toBe(true);
        expect(close(d.poolishWater, 100)).toBe(true);
    });
});
