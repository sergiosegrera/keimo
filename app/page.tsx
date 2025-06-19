import { getUsers } from "@/core/user.core";

export default async function Home() {
  const users = await getUsers();

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-2xl font-serif">Users</h1>
      {users.length === 0 && <p>No users found</p>}
      {users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.user_id}>
              <p className="text-lg">{user.user_id}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
