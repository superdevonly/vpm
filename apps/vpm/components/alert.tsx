import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction,
} from "@repo/ui/alert-dialog";
import { AlertProps } from "@/utils/types";

const CustomAlert = ({ open, openChange, text }: AlertProps) => {
  return (
    <AlertDialog open={open} onOpenChange={() => openChange(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>{text}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { CustomAlert };
