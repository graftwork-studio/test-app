import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@graftwork/ui";
import { ComponentShowcase } from "@graftwork/ui/showcase";
import { NewProjectForm } from "./new-project-form";
import { ProjectsTable } from "./projects-table";
import { SignupsChart } from "./signups-chart";

/**
 * The sample page. It uses every @graftwork/ui component, styled only with
 * semantic tokens. ComponentShowcase comes from the package, so new components
 * appear here when @graftwork/ui updates. ThemeToggle and BarChart are left out
 * because this page already shows them. Replace it with your app's first real screen.
 */
export default function HomePage() {
  return (
    <>
      <section className="prose flex flex-col gap-2">
        <h1 className="text-3xl leading-heading font-semibold">Projects</h1>
        <p className="text-text-secondary">
          A sample screen that uses every component in the design system. Read the{" "}
          <a href="https://graftwork-studio.github.io/design-system/">component docs</a> to see each one on its own.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <Card>
          <CardHeader>
            <CardTitle>New project</CardTitle>
            <CardDescription>Give the project a name and choose where its data lives.</CardDescription>
          </CardHeader>
          <CardContent>
            <NewProjectForm />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <SignupsChart />
          </CardContent>
        </Card>
      </div>

      <section aria-labelledby="all-projects" className="flex flex-col gap-4">
        <h2 id="all-projects" className="text-xl leading-heading font-semibold">
          All projects
        </h2>
        <ProjectsTable />
      </section>

      <ComponentShowcase exclude={["ThemeToggle", "BarChart"]} />
    </>
  );
}
