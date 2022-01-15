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
               {user.birthyear}
           </td>
       </tr>
   )
}

const UserList = ({users}) => {
    return (
        <table>
            <th>
                First name
            </th>
            <th>
                Last Name
            </th>
            <th>
                Birthday year
            </th>
            {users.map((user) => <UserItem user={user} />)}
        </table>
    )
 }

 export default UserList