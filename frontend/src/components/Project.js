import React from 'react'
import {
  Link,
  useParams
} from "react-router-dom";


const ProjectListItem = ({item, deleteProject}) => {
    let link_to = `/project/${item.id}`
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.repository}</td>
            <td><Link to={link_to}>Detail</Link></td>
            <td><button onClick={()=>deleteProject(item.id)} type="button" className="button is-danger is-small is-rounded">Delete</button></td>
        </tr>
    )
}

const ProjectList = ({items, projectSubstr,deleteProject}) => {
    //console.log(users)
    return (
        <table className="table">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Repository</th>
                <th></th>
                <th></th>
            </tr>
            {/*Filter by name */}
            { items.map((item) => {
                console.log(`l34:item -${item}`)
                if (!projectSubstr || item.name.includes(projectSubstr)) {
                    return (
                        <ProjectListItem key={ item.id } item={ item } deleteProject={ deleteProject }/>
                    )}
                }
            )}
            <Link to='/projects/create' className="button is-info">Create</Link>
        </table>
    )
}

const ProjectUserItem = ({item}) => {
    return (
    <li>
        {item.username} ({item.email})
    </li>
    )
}

const ProjectDetail = ({getProject, item}) => {

    console.log(`getProject ${getProject}` )
    let { id } = useParams();

    getProject( id )
    let users = item.users ? item.users : []


    return (
        <div>
            <h1>{item.name}</h1>
            Repository: <a href={item.repository}>{item.repository}</a>
            <p></p>
            Users:
            <ol>
                 {users?.map((user) => <ProjectUserItem item={user} />)}
            </ol>
        </div>
    )
}

export {ProjectDetail, ProjectList}