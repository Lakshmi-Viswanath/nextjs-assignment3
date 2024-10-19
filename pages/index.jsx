import UserCard from "@/components/UserCard";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import {useState} from 'react';


export default function Home({users, total_pages}) {
  const router = useRouter();
  const [searchQuery , setSearchQuery] = useState('');

  const handleSubmit = (e) =>{
      e.preventDefault();
      if(searchQuery.trim()){
          router.push(`/search?query=${searchQuery}`)
      }
  }
  return (
    <>
     <h1>Search Users</h1>
     <form onSubmit={handleSubmit}>
     <input type='text' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='searcg by name' />
      <button type='submit'>Search</button>
      </form> 
      <h1>User List</h1>
    {  users.map(user =>(
      <UserCard key={user.id} user={user} />
     ))}  
     <div>
        {Array.from({ length: total_pages }).map((_, index) => (
          <Link key={index} href={`/?page=${index + 1}`}>
            {index + 1}
          </Link>
        ))}
      </div>           
    </>
  );
}

export async function getServerSideProps({query}){
  const page = query.page || 1;
  const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
 
  return {
    props:{
      users : res.data.data,
      total_pages : res.data.total_pages
    }
  }
}