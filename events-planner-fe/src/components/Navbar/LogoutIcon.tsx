import { ExitIcon } from "@radix-ui/react-icons";

import { useAuth } from "~/auth/useAuth";
import { ConfirmDialog, CustomButton } from "~/components/UI";
import { BUTTON_SIZES, BUTTON_VARIANTS } from "~/config/styleConstants";

export default function LogoutIcon() {
  const { logout } = useAuth();

  return (
    <ConfirmDialog
      title="Log out"
      confirmText="Log out"
      description="Are you sure you want to log out?"
      onConfirm={logout}
      trigger={
        <CustomButton
          variant={BUTTON_VARIANTS.GHOST.value}
          size={BUTTON_SIZES.ICON.value}
          aria-label="Log out"
          icon={<ExitIcon width={18} height={18} />}
          className="text-red-600"
        />
      }
    />
  );
}
