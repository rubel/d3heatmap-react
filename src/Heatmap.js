import React, { useMemo } from "react";
import * as d3 from "d3";
import { data } from "./data";

function Heatmap() {
  const width = 288 * 3.3;
  const height = 70 * 3.3;

  const MARGIN = { top: 10, right: 10, bottom: 30, left: 50 };
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const allYGroups = useMemo(() => [...new Set(data.map((d) => d.y))], [data]);
  const allXGroups = useMemo(() => [...new Set(data.map((d) => d.x))], [data]);

  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([0, boundsWidth])
      .domain(allXGroups)
      .padding(0.01);
  }, [data, boundsWidth]);

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([boundsHeight, 0])
      .domain(allYGroups)
      .padding(0.01);
  }, [data, boundsHeight]);

  const getColorFromValue = (val) => {
    if (val <= 10) {
      return "#0071c1";
    }
    if (val > 10 && val <= 18) {
      return "#26a3fe";
    }
    if (val > 18 && val <= 24) {
      return "#7dc5f8";
    }
    if (val > 24 && val <= 28) {
      return "#7dc5f8";
    }
    if (val > 28 && val <= 30) {
      return "#f49f95";
    }
    if (val > 30 && val <= 33) {
      return "#f57f74";
    }
    return "#f52b25";
  };

  const allRects = data.map((d, i) => {
    return (
      <rect
        key={i}
        x={xScale(d.x)}
        y={yScale(d.y)}
        width={xScale.bandwidth()}
        height={yScale.bandwidth()}
        opacity={1}
        fill={getColorFromValue(d.value)}
      />
    );
  });

  const xLabels = allXGroups.map((name, i) => {
    const xPos = xScale(name) ?? 0;
    return (
      <text
        key={i}
        x={xPos + xScale.bandwidth() / 2}
        y={boundsHeight + 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
      >
        {name > 0 && name % 36 === 0 ? `${name / 12}:00` : ""}
      </text>
    );
  });

  const yLabels = allYGroups.map((name, i) => {
    const yPos = yScale(name) ?? 0;
    return (
      <text
        key={i}
        x={-5}
        y={yPos + yScale.bandwidth() / 2}
        textAnchor="end"
        dominantBaseline="middle"
        fontSize={10}
      >
        {name > 0 && name % 3 === 0 ? `${name} July` : ""}
      </text>
    );
  });
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {allRects}
          {xLabels}
          {yLabels}
        </g>
      </svg>
    </div>
  );
}

export default Heatmap;
