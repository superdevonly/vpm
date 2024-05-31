import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction,
} from "@repo/ui/alert-dialog";
import { AlertProps } from "@/utils/types";

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
