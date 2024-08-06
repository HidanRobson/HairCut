import { auth } from "@/auth";
import { SignIn } from "@/components/auth/signin-button";
import { SignOut } from "@/components/auth/signout-button";

export default async function Page() {
  const session = await auth();

  if (
    !session?.user?.role.some((role) => ["funcionario", "admin"].includes(role))
  )
    return (
      <div>
        <p>Not authenticated</p>
        <SignIn />
      </div>
    );

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <SignOut />
    </div>
  );
}
