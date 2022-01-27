import React from 'react'



const TodoItem = ({todo}) => {
   return (
       <tr>
           <td>
                {todo.id}
           </td>
           <td>
                {todo.text}
           </td>
           <td>
               {todo.created_at}
           </td>
       </tr>
   );
}

const TodoList = ({items}) => {
    return (
        <table className="table">
            <th>
                Todo id
            </th>
            <th>
                Todo text 
            </th>
            <th>
                Created at
            </th>
            {items?.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
 }

 export default TodoList