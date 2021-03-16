const paces = require("./price-chart-2");

export const chart = {
  "5k": {
    display: "5k",
    value: "5k",
    free: {
      paces: [
        { value: "Low", zone: "low" },
        { value: "Medium", zone: "medium" },
        { value: "High", zone: "high" },
      ],
      ranges: {
        low: {
          mileage: [5, 15],
          features: [
            "Couch to 5k Program",
            "4 days of Run/Walk combo",
            "1-2 Cross Training sessions per week",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
        medium: {
          mileage: [15, 30],
          features: [
            "5 to 6 runs",
            "1 Interval Session",
            "1 Long Run (max 8 miles)",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
        high: {
          mileage: [30, 45],
          features: [
            "5 to 7 runs",
            "1 Interval Session",
            "1 Aerobic Run",
            "1 Long Run (max 9 miles)",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
      },
    },
    pro: {
      paces: paces["5k"],
      ranges: {
        low: {
          price: 40,
          mileage: [5, 15],
          features: [
            "Couch to 5k Program",
            "4 days of Run/Walk combo",
            "1-2 Cross Training sessions per week",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
        medium: {
          price: 60,
          mileage: [20, 30],
          features: [
            "5 to 6 runs",
            "1 Interval Session",
            "1 Long Run (max 8 miles)",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
        high: {
          price: 60,
          mileage: [40, 50],
          features: [
            "5 to 7 runs",
            "1 Interval Session",
            "1 Aerobic Run",
            "1 Long Run (max 8 miles)",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
        advanced: {
          price: 60,
          mileage: [55, 70],
          features: [
            "6 to 9 runs",
            "1 Interval Session",
            "1 Aerobic Run",
            "1 Long Run (max 12-14 miles)",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
      },
    },
  },
  "10k": {
    display: "10k",
    value: "10k",
    free: {
      paces: [
        { value: "Low", zone: "low" },
        { value: "Medium", zone: "medium" },
        { value: "High", zone: "high" },
      ],
      ranges: {
        low: {
          mileage: [10, 20],
          features: [
            "Couch to 10k Program",
            "4 days of Run/Walk combo",
            "1-2 Cross Training sessions per week",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
        medium: {
          mileage: [25, 35],
          features: [
            "5 to 6 runs",
            "1 Interval Session",
            "1 Long Run (max 10 miles)",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
        high: {
          mileage: [35, 50],
          features: [
            "5 to 7 runs",
            "1 Interval Session",
            "1 Aerobic Run",
            "1 Long Run (max 13 miles)",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
      },
    },
    pro: {
      paces: paces["10k"],
      ranges: {
        low: {
          price: 50,
          mileage: [10, 25],
          paces: [],
          features: [
            "Couch to 10k Program",
            "5 days of Run/Walk combo",
            "1-2 Cross Training sessions per week",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
        medium: {
          price: 60,
          mileage: [25, 40],
          paces: [],
          features: [
            "5 runs",
            "1 Interval Session",
            "1 Long Run (max 10 miles)",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
        high: {
          price: 60,
          paces: [],
          mileage: [50, 60],
          features: [
            "5 to 7 runs",
            "1 Interval Session",
            "1 Aerobic Run",
            "1 Mid-Week Longer Run",
            "1 Long Run (max 13-15 miles)",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
        advanced: {
          price: 60,
          mileage: [65, 80],
          paces: [],
          features: [
            "6 to 9 runs",
            "1 Interval Session",
            "1 Aerobic Run",
            "1 Mid-Week Longer Run",
            "1 Long Run (max 13-15 miles)",
            "4 Tips per (Drills, Weights, Nutrition, Mindfulness)",
          ],
        },
      },
    },
  },
  "half-marathon": {
    display: "Half Marathon",
    value: "half-marathon",
    free: {
      paces: [
        { value: "Low", zone: "low" },
        { value: "Medium", zone: "medium" },
        { value: "High", zone: "high" },
      ],
      ranges: {
        low: {
          mileage: [15, 25],
          features: [
            "Couch to Half Program",
            "4 days of Run/Walk combo",
            "1 Long Run (max 11 miles)",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
        medium: {
          mileage: [25, 40],
          features: [
            "5 to 6 runs",
            "1 Interval Session",
            "1 Long Run (max 12 miles)",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
        high: {
          mileage: [35, 45],
          features: [
            "5 to 7 runs",
            "1 Interval Session",
            "1 Aerobic Run",
            "1 Long Run (max 14 miles)",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
      },
    },
    pro: {
      paces: paces["half-marathon"],
      ranges: {
        low: {
          price: 60,
          mileage: [20, 30],
          paces: [],
          features: [
            "4 runs",
            "1 Interval Session",
            "1 Long Run (max 10-11 miles)",
            "For Novice Half Marathoners",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
        medium: {
          price: 60,
          mileage: [35, 45],
          paces: ["1.35", "1.40", "1.45", "1.50"],
          features: [
            "4 to 5 runs",
            "1 Interval Session",
            "1 Aerobic Run",
            "1 Long Run (max 11-13 miles)",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
        high: {
          price: 60,
          mileage: [50, 65],
          paces: [],
          features: [
            "1 Interval Session",
            "1 Tempo Run",
            "1 Mid-Week Longer Run",
            "1 Long Run (max 12-14 miles)",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
        advanced: {
          price: 60,
          paces: [],
          mileage: [65, 80],
          features: [
            "1 Interval Session",
            "1 Tempo Run",
            "1 Mid-Week Longer Run",
            "1 Long Run (max 14-15 miles)",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
      },
    },
  },
  marathon: {
    display: "Marathon",
    value: "marathon",
    free: {
      paces: [
        { value: "Low", zone: "low" },
        { value: "Medium", zone: "medium" },
        { value: "High", zone: "high" },
      ],
      ranges: {
        low: {
          mileage: [20, 35],
          features: [
            "3 to 5 runs",
            "1 Interval Session",
            "1 Tempo Run",
            "1 Long Run (max 16-18 miles)",
          ],
        },
        medium: {
          mileage: [30, 45],
          features: [
            "3 to 6 runs",
            "1 Interval Session",
            "1 Tempo Run",
            "1 Long Run (max 19-20 miles)",
          ],
        },
        high: {
          mileage: [40, 55],
          features: [
            "5 to 7 runs",
            "1 Interval Session",
            "1 Tempo Run",
            "1 Long Run (max 21-22 miles)",
          ],
        },
      },
    },
    pro: {
      paces: paces["marathon"],
      ranges: {
        low: {
          price: 37.5,
          mileage: [30, 45],
          paces: [],
          features: [
            "3 to 5 runs",
            "1 Interval Session",
            "1 Progressive or Tempo Run",
            "1 Long Run (up to 16-18 miles)",
            "4 Marathon simulation runs",
            // "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
        medium: {
          price: 37.5,
          paces: [],
          mileage: [35, 50],
          features: [
            "4 to 6 runs",
            "1 Interval Session or Hill Circuit Workout",
            "1 Progressive or Tempo Run",
            "1 Long Run (up to 18-20 miles)",
            "4 Marathon simulation runs",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
        high: {
          price: 37.5,
          paces: [],
          mileage: [50, 65],
          features: [
            "5 to 7 runs",
            "1 Interval Session or Hill Circuit Workout",
            "1 Progressive or Tempo Run",
            "1 Long Run (up to 20-22 miles)",
            "4 Marathon simulation runs",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
        advanced: {
          price: 37.5,
          mileage: [65, 80],
          paces: [],
          features: [
            "6 to 9 runs",
            "1 Interval Session or Hill Circuit Workout",
            "1 Progressive or Tempo Run",
            "1 Long Run (up to 20-22 miles)",
            "4 Marathon simulation runs",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
      },
    },
  },
  "high-school": {
    display: "Summer Training",
    value: "high-school",
    pro: {
      paces: paces["high-school"],
      unit: "mileage",
      ranges: {
        level1: {
          price: 15,
          mileage: [30, 30],
          paces: [],
          features: [
            "4-5 days of running per week",
            "Peak weekly mileage of 30 miles",
            "Longest run - 8 miles",
            "A new drill series every week",
          ],
        },
        level2: {
          price: 15,
          paces: [],
          mileage: [35, 35],
          features: [
            "5-6 days of running per week",
            "Peak weekly mileage of 35 miles",
            "Longest run - 9 miles",
            "A new drill series every week",
          ],
        },
        level3: {
          price: 15,
          paces: [],
          mileage: [40, 40],
          features: [
            "5-6 days of running per week",
            "Peak weekly mileage of 40 miles",
            "Longest run - 10 miles",
            "A new drill series every week",
          ],
        },
        level4: {
          price: 15,
          mileage: [45, 45],
          paces: [],
          features: [
            "5-6 days of running per week",
            "Peak weekly mileage of 45 miles",
            "Longest run - 11 miles",
            "A new drill series every week",
          ],
        },
        level5: {
          price: 15,
          mileage: [50, 50],
          paces: [],
          features: [
            "5-6 days of running per week",
            "Peak weekly mileage of 50 miles",
            "Longest run - 11 miles",
            "A new drill series every week",
          ],
        },
        level6: {
          price: 15,
          mileage: [55, 55],
          paces: [],
          features: [
            "6 days of running per week",
            "Peak weekly mileage of 55 miles",
            "Longest run - 12 miles",
            "A new drill series every week",
          ],
        },
        level7: {
          price: 15,
          mileage: [60, 60],
          paces: [],
          features: [
            "6-7 days of running per week",
            "Peak weekly mileage of 60 miles",
            "Longest run - 12 miles",
            "A new drill series every week",
          ],
        },
      },
    },
  },
  "virtual-5k": {
    display: "Virtual Pride 5k",
    value: "virtual-5k",
    free: {
      paces: [
        { value: "Walkers", zone: "walkers" },
        { value: "Low", zone: "low" },
        { value: "Medium", zone: "medium" },
        { value: "High", zone: "high" },
      ],
      ranges: {
        walkers: {
          price: 35,
          mileage: [10, 15],
          paces: [],
          features: [
            "4 to 5 walks",
            "1 Long Run (max 14-15 miles)",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
        low: {
          price: 35,
          mileage: [15, 20],
          paces: [],
          features: [
            "4 to 5 runs",
            "1 Interval Session",
            "1 Tempo Run",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
        medium: {
          price: 35,
          paces: [],
          mileage: [20, 30],
          features: [
            "5 to 6 runs",
            "1 Interval Session",
            "1 Tempo Run",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
        high: {
          price: 35,
          paces: [],
          mileage: [50, 65],
          features: [
            "1 Interval Session",
            "1 Tempo Run",
            "1 Long Run (max 20-22 miles)",
            "4 Marathon Simulation Runs",
            "4 Tips - Drills, Weights, Nutrition, Mindfulness",
          ],
        },
      },
    },
    pro: {},
  },
};
