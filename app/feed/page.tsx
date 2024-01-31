"use client"

import { UserAuth } from '@/auth'
import { UserNavbar } from '@/components'
import { UserProps } from '@/types'
import React from 'react'
import CustomerFeed from './feedpages/CustomerFeed'
import EmployeeFeed from './feedpages/EmployeeFeed'
import ManagerFeed from './feedpages/ManagerFeed'

const Feed = ({ user }: { user: UserProps }) => {
    const isCustomer = (user.role === 'customer');
    const isEmployee = (user.role === 'employee');

    const Logout = async () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = "/";
    }

    const options = [
        { title: "Settings", url: "/", onclick: Logout },
        { title: "Featured", url: "/", onclick: Logout },
        { title: "Orders", url: "/", onclick: Logout },
        { title: "Logout", url: "/", onclick: Logout },
    ];

    return (
        <>
            <UserNavbar
                title1={isCustomer ? 'Design it yourself' : (isEmployee ? 'Users complaints' : 'Update prices')}
                url_path1={isCustomer ? '/feed/designer' : (isEmployee ? '/' : '/')}
                title2={isCustomer ? 'Cart' : (isEmployee ? '' : '')}
                options={options}
            />
            
            {user.role === 'customer' && <CustomerFeed user={user} />}
            {user.role === 'employee' && <EmployeeFeed user={user} />}
            {user.role === 'manager' && <ManagerFeed user={user} />}
        </>
    )
}

export default UserAuth(Feed)