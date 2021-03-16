import * as d3 from "d3";

export async function drawLineChart() {
  // write your code here
  try {
    return d3.json("./data.json", () => {});
  } catch (e) {
    console.log(e.message);
  }
}
