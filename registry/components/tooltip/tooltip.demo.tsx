import { Bell, Copy, Info, Settings, Trash2 } from "lucide-react";

import { Button } from "../../components/button/button";

import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" iconOnly leadingIcon={Copy} aria-label="Copy link" />
            </TooltipTrigger>
            <TooltipContent>Copy link</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" iconOnly leadingIcon={Bell} aria-label="Notifications" />
            </TooltipTrigger>
            <TooltipContent>
              <TooltipArrow />
              Three unread build notifications
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                iconOnly
                leadingIcon={Settings}
                aria-label="Workspace settings"
              />
            </TooltipTrigger>
            <TooltipContent>
              <TooltipArrow />
              Workspace settings
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                iconOnly
                leadingIcon={Trash2}
                aria-label="Delete deployment"
              />
            </TooltipTrigger>
            <TooltipContent>
              <TooltipArrow />
              Deployments can be restored for thirty days
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="small" leadingIcon={Info}>
                Read the changelog
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <TooltipArrow />
              Triggers are real buttons, so Tab reaches them and focus shows the tooltip too
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
