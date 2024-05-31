import { SetStateAction, Dispatch } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction,
} from "@repo/ui/alert-dialog";

type AlertProps = {
  open: boolean;
  openChange: Dispatch<SetStateAction<boolean>>;
};
const CustomAnswerRequiredAlert = ({ open, openChange }: AlertProps) => {
  return (
    <AlertDialog open={open} onOpenChange={() => openChange(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>
            Custom answer can not be empty!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { CustomAnswerRequiredAlert };
