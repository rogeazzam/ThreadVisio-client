import { UserProps } from '@/types'
import React, { useEffect } from 'react'

const CustomerFeed = ({ user }: { user: UserProps }) => {
    useEffect(() => {
      console.log(user);
    }, [])
    
    return (
        <main className="overflow-hidden">
            <div className="flex-1 padding-x pt-36">
                User Logged In
            </div>
        </main>
    )
}

export default CustomerFeed