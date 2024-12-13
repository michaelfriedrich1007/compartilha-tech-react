import { UserCard, UserForm } from "./components";
import { useGetUsers } from "./api";

export default function App() {
  const { data: userList } = useGetUsers()

  return (
    <div className="flex flex-col gap-2">
      <UserForm />

      {userList?.map((user) => {
        return (
          <UserCard user={user} />
        )
      })}
    </div>
  );
}
