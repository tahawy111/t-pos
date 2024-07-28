import { getAuthSession } from "@/lib/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  console.log({session});
  
  return <div>{children}</div>;
}
