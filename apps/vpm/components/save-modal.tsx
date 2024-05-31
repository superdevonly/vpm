import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/ui/alert-dialog";

const SaveModal = ({
  open,
  limitReached,
  onOpenChange,
  routeId,
}: {
  open: boolean;
  limitReached: boolean;
  onOpenChange: any;
  routeId: string;
}) => {
  const router = useRouter();
  const identifier = routeId === "app" ? "Gallery" : "Store";
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Saved to your {identifier}!</AlertDialogTitle>
          <AlertDialogDescription>
            Item has been saved to your {identifier}. Go to your {identifier} to
            see item.
            {limitReached && (
              <div className="mt-2">
                Unfortunately you've reached your current account limit for
                saved items. To get more you can buy more credits.
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              limitReached
                ? router.push(
                    process.env.NEXT_PUBLIC_CREDIT_PAYMENT_GATEWAY_URL!
                  )
                : routeId === "app"
                  ? router.push("/gallery")
                  : router.push("/download")
            }
          >
            {limitReached ? "Buy More Credits" : `Go To ${identifier}`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default SaveModal;
