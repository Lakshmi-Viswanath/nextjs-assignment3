import axios from 'axios';
import UserCard from "@/components/UserCard";

export default function Search({ users, query }) {
    const filteredUsers = users.filter(user =>
        user.first_name.toLowerCase().includes(query.toLowerCase()) ||
        user.last_name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <h1>Search Results for "{query}"</h1>
            {filteredUsers.length > 0 ? (
                filteredUsers.map(user => <UserCard key={user.id} user={user} />)
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
}

export async function getServerSideProps(context) {
    const { query } = context;
    const res = await axios.get(`https://reqres.in/api/users`);
    const users = res.data.data;

    return {
        props: {
            users,
            query: query.query || '',
        },
    };
}
