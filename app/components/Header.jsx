import { useEffect } from 'react'
import { Link } from 'react-router'
import useOrderStore from '../lib/orderStore'

export default function Header() {
    const user = useOrderStore((user) => user);

    return (
        <div className="h-10 bg-blue-100 flex justify-between content-center">
            <div className="flex">
                <Link to={"/"} className='p-1'>
                Home
                </Link>
            </div>
            <div className="flex">
                <Link to={"/user"} className='p-1'>
                {user?.name || "Logged out"}
                </Link>
            </div>
        </div>
    )
}