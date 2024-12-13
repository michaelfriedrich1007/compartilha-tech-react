import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Switch from "../Switch";
import { useCreateUser } from "../../api/user";
import { useQueryClient } from "@tanstack/react-query";

type UserFormData = {
  name: string;
  age: string;
  active: boolean;
};

export default function UserForm() {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    age: "",
    active: true,
  });

  const { mutateAsync } = useCreateUser();

  const queryClient = useQueryClient();

  async function registerUser() {
    await mutateAsync({
      name: formData.name,
      age: formData.age,
      active: formData.active,
    });

    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] === "users",
    });

    setFormData({
      name: "",
      age: "",
      active: true,
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-2">
        <Input
          placeholder="Nome"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
        />
        <Input
          placeholder="Idade"
          type="number"
          value={formData.age}
          onChange={(e) => {
            setFormData({ ...formData, age: e.target.value });
          }}
        />
        <Switch
          checked={formData.active}
          onCheckedChange={(e) => {
            setFormData({ ...formData, active: e });
          }}
        />
      </div>

      <Button
        title="Registrar usuario"
        mode="primary"
        onClick={registerUser}
        className="max-w-64"
        
      />
    </div>
  );
}
