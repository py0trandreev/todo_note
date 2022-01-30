import React from 'react'



const UserItem = ({user}) => {
   return (
       <tr>
           <td>
               {user.first_name}
           </td>
           <td>
               {user.last_name}
           </td>
           <td>
               {user.email}
           </td>
       </tr>
   )
}

const UserList = ({users}) => {
    return (
        <table className="table">
            <thead>
                <th>
                    First name
                </th>
                <th>
                    Last Name
                </th>
                <th>
                    E-mail
                </th>
            </thead>
            <tbody>
                {users.map((user) => <UserItem user={user} />)}
            </tbody>
        </table>
    )
 }

 export default UserList