// pages/[page]/index.js
import UserCard from "@/components/UserCard";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Page({ users, total_pages }) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?query=${searchQuery}`);
        }
    };

    return (
        <>
            <h1>User List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Search by name'
                />
                <button type='submit'>Search</button>
            </form>
            {users.map(user => (
                <UserCard key={user.id} user={user} />
            ))}
            <div>
                {Array.from({ length: total_pages }).map((_, index) => (
                    <Link key={index} href={`${index + 1}`}>
                        {index + 1}
                    </Link>
                ))}
            </div>
        </>
    );
}

export async function getStaticPaths() {
    const res = await axios.get('https://reqres.in/api/users');
    const total_pages = res.data.total_pages;

    const paths = Array.from({ length: total_pages }, (_, index) => ({
        params: { page: (index + 1).toString() },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const res = await axios.get(`https://reqres.in/api/users?page=${params.page}`);
    return {
        props: {
            users: res.data.data,
            total_pages: res.data.total_pages,
        },
    };
}
