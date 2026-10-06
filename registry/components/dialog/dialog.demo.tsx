import { X } from "lucide-react";

import { Button } from "../../components/button/button";
import { Input } from "../input/input";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

export function DialogDemo() {
  return (
    <div className="flex flex-col gap-8">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Rename workspace</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename workspace</DialogTitle>
            <DialogDescription>
              The new name is visible to everyone in the workspace, and old links still resolve.
            </DialogDescription>
          </DialogHeader>

          <Input label="Workspace name" defaultValue="acme" />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Save</Button>
            </DialogClose>
          </DialogFooter>

          <DialogClose
            aria-label="Close"
            className="absolute top-4 right-4 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <X />
          </DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="danger">Delete deployment</Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete web-2.4.0?</DialogTitle>
            <DialogDescription>
              Traffic moves to the previous deployment. The logs stay readable for thirty days.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Keep it</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="danger">Delete</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
