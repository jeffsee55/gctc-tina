import Airtable from "airtable";

const key = "keyM1vyJV77YLgh5w";
const at = new Airtable({ apiKey: key });

export type EventSummary = {
  id: string;
  name: string;
  code: string;
  event: string;
  tier: string;
  map: { [key: string]: string };
  tables: string[];
};

const bases2: EventSummary[] = [
  {
    id: "appdoPIobunE8sNIE",
    name: "5k Silver",
    event: "5k",
    code: "5k.silver",
    tier: "silver",
    map: {
      free: "Free",
      "1900": "19:00",
      "2000": "20:00",
      "2200": "22:00",
      "2400": "24:00",
    },
    tables: ["Free", "24:00", "22:00", "20:00", "19:00"],
  },
  {
    id: "app06AFBAYfdt2sTV",
    name: "5k Gold",
    event: "5k",
    code: "5k.gold",
    tier: "gold",
    map: {
      free: "Free",
      "1600": "16:00",
      "1700": "17:00",
      "1800": "18:00",
      "1900": "19:00",
      "2000": "20:00",
    },
    tables: ["Free", "20:00", "19:00", "18:00", "17:00", "16:00"],
  },
  {
    id: "appYEq4RlMBKUXJRP",
    name: "5k Platinum",
    code: "5k.platinum",
    event: "5k",
    tier: "platinum",
    map: {
      free: "Free",
      "1530": "15:30",
      "1500": "15:00",
      "1415": "14:15",
    },
    tables: ["Free", "15:30", "15:00", "14:15"],
  },
  {
    id: "app5pVOKi5SQoUOeq",
    name: "10k Bronze",
    event: "10k",
    code: "10k.bronze",
    tier: "bronze",
    map: {
      free: "Free",
      "1900": "19:00",
      "2000": "20:00",
      "2200": "22:00",
      "2400": "24:00",
    },
    tables: ["Free", "24:00", "22:00", "20:00", "19:00"],
  },
  {
    id: "appdo19UzD2zP45Sj",
    name: "10k Silver",
    event: "10k",
    code: "10k.silver",
    tier: "silver",
    map: {
      free: "Free",
      "1900": "19:00",
      "2000": "20:00",
      "2200": "22:00",
      "2400": "24:00",
    },
    tables: ["Free", "24:00", "22:00", "20:00", "19:00"],
  },
  {
    id: "appANEzMqohTjqQYV",
    name: "10k Gold",
    event: "10k",
    code: "10k.gold",
    tier: "gold",
    map: {
      free: "Free",
      "1900": "19:00",
      "2000": "20:00",
      "2200": "22:00",
      "2400": "24:00",
    },
    tables: ["Free", "24:00", "22:00", "20:00", "19:00"],
  },
  {
    id: "appSxuwuB3wHHtGVA",
    name: "10k Platinum",
    event: "10k",
    code: "10k.platinum",
    tier: "platinum",
    map: {
      free: "Free",
      "1900": "19:00",
      "2000": "20:00",
      "2200": "22:00",
      "2400": "24:00",
    },
    tables: ["Free", "24:00", "22:00", "20:00", "19:00"],
  },
  {
    id: "appQQAnWJWoRAGdJt",
    name: "Half Marathon Bronze",
    code: "half-marathon.bronze",
    event: "half-marathon",
    tier: "bronze",
    map: {
      free: "Free",
      "230": "2:30",
      "220": "2:20",
      "210": "2:10",
      "200": "2:00",
    },
    tables: ["Free", "2:30", "2:20", "2:10", "2:00"],
  },
  {
    id: "appfwR3YNRJce9evh",
    name: "Half Marathon Silver",
    code: "half-marathon.silver",
    event: "half-marathon",
    tier: "silver",
    map: {
      free: "Free",
      "200": "2:00",
      "150": "1:50",
      "145": "1:45",
      "140": "1:40",
      "135": "1:35",
    },
    tables: ["Free", "2:00", "1:50", "1:45", "1:40", "1:35"],
  },
  {
    id: "appwZYbeplUOwLiui",
    name: "Half Marathon Gold",
    code: "half-marathon.gold",
    event: "half-marathon",
    tier: "gold",
    map: {
      free: "Free",
      "140": "1:40",
      "135": "1:35",
      "130": "1:30",
      "125": "1:25",
      "120": "1:20",
    },
    tables: ["Free", "1:40", "1:35", "1:30", "1:25", "1:20"],
  },
  {
    id: "appYckqsgqBpjCu2E",
    name: "Half Marathon Platinum",
    code: "half-marathon.platinum",
    event: "half-marathon",
    tier: "platinum",
    map: {
      free: "Free",
      "118": "1:18",
      "116": "1:16",
      "114": "1:14",
    },
    tables: ["Free", "1:18", "1:16", "1:14"],
  },
  {
    id: "app4ebN94zq2e87Qm",
    name: "Marathon Bronze",
    code: "marathon.bronze",
    event: "marathon",
    tier: "bronze",
    map: {
      free: "Free",
      "405": "4:05",
      "420": "4:20",
      "435": "4:35",
      "450": "4:50",
      "505": "5:05",
      "520": "5:20",
    },
    tables: ["Free", "5:20", "5:05", "4:50", "4:35", "4:20", "4:05"],
  },
  {
    id: "app2rIhJWdWr44Kzn",
    name: "Marathon Silver",
    code: "marathon.silver",
    event: "marathon",
    tier: "silver",
    map: {
      free: "Free",
      "405": "4:05",
      "420": "4:20",
      "435": "4:35",
      "450": "4:50",
      "505": "5:05",
      "520": "5:20",
    },
    tables: ["Free", "5:20", "5:05", "4:50", "4:35", "4:20", "4:05"],
  },
  {
    id: "appUnRHhE7R5ZOp0X",
    name: "Marathon Gold",
    code: "marathon.gold",
    event: "marathon",
    tier: "gold",
    map: {
      free: "Free",
      "340": "3:40",
      "335": "3:35",
      "330": "3:30",
      "325": "3:25",
      "320": "3:20",
      "310": "3:10",
      "305": "3:05",
      "300": "3:00",
    },
    tables: [
      "Free",
      "3:40",
      "3:35",
      "3:30",
      "3:25",
      "3:20",
      "3:10",
      "3:05",
      "3:00",
    ],
  },
  {
    id: "appRwp0dGj5qDLP4o",
    name: "Marathon Platinum",
    code: "marathon.platinum",
    event: "marathon",
    tier: "platinum",
    map: {
      free: "Free",
      "252": "2:52",
      "245": "2:45",
      "237": "2:37",
    },
    tables: ["Free", "2:52", "245", "237"],
  },
  // {
  //   id: "appRwp0dGj5qDLP4o",
  //   name: "Marathon Platinum",
  //   tables: ["Free", "2:52", "2:45", "2:37"],
  // },
  // {
  //   id: "appQQAnWJWoRAGdJt",
  //   name: "Half marathon Bronze",
  //   tables: ["Free", "2:30", "2:20", "2:10", "2:00"],
  // },
  // {
  //   id: "appfwR3YNRJce9evh",
  //   name: "Half marathon Silver",
  //   tables: ["Free", "2:00", "1:50", "1:45", "1:40", "1:35"],
  // },
  // {
  //   id: "appwZYbeplUOwLiui",
  //   name: "Half marathon Gold",
  //   tables: ["Free", "1:40", "1:35", "1:30", "1:25", "1:20"],
  // },
  // {
  //   id: "appYckqsgqBpjCu2E",
  //   name: "Half marathon Platinum",
  //   tables: ["Free", "1:18", "1:16", "1:14"],
  // },
  // {
  //   id: "appAFi6jOyBm29u9k",
  //   name: "5k Bronze",
  //   tables: ["Free", "30 min", "28 min", "26 min", "24 min"],
  // },
  // {
  //   id: "app5pVOKi5SQoUOeq",
  //   name: "10k Bronze",
  //   tables: ["Free", "50 min", "55 min", "50 min"],
  // },
  // {
  //   id: "appdo19UzD2zP45Sj",
  //   name: "10k Silver",
  //   tables: ["Free", "45:00", "42:00", "40:00", "38:00"],
  // },
  // {
  //   id: "appANEzMqohTjqQYV",
  //   name: "10k Gold",
  //   tables: ["Free", "40:00", "38:00", "36:00", "34:00", "33:00"],
  // },
  // {
  //   id: "appSxuwuB3wHHtGVA",
  //   name: "10k Platinum",
  //   tables: ["Free", "33:00", "32:00", "31:00", "30:00"],
  // },
];

