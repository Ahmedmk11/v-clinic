import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:10000/api/users')
            .then((response) => {
                setUsers(response.data)
            })
            .catch((error) => {
                console.error('Error fetching users:', error)
            })
    }, [])

    return (
        <div id='home-page'>
            <div id='home-container'>this is the home page</div>
            <h2>Users:</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        Name: {user.name}, Email: {user.email}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home
