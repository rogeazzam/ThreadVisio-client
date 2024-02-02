import { ClothCard } from '@/components';
import { ClothProps, UserProps } from '@/types'
import { fetchClothes, fetchWishList, addToWishList, removeFromWishList } from '@/utils';
import React, { useEffect, useState } from 'react'

const CustomerFeed = ({ user }: { user: UserProps }) => {
    const [clothes, setClothes] = useState<ClothProps[]>([]);
    const [wishList, setWishList] = useState<ClothProps[]>([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const data = await fetchClothes();
            const data2 = await fetchWishList();
            setClothes(data);
            setWishList(data2);
        } catch (error) {
            console.error('Error in fetchData:', error);
        }
    }

    const addToWishListTrig = async (cloth: ClothProps) => {
        const data = await addToWishList(cloth);
        setWishList(data);
    }

    const removeFromWishListTrig = async (cloth: ClothProps) => {
        const data = await removeFromWishList(cloth);
        setWishList(data);
    }

    return (
        <main className="overflow-hidden">
            <div className="flex-1 padding-x pt-36 pb-10">
                {
                    (
                        <div className='cloth-card-wrapper'>
                            {clothes !== null && clothes.map((option, index) => (
                                <ClothCard cloth={option} key={index}
                                    op2={wishList?.some(item => item.imageUrl === option.imageUrl)
                                        ? removeFromWishListTrig : addToWishListTrig}
                                    op2_title={wishList?.some(item => item.imageUrl === option.imageUrl)
                                        ? 'Remove from Cart' : 'Add to Cart'}
                                />
                            ))}
                        </div>
                    )
                }
            </div>
        </main>
    )
}

export default CustomerFeed