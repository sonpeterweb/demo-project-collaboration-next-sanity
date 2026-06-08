import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";

type AdminHeaderProps = {
  userName?: string | null;
};

export function AdminHeader({ userName }: AdminHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-muted-foreground text-sm">Signed in as</p>
        <p className="font-medium">{userName ?? "Admin"}</p>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <Button type="submit" variant="outline" size="sm">
          Sign out
        </Button>
      </form>
    </div>
  );
}
