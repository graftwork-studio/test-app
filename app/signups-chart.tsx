"use client";

import { BarChart } from "@graftwork/ui";

const data = [
  { month: "Jul", signups: 420, upgrades: 64 },
  { month: "Aug", signups: 510, upgrades: 71 },
  { month: "Sep", signups: 480, upgrades: 90 },
  { month: "Oct", signups: 620, upgrades: 104 },
];

export function SignupsChart() {
  return (
    <BarChart
      title="Sign-ups and upgrades"
      summary="Sign-ups grew from 420 in July to 620 in October. Upgrades rose every month, reaching 104."
      data={data}
      categoryKey="month"
      series={[
        { key: "signups", label: "Sign-ups" },
        { key: "upgrades", label: "Upgrades" },
      ]}
    />
  );
}
