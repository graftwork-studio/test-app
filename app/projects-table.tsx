"use client";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  type TableDensity,
  TableHeader,
  TableRow,
} from "@graftwork/ui";
import { useState } from "react";

const projects = [
  { id: "1", name: "Atlas", owner: "Priya Shah", status: "Live", updated: "18 Nov 2026" },
  { id: "2", name: "Beacon", owner: "Tom Okafor", status: "Draft", updated: "12 Nov 2026" },
  { id: "3", name: "Cobalt", owner: "Lena Fischer", status: "Live", updated: "3 Nov 2026" },
  { id: "4", name: "Delta", owner: "Sam Rivera", status: "Archived", updated: "28 Oct 2026" },
];

export function ProjectsTable() {
  const [density, setDensity] = useState<TableDensity>("comfortable");
  return (
    <div className="flex flex-col gap-3">
      <div>
        <Button
          variant="secondary"
          size="sm"
          onPress={() => setDensity(density === "comfortable" ? "compact" : "comfortable")}
        >
          {density === "comfortable" ? "Show compact rows" : "Show comfortable rows"}
        </Button>
      </div>
      <Table aria-labelledby="all-projects" density={density}>
        <TableHeader>
          <TableColumn isRowHeader>Project</TableColumn>
          <TableColumn>Owner</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Updated</TableColumn>
        </TableHeader>
        <TableBody items={projects}>
          {(project) => (
            <TableRow>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.owner}</TableCell>
              <TableCell>{project.status}</TableCell>
              <TableCell>{project.updated}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div>
        <Button variant="destructive" size="sm" isDisabled>
          Delete selected
        </Button>
      </div>
    </div>
  );
}
