import { useEffect, useRef, useState } from "react";
import axiosService from "./services/axiosService";

type User = {
  ID: string
  Name: string
  Age: number
  Active: boolean
  CreatedAt: string
  UpdatedAt: string
}

export default function App() {
  const nameRef = useRef<HTMLInputElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)
  const activeRef = useRef<HTMLInputElement>(null)
  const [userList, setUserList] = useState<User[]>([])

  useEffect(() => {
    async function getUsers() {
      const response = await axiosService.get("/person")
      setUserList(response.data)
    }

    getUsers()
  }, [])

  async function registerUser() {
    const name = nameRef.current?.value
    const age = ageRef.current?.value
    const active = activeRef.current?.value

    const response = await axiosService.post('/person', {
      name,
      age: parseInt(age ?? "0"),
      active: active === "Sim"
    })

    console.log('response', response)

    alert('Usuario criado com sucesso')
  }

  return (
    <div>
      <input placeholder="Nome" ref={nameRef} />
      <input placeholder="Idade" ref={ageRef} />
      <input placeholder="Ativo" ref={activeRef} />

      <button onClick={registerUser}>Registrar usuario</button>

      {userList.map((user) => {
        return (
          <div>
            <span>{user.Name}</span>
          </div>
        )
      })}
    </div>
  );
}
