import { useEffect } from 'react'
import { Link } from 'react-router'
import useOrderStore from '../lib/orderStore'

export default function Header() {
    const user = useOrderStore((state) => state.user);

    return (
        <div className="h-10 bg-blue-100 flex justify-between content-center">
            <div className="flex">
                <Link to={"/"} className='p-1'>
                    Home
                </Link>
                <Link to={"/audit-log"} className='p-1'>
                    Audit Log
                </Link>
                <Link to={"/triage-strat"} className='p-1'>
                Triage Strategy
                </Link>
            </div>
            <div className="flex">
                <Link to={"/user"} className='p-1'>
                {user?.name || "Logged out"} | {user != null && user.notifications.length}
                </Link>
            </div>
        </div>
    )
}