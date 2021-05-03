import Cookies from "cookies";
import * as Strava from "../../../lib/strava/types";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import getTime from "date-fns/getTime";

export const handleStrava = async (params) => {
  const cookies = new Cookies(params.req, params.res);
  const accessToken = cookies.get("strava-access");

  var date = new Date(parseInt(params.path[1]));
  const after = Math.floor(getTime(subDays(date, 5)) / 1000);
  const before = Math.floor(getTime(addDays(date, 100)) / 1000);

  const api = new Strava.ActivitiesApi({
    accessToken: accessToken,
  });
  const activities = await api.getLoggedInAthleteActivities(
    before,
    after,
    1,
    100
  );
  return activities;
};

export default async function handler(req, res) {
  const { path } = req.query;

  const result = await handleStrava({ req, res, path });
  res.status(200).json(result);
}
