import React from "react";
import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { LinePath } from "@visx/shape";
import { Threshold } from "@visx/threshold";
import {
  useTooltip,
  useTooltipInPortal,
  TooltipWithBounds,
} from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { GridRows, GridColumns } from "@visx/grid";
import type { Interval } from "../../pages/dashboard/5k/[day]";
import { Duration } from "luxon";

export const background = "#f3f3f3";

const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };

export type ThresholdProps = {
  ints: Interval[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export function LineChart2({
  height = 400,
  margin = defaultMargin,
  ints,
}: ThresholdProps) {
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();
  // If you don't want to use a Portal, simply replace `TooltipInPortal` below with
  // `Tooltip` or `TooltipWithBounds` and remove `containerRef`
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // use TooltipWithBounds
    detectBounds: true,
    // when tooltip containers are scrolled, this will correctly update the Tooltip position
    scroll: true,
  });

  const handleMouseOver = (event, datum) => {
    const coords = localPoint(event.target.ownerSVGElement, event);
    showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: datum,
    });
  };

  const intervals = [];

  let prev;
  ints.forEach((int, index) => {
    let low;
    if (index === 0) {
      low = 0;
    } else {
      low = prev;
    }
    const high = low + int.interval;
    prev = high;
    intervals.push({ ...int, interval: low });
    intervals.push({ ...int, interval: high });
  });

  const durationScale = scaleLinear<number>({
    domain: [
      Math.min(...intervals.map((interval) => interval.interval)),
      Math.max(...intervals.map((interval) => interval.interval)),
    ],
    nice: true,
  });
  const hrScale = scaleLinear<number>({
    domain: [0.3, 1],
  });

  return (
    <ParentSize>
      {(parent) => {
        const xMax = parent.width - margin.left - margin.right;
        const yMax = height - margin.top - margin.bottom;

        durationScale.range([0, xMax]);
        hrScale.range([yMax, 0]);

        return (
          <div>
            <svg ref={containerRef} width={parent.width} height={height}>
              <rect
                x={0}
                y={0}
                width={parent.width}
                height={height}
                fill={background}
                rx={14}
              />
              <Group left={margin.left} top={margin.top}>
                <GridRows
                  scale={hrScale}
                  width={xMax}
                  numTicks={5}
                  height={yMax}
                  stroke="#e0e0e0"
                />
                <GridColumns
                  scale={durationScale}
                  width={xMax}
                  height={yMax}
                  stroke="#e0e0e0"
                />
                <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e0" />
                <AxisBottom
                  top={yMax}
                  scale={durationScale}
                  tickFormat={(num) =>
                    Duration.fromObject({ seconds: num.valueOf() }).toFormat(
                      "mm:ss"
                    )
                  }
                  numTicks={parent.width > 520 ? 10 : 5}
                />
                <AxisLeft scale={hrScale} numTicks={5} />
                <text x="-70" y="15" transform="rotate(-90)" fontSize={10}>
                  % of Max HR
                </text>

                {/* <Threshold<CityTemperature>
                  id={`${Math.random()}`}
                  data={cityTemperature2}
                  x={(d) => timeScale2(date(d)) ?? 0}
                  y0={(d) => temperature2Scale(ny(d)) ?? 0}
                  y1={(d) => temperature2Scale(sf(d)) ?? 0}
                  clipAboveTo={0}
                  clipBelowTo={yMax}
                  // curve={curveBasis}
                  belowAreaProps={{
                    fill: "green",
                    fillOpacity: 0.4,
                  }}
                  aboveAreaProps={{
                    fill: "red",
                    fillOpacity: 0.4,
                  }}
                /> */}
                {/* <LinePath
                  data={cityTemperature2}
                  // curve={curveBasis}
                  x={(d) => timeScale2(date(d)) ?? 0}
                  y={(d) => temperature2Scale(sf(d)) ?? 0}
                  stroke="#222"
                  strokeWidth={1.5}
                  strokeOpacity={0.8}
                  strokeDasharray="1,2"
                /> */}
                <LinePath
                  data={intervals}
                  onMouseOver={(event) => {
                    handleMouseOver(event, "");
                  }}
                  onMouseOut={hideTooltip}
                  x={(d) => durationScale(d.interval) ?? 0}
                  y={(d) => hrScale(d.percentHR) ?? 0}
                  stroke="#222"
                  strokeWidth={1.5}
                />
              </Group>
              {tooltipOpen && (
                <TooltipInPortal
                  // set this to random so it correctly updates with parent bounds
                  key={Math.random()}
                  top={tooltipTop}
                  left={tooltipLeft}
                >
                  Data value <strong>{tooltipData}</strong>
                </TooltipInPortal>
              )}
            </svg>
          </div>
        );
      }}
    </ParentSize>
  );
}
