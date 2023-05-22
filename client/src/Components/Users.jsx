import {useState, useEffect} from "react";
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axios.get("/users", {
                    signal: controller.signal
                });
                if (isMounted) {
                    setUsers(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        getUsers().then(r => console.log(r));

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    return (
        <article>
            <h1>Users</h1>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={{i}}>{user?.email}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    );
}

export default Users;