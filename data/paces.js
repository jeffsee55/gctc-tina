export const fiveK = {
  id: "5k",
  display: "5k",
  value: "5k",
  free: {
    paces: [
      {
        value: "Low",
        zone: "low",
      },
      {
        value: "Medium",
        zone: "medium",
      },
      {
        value: "High",
        zone: "high",
      },
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
    paces: [
      {
        value: "1415",
        zone: "advanced",
      },
      {
        value: "1500",
        zone: "advanced",
      },
      {
        value: "1530",
        zone: "advanced",
      },
      {
        value: "1600",
        zone: "high",
      },
      {
        value: "1700",
        zone: "high",
      },
      {
        value: "1800",
        zone: "high",
      },
      {
        value: "1900",
        zone: "high",
      },
      {
        value: "1900",
        zone: "medium",
      },
      {
        value: "2000",
        zone: "high",
      },
      {
        value: "2000",
        zone: "medium",
      },
      {
        value: "2200",
        zone: "medium",
      },
      {
        value: "2400",
        zone: "low",
      },
      {
        value: "2400",
        zone: "medium",
      },
      {
        value: "2600",
        zone: "low",
      },
      {
        value: "2800",
        zone: "low",
      },
      {
        value: "3000",
        zone: "low",
      },
    ],
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
};

export const tenK = {
  id: "10k",
  display: "10k",
  value: "10k",
  free: {
    paces: [
      {
        value: "Low",
        zone: "low",
      },
      {
        value: "Medium",
        zone: "medium",
      },
      {
        value: "High",
        zone: "high",
      },
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
};

export const halfMarathon = {
  id: "half-marathon",
  display: "Half Marathon",
  value: "half-marathon",
  free: {
    paces: [
      {
        value: "Low",
        zone: "low",
      },
      {
        value: "Medium",
        zone: "medium",
      },
      {
        value: "High",
        zone: "high",
      },
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
    paces: [
      {
        value: "11400",
        zone: "advanced",
      },
      {
        value: "11600",
        zone: "advanced",
      },
      {
        value: "11800",
        zone: "advanced",
      },
      {
        value: "12000",
        zone: "high",
      },
      {
        value: "12500",
        zone: "high",
      },
      {
        value: "13000",
        zone: "high",
      },
      {
        value: "13500",
        zone: "high",
      },
      {
        value: "13500",
        zone: "medium",
      },
      {
        value: "14000",
        zone: "high",
      },
      {
        value: "14000",
        zone: "medium",
      },
      {
        value: "14500",
        zone: "medium",
      },
      {
        value: "15000",
        zone: "medium",
      },
      {
        value: "20000",
        zone: "low",
      },
      {
        value: "20000",
        zone: "medium",
      },
      {
        value: "21000",
        zone: "low",
      },
      {
        value: "22000",
        zone: "low",
      },
      {
        value: "23000",
        zone: "low",
      },
    ],
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
};

export const marathon = {
  id: "marathon",
  display: "Marathon",
  value: "marathon",
  free: {
    paces: [
      {
        value: "Low",
        zone: "low",
      },
      {
        value: "Medium",
        zone: "medium",
      },
      {
        value: "High",
        zone: "high",
      },
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
    paces: [
      {
        value: "23700",
        zone: "advanced",
      },
      {
        value: "24500",
        zone: "advanced",
      },
      {
        value: "25200",
        zone: "advanced",
      },
      {
        value: "30000",
        zone: "high",
      },
      {
        value: "30500",
        zone: "high",
      },
      {
        value: "31000",
        zone: "high",
      },
      {
        value: "32000",
        zone: "high",
      },
      {
        value: "32500",
        zone: "high",
      },
      {
        value: "33000",
        zone: "high",
      },
      {
        value: "33500",
        zone: "high",
      },
      {
        value: "33500",
        zone: "medium",
      },
      {
        value: "34000",
        zone: "high",
      },
      {
        value: "34000",
        zone: "medium",
      },
      {
        value: "35000",
        zone: "medium",
      },
      {
        value: "35500",
        zone: "medium",
      },
      {
        value: "40500",
        zone: "low",
      },
      {
        value: "40500",
        zone: "medium",
      },
      {
        value: "42000",
        zone: "low",
      },
      {
        value: "42000",
        zone: "medium",
      },
      {
        value: "43500",
        zone: "low",
      },
      {
        value: "45000",
        zone: "low",
      },
      {
        value: "50500",
        zone: "low",
      },
      {
        value: "52000",
        zone: "low",
      },
    ],
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
};
