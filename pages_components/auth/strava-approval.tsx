import React from "react";
import Cookies from "cookies";

const client_secret = "c59cb40de83f45ab7624369122b86857e900ee28";
const client_id = "51600";
const api_url = "https://www.strava.com/api/v3";
const redirect_uri = "localhost:3000";
const oauthPage =
  "https://www.strava.com/oauth/authorize?client_id=51600&response_type=code&redirect_uri=http://localhost:2999/auth/strava-approval&approval_prompt=force&scope=profile:read_all";

export const getServerSideProps = async (params) => {
  const {
    query: { state, code, scope },
  } = params;
  const response = await exchange(code);

  const cookies = new Cookies(params.req, params.res);
  cookies.set("strava-access", response.access_token);

  return {
    redirect: {
      destination: `/auth/strava`,
      permanent: false,
    },
  };
  return { props: {} };
};

export default function AuthStrava() {
  return <div>You're in</div>;
}

const exchange = async (code: string) => {
  console.log("exchanging");
  const response = await fetch("https://www.strava.com/api/v3/oauth/token", {
    body: `client_id=${client_id}&client_secret=${client_secret}&code=${code}&grant_type=authorization_code`,
    ...requestHeaders,
  });

  return handleResponse(response, (json) => json);
};
const refresh = async (refresh_token: string) => {
  const response = await fetch("https://www.strava.com/api/v3/oauth/token", {
    body: `client_id=${client_id}&client_secret=${client_secret}&refresh_token=${refresh_token}&grant_type=refresh_token`,
    ...requestHeaders,
  });
  handleResponse(response, (json) => console.log(json));
};

const requestHeaders = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  method: "POST",
};

const handleResponse = async (
  response: Response,
  onSuccess: (json: unknown) => any
) => {
  if (response.status === 200) {
    const json = await response.json();
    const currentTimestamp = Math.floor(new Date().getTime() / 1000);
    return onSuccess(json);
  }
};
