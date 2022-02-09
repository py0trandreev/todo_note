import React from 'react'
import {Link} from "react-router-dom";



const TodoItem = ({todo, deleteTodo}) => {
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
           <td>
               <button onClick={ () => deleteTodo(todo.id) }
                       type="button"
                       className="button is-danger is-small is-rounded"
               >Delete
               </button>
           </td>

       </tr>
   );
}

const TodoList = ({items, deleteTodo}) => {
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
            <th></th>
            {items?.map((todo) => <TodoItem todo={todo} key={todo.id} deleteTodo={deleteTodo}/>)}
            <Link to='/todos/create' className="button is-info">Create</Link>
        </table>
    )
 }

 export default TodoList