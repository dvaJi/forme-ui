import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from "./tabs";

const panels: Record<string, string> = {
  overview:
    "Fourteen components, one token set and no runtime of their own. Everything you copy in stays yours to edit.",
  activity:
    "Arrow keys move between tabs, Home and End jump to the ends, and the underline glides to the selection rather than blinking.",
  settings:
    "The primitive measures the selected tab and publishes it as a CSS variable, so this component holds no refs and no observers.",
};

export function TabsDemo() {
  return (
    <div className="flex flex-col gap-8">
      <Tabs defaultValue="overview" className="w-full max-w-2xl">
        <TabsList aria-label="Sections">
          <TabsIndicator />
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="billing" disabled>
            Billing
          </TabsTrigger>
        </TabsList>

        {Object.entries(panels).map(([value, body]) => (
          <TabsContent key={value} value={value} className="pt-4 text-sm text-muted-foreground">
            {body}
          </TabsContent>
        ))}
      </Tabs>

      <Tabs defaultValue="usage" className="w-full max-w-2xl">
        <TabsList aria-label="Install">
          <TabsIndicator />
          <TabsTrigger value="usage">Install</TabsTrigger>
          <TabsTrigger value="cli">CLI</TabsTrigger>
        </TabsList>
        <TabsContent value="usage" className="pt-4 text-sm text-muted-foreground">
          One command, then the file lands in your project. No package to keep up to date.
        </TabsContent>
        <TabsContent value="cli" className="pt-4 text-sm text-muted-foreground">
          The CLI reads the same registry the site does, so{" "}
          <code className="font-mono">forme add dialog</code> always installs what the page shows.
        </TabsContent>
      </Tabs>
    </div>
  );
}
