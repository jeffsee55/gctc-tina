import { handleStrava } from "../pages/auth/strava";

// const meh = {} as T.u

// meh.page

const api_url = "https://www.strava.com/api/v3";

const getAthlete = async (params) => {
  return handleStrava(params);
};

// const getWorkout = async ({headers: Headers, id: string}) => {
//   const workout = await fetch(`${api_url}/activities/${id}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

//   const meh = await workout.json();

// }
export const strava = {
  getAthlete,
};
