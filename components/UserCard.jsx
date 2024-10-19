import Image from 'next/image'

export default function UserCard({user}){
    return(
    <>
    <Image src={user.avatar} alt={user.first_name} width={100} height={100} />
    <h3>{user.first_name} {user.last_name}</h3>
    </>
    )
}