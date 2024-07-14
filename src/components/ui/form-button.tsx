import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";
import { AlertDialogHeader } from "./alert-dialog";
import { Label } from "./label";
import { Input } from "./input";

type Props = {
  variant?: "default" | "destructive" | "outline" | "ghost" | "link";
  buttonText: string | React.ReactNode;
  dialogTItle: string;
  dialogContent: React.ReactNode;
};

export default function FormButton({
  variant,
  buttonText,
  dialogTItle,
  dialogContent,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <Button variant={variant}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent>
        <AlertDialogHeader>
          <DialogTitle className="text-xl">{dialogTItle}</DialogTitle>
        </AlertDialogHeader>
        {dialogContent}
      </DialogContent>
    </Dialog>
  );
}
