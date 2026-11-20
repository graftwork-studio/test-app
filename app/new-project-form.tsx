"use client";

import { Button, Input, Select, SelectItem } from "@graftwork/ui";
import { useState } from "react";

const regions = [
  { id: "eu", name: "Europe" },
  { id: "us", name: "United States" },
  { id: "apac", name: "Asia Pacific" },
];

export function NewProjectForm() {
  const [name, setName] = useState("");
  const [region, setRegion] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [created, setCreated] = useState<string | null>(null);

  const nameError = submitted && name.trim() === "" ? "Enter a project name." : undefined;
  const regionError = submitted && region === null ? "Choose a region." : undefined;

  return (
    <form
      noValidate
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
        setCreated(null);
        if (name.trim() !== "" && region !== null) {
          setCreated(name.trim());
          setName("");
          setRegion(null);
          setSubmitted(false);
        }
      }}
    >
      <Input
        label="Project name"
        name="name"
        isRequired
        value={name}
        onChange={setName}
        isInvalid={nameError !== undefined}
        errorMessage={nameError}
      />
      <Select
        label="Region"
        description="Where your project's data is stored."
        isRequired
        selectedKey={region}
        onSelectionChange={(key) => setRegion(key === null ? null : String(key))}
        isInvalid={regionError !== undefined}
        errorMessage={regionError}
      >
        {regions.map((r) => (
          <SelectItem key={r.id} id={r.id}>
            {r.name}
          </SelectItem>
        ))}
      </Select>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" variant="primary">
          Create project
        </Button>
        <Button
          variant="ghost"
          onPress={() => {
            setName("");
            setRegion(null);
            setSubmitted(false);
            setCreated(null);
          }}
        >
          Clear
        </Button>
      </div>
      <p role="status" className="text-sm text-text-success">
        {created ? `Created “${created}”.` : ""}
      </p>
    </form>
  );
}
