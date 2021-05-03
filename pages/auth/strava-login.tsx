import { access } from "fs";
import React from "react";

const scopes = [
  // Read public segments, public routes, public profile data, public posts, public events, club feeds, and leaderboards
  "read",
  // Read private routes, private segments, and private events for the user
  "read_all",
  // Read all profile information even if the user has set their profile visibility to Followers or Only You
  "profile:read_all",
  // Update the user's weight and Functional Threshold Power (FTP), and access to star or unstar segments on their behalf
  "profile:write",
  // Read the user's activity data for activities that are visible to Everyone and Followers, excluding privacy zone data
  "activity:read",
  // The same access as activity:read, plus privacy zone data and access to read the user's activities with visibility set to Only You
  "activity:read_all",
  // Access to create manual activities and uploads, and access to edit any activities that are visible to the app, based on activity read access level
  "activity:write",
];
const oauthPage = `https://www.strava.com/oauth/authorize?client_id=51600&response_type=code&redirect_uri=http://localhost:3000/auth/strava-approval&approval_prompt=force&scope=${scopes.join(
  ","
)}`;

export default function AuthStrava() {
  return (
    <div>
      <a href={oauthPage}>Auth It</a>
    </div>
  );
}
