"use client";

import { Button, Input, Select, SelectItem, cn } from "@graftwork/ui";
import {
  ArrowUpIcon,
  ChevronsUpDownIcon,
  FolderIcon,
  FullscreenIcon,
  GalleryVerticalEndIcon,
  LibraryIcon,
  MessageCircleIcon,
  MicIcon,
  MonitorIcon,
  PanelLeftIcon,
  PenToolIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
} from "lucide-react";
import * as React from "react";

/*
 * Built from the M8 Figma frame with @graftwork/ui components and semantic
 * tokens only. The design system has no Tabs, Textarea, Avatar, icon button or
 * sidebar navigation yet, so those are composed from Button and token classes.
 */

const WORKSPACES = ["Chat", "Assistant", "Design"] as const;

const NAV = [
  { label: "New chat", Icon: PlusIcon },
  { label: "Search", Icon: SearchIcon },
  { label: "Projects", Icon: FolderIcon },
  { label: "Library", Icon: LibraryIcon },
] as const;

const HISTORY = [
  { heading: "Pinned", chats: ["Checkout 500s"] },
  { heading: "Today", chats: ["Billing: build or buy", "Pricing page review", "Q3 churn spike"] },
] as const;

const SUGGESTIONS = [
  "Why is checkout throwing 500s?",
  "Review our pricing page",
  "Summarise this week's incidents",
] as const;

/** Square icon-only buttons. The label is for screen readers; Button keeps at least a 24px hit area. */
function IconButton({
  label,
  variant = "ghost",
  children,
  ...props
}: { label: string; variant?: "primary" | "secondary" | "ghost" } & Omit<
  React.ComponentProps<typeof Button>,
  "variant" | "size" | "children" | "aria-label"
> & { children: React.ReactNode }) {
  return (
    <Button variant={variant} size="sm" aria-label={label} className="w-8 px-0" {...props}>
      {children}
    </Button>
  );
}

export function ChatWorkspace() {
  const [workspace, setWorkspace] = React.useState<(typeof WORKSPACES)[number]>("Chat");
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [message, setMessage] = React.useState("");
  const messageRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex min-h-dvh flex-col bg-surface-subtle">
      {/* App chrome */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
        <div role="group" aria-label="Workspace" className="flex gap-1 rounded-lg bg-surface-default p-1">
          {WORKSPACES.map((name) => (
            <Button
              key={name}
              size="sm"
              variant={workspace === name ? "secondary" : "ghost"}
              aria-pressed={workspace === name}
              onPress={() => setWorkspace(name)}
            >
              {name === "Design" ? <PenToolIcon aria-hidden /> : null}
              {name}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <IconButton label="Refresh" variant="secondary">
            <RefreshCwIcon aria-hidden />
          </IconButton>
          <IconButton label="Display" variant="secondary">
            <MonitorIcon aria-hidden />
          </IconButton>
          <IconButton label="Full screen" variant="secondary">
            <FullscreenIcon aria-hidden />
          </IconButton>
        </div>
      </div>

      {/* Chat surface */}
      <div className="mx-1 mb-1 flex flex-1 flex-col gap-3 rounded-lg bg-surface-default p-3 lg:flex-row">
        <aside
          id="chat-sidebar"
          aria-label="Chats"
          className={cn(
            "flex-col gap-6 rounded-lg border border-border-default bg-surface-subtle p-4 lg:w-72 lg:shrink-0",
            sidebarOpen ? "flex" : "hidden",
          )}
        >
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-action-primary-bg text-text-on-primary">
              <GalleryVerticalEndIcon aria-hidden className="size-5" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="truncate text-md font-medium">Acme Inc.</p>
              <p className="truncate text-sm text-text-secondary">Enterprise</p>
            </div>
            <IconButton label="Switch organisation">
              <ChevronsUpDownIcon aria-hidden />
            </IconButton>
          </div>

          <nav aria-label="Chat tools">
            <ul className="flex flex-col gap-1">
              {NAV.map(({ label, Icon }) => (
                <li key={label}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Icon aria-hidden />
                    {label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          {HISTORY.map(({ heading, chats }) => (
            <section key={heading} aria-labelledby={`history-${heading}`} className="flex flex-col gap-1">
              <h2 id={`history-${heading}`} className="px-3 text-sm text-text-secondary">
                {heading}
              </h2>
              <ul className="flex flex-col gap-1">
                {chats.map((chat) => (
                  <li key={chat}>
                    <Button variant="ghost" className="w-full justify-start">
                      <span className="truncate">{chat}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <div className="mt-auto flex items-center gap-3">
            <span
              aria-hidden
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border-default bg-surface-default text-sm font-medium"
            >
              ST
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="truncate text-md font-medium">Sam Taylor</p>
              <p className="truncate text-sm text-text-secondary">sam@example.com</p>
            </div>
            <IconButton label="Switch account">
              <ChevronsUpDownIcon aria-hidden />
            </IconButton>
          </div>
        </aside>

        <main id="main" className="flex min-w-0 flex-1 flex-col gap-6">
          <header className="flex items-center gap-3">
            <IconButton
              label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
              aria-expanded={sidebarOpen}
              aria-controls="chat-sidebar"
              onPress={() => setSidebarOpen((open) => !open)}
            >
              <PanelLeftIcon aria-hidden />
            </IconButton>
            <span aria-hidden className="h-5 border-l border-border-default" />
            <h1 className="text-lg">New chat</h1>
          </header>

          <section
            aria-labelledby="welcome"
            className="flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-surface-subtle">
              <MessageCircleIcon aria-hidden className="size-5" />
            </span>
            <h2 id="welcome" className="text-lg font-medium">
              Good evening, Sam
            </h2>
            <p className="text-text-secondary">Ask a question, or start from one of these.</p>
            <ul aria-label="Suggestions" className="flex flex-col items-center gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <li key={suggestion}>
                  <Button
                    variant="secondary"
                    size="sm"
                    onPress={() => {
                      setMessage(suggestion);
                      messageRef.current?.focus();
                    }}
                  >
                    {suggestion}
                  </Button>
                </li>
              ))}
            </ul>
          </section>

          <form
            aria-label="New message"
            className="mx-auto flex w-full max-w-3xl flex-col gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              setMessage("");
            }}
          >
            <Input
              label="Message"
              placeholder="Ask anything…"
              value={message}
              onChange={setMessage}
              inputRef={messageRef}
            />
            <div className="flex flex-wrap items-end gap-2">
              <IconButton label="Add attachment">
                <PlusIcon aria-hidden />
              </IconButton>
              <Select label="Model" defaultSelectedKey="default" className="w-48">
                <SelectItem id="default">Default model</SelectItem>
                <SelectItem id="fast">Fast model</SelectItem>
              </Select>
              <div className="ml-auto flex gap-2">
                <IconButton label="Voice input">
                  <MicIcon aria-hidden />
                </IconButton>
                <IconButton label="Send message" variant="primary" type="submit" isDisabled={message.trim() === ""}>
                  <ArrowUpIcon aria-hidden />
                </IconButton>
              </div>
            </div>
            <p className="text-center text-sm text-text-secondary">
              AI can make mistakes. Verify important information.
            </p>
          </form>
        </main>
      </div>
    </div>
  );
}
