import { UserProps } from '@/types'
import React from 'react'

const EmployeeFeed = ({ user }: { user: UserProps }) => {
  return (
    <main className="overflow-hidden">
      <div className="flex-1 padding-x pt-36">
        Employee Logged In
      </div>
    </main>
  )
}

export default EmployeeFeed