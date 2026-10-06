import { Avatar, AvatarFallback, AvatarImage, avatarInitials } from "./avatar";

// Inline so the demo works offline: a real photo would be an unhandled request.
const portrait =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='lightgray'/%3E%3Ccircle cx='32' cy='24' r='11' fill='silver'/%3E%3Cpath d='M8 64a24 24 0 0 1 48 0z' fill='silver'/%3E%3C/svg%3E";

export function AvatarDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-4">
        <Avatar>
          <AvatarImage src={portrait} alt="" />
          <AvatarFallback>{avatarInitials("Francesca Rossi")}</AvatarFallback>
        </Avatar>

        {/* A missing image is the common case, not an edge case: the fallback is
            what most avatars show most of the time. */}
        <Avatar>
          <AvatarImage src="/avatar-does-not-exist.png" alt="" />
          <AvatarFallback>{avatarInitials("Ada Lovelace")}</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarFallback>{avatarInitials("Grace Hopper")}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <Avatar size="sm">
          <AvatarFallback>{avatarInitials("Lin Chen")}</AvatarFallback>
        </Avatar>
        <Avatar size="md">
          <AvatarImage src={portrait} alt="" />
          <AvatarFallback>{avatarInitials("Lin Chen")}</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>{avatarInitials("Lin Chen")}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Avatar>
          <AvatarImage src={portrait} alt="" />
          <AvatarFallback>{avatarInitials("Lin Chen")}</AvatarFallback>
        </Avatar>
        <div className="grid text-sm">
          <span className="font-medium">Lin Chen</span>
          <span className="text-muted-foreground">lin@company.com</span>
        </div>
      </div>
    </div>
  );
}
