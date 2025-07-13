import { getUser } from "@/core/user.core";
import UserProvider from "@/app/_components/user-provider";
import QueryProvider from "@/app/_components/query-client-provider";
import KeimoProvider from "@/app/_components/keimo-provider";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return (
    <>
      <QueryProvider>
        <UserProvider user={user}>
          <KeimoProvider>{children}</KeimoProvider>
        </UserProvider>
      </QueryProvider>
    </>
  );
}
