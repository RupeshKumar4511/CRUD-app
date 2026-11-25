import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form'
import UserCard from './UserCard';
const Home = () => {
  const { register, handleSubmit } = useForm();
  const formRef = useRef(null);
  const [users, setUsers] = useState(null);

  const createUser = async (data) => {
    const response = await fetch("http://localhost:3000/user/create",
      {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(data)
      });
    const result = await response.json(response);
    console.log(result)
    alert(result?.msg)
  }

  const updateUser = async (data) => {
    const response = await fetch(`http://localhost:3000/user/update/${data?.id}`,
      {
        method: "PUT",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(data)
      })
    const result = await response.json(response);
    alert(result?.msg)

  }

  const deleteUser = async (data) => {
    const response = await fetch(`http://localhost:3000/user/delete/${data?.id}`,
      {
        method: "DELETE",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(data)
      })
    const result = await response.json(response);
    alert(result?.msg)

  }

  const onSubmit = (data) => {
    console.log(data)
    if (data?.method == 'POST') {
      createUser(data)
    } else if (data?.method == "PUT") {
      updateUser(data)
    } else if (data?.method == "DELETE") {
      deleteUser(data);
    }
  }


  useEffect(() => {
    fetch("http://localhost:3000/user").then((res)=>res.json()).then((res)=>{
      setUsers(res?.users)
    })
  }, [])




  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" id="name" {...register("name", { required: "required" })} />
        <br />
        <label htmlFor="email">Email : </label>
        <input type="email" name="email" id="email" {...register("email", { required: "required" })} />
        <br />
        <label htmlFor="id">ID: </label>
        <input type="text" name="id" id="id" {...register("id")} />
        <br />
        <p style={{ "color": "red" }}>Id is required for the PUT and DELETE API method</p>
        <label htmlFor="method">API Method : </label>
        <select name="method" id="method" {...register("method", { required: "API method is required" })}>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
        <br />
        <button type='submit'>submit</button>
      </form>

      <br />
      <br />

      <p>Users Data </p>
      {
        users &&
        users?.map((user,key) => <UserCard key={key} user={user} />
        )

      }
    </div>
  )
}

export default Home