export const getDetails = ({
  event,
  tier,
  pace,
}: {
  event: string;
  tier: string;
  pace: number;
}) => {
  const base = bases2.find((base2) => {
    return base2.event === event && base2.tier === tier;
  });
  if (!base) {
    throw new Error(`Unable to find event: ${event} and tier: ${tier}`);
  }
  return {
    ...base,
    pace: base.map[pace],
  };
};

export const getEvent = ({ event }: { event: string }) => {
  const bases = bases2.filter((base2) => base2.event === event);
  if (bases.length === 0) {
    throw new Error(`Unable to find details for event ${event}`);
  }
  return bases;
};

export const run = async () => {
  const res: any[] = [];
  await Promise.all(
    bases2.map(async (baseInfo) => {
      const base = at.base(baseInfo.id);
      return Promise.all(
        baseInfo.tables.map(async (tableName) => {
          try {
            await base
              .table(tableName)
              .select({
                // Selecting the first 3 records in Grid view:
                // maxRecords: 3,
                view: "Grid view",
              })
              .eachPage(async function page(records, fetchNextPage) {
                const accum = [];
                // This function (`page`) will get called for each page of records.

                records.forEach(
                  function(record) {
                    accum.push(record.fields);
                    // {
                    //   event: baseInfo.name,
                    //   name: tableName,
                    //   days: accum,
                    // },
                    res.push(record);

                    // To fetch the next page of records, call `fetchNextPage`.
                    // If there are more records, `page` will get called again.
                    // If there are no more records, `done` will get called.
                    fetchNextPage();
                    return true;
                  },
                  function done(err: string) {
                    if (err) {
                      console.error(err);
                      return false;
                    }
                  }
                );
              });
            return true;
          } catch (e) {
            console.log(e);
            return false;
          }
        })
      );
    })
  );
  console.log(res);
  return res;
};

export type Day = {
  Day: number;
  Notes: string;
  Title: string;
  Description: string;
};
export const getDays = async (params: {
  event: string;
  tier: string;
  pace: string;
}) => {
  const info = bases2.find(
    (item) => item.code === `${params.event}.${params.tier}`
  );
  const tableName = info?.map[params.pace];
  if (!info) {
    throw new Error(
      `Unable to find table for event ${params.event}, tier ${params.tier}`
    );
  }
  if (!tableName) {
    throw new Error(
      `Unable to find table for event ${params.event}, tier ${params.tier}`
    );
  }
  var base = new Airtable({ apiKey: "keyM1vyJV77YLgh5w" }).base(info.id);

  const records = await base(tableName)
    .select({
      view: "Grid view",
    })
    .firstPage()
    .catch((e) => {
      console.log("Oh no", e);
    });
  if (records) {
    return {
      details: { name: info.name, pace: tableName },
      days: records.map((record) => record.fields),
    };
  }
};
