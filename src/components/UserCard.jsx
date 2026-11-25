const UserCard = ({user}) => {
  // console.log(user)
  return (
    <div>
      <ul>
        <li><b>Id</b> : {user?._id}</li>
        <li><b>Username</b> : {user?.name}</li>
        <li><b>Email</b>: {user?.email}</li>

      </ul>
    </div>
  )
}

export default UserCard
