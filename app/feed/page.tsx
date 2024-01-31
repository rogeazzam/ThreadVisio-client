"use client"

import { UserAuth } from '@/auth'
import React from 'react'

const Feed = ({ user }: any) => {
    return (
        <main className="overflow-hidden">
            <div className="flex-1 padding-x pt-36">
                User Logged In
            </div>
        </main>
    )
}

export default UserAuth(Feed)