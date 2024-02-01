import { ClothCard } from '@/components';
import { ClothProps, UserProps } from '@/types'
import fetchClothes from '@/utils';
import React, { useEffect, useState } from 'react'

const CustomerFeed = ({ user }: { user: UserProps }) => {
    const [clothes, setClothes] = useState<ClothProps[]>([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const data = await fetchClothes();
            setClothes(data);
        } catch (error) {
            console.error('Error in fetchData:', error);
        }
    }

    return (
        <main className="overflow-hidden">
            <div className="flex-1 padding-x pt-36 pb-10">
                {
                    (
                        <div className='cloth-card-wrapper'>
                            {clothes !== null && clothes.map((option, index) => (
                                <ClothCard cloth={option} key={index} />
                            ))}
                        </div>
                    )
                }
            </div>
        </main>
    )
}

export default CustomerFeed