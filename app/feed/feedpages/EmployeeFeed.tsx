import { ClothCard, ClothDetails } from '@/components';
import { ClothProps, UserProps } from '@/types'
import { addCloth } from '@/utils';
import React, { useEffect, useState } from 'react'

const EmployeeFeed = ({ user }: { user: UserProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCloth, setSelectedCloth] = useState<ClothProps | null>(null);
  const [clothes, setClothes] = useState<ClothProps[]>([]);
  const [ind, setInd] = useState(0);
  const [data, setData] = useState<ClothProps | null>(null);

  useEffect(() => {
    if (data) {
      setClothes([...clothes, ...[data]]);
    }
  }, [data])


  const openClothDetails = (cloth: ClothProps | null) => {
    setSelectedCloth(cloth);
    setInd(ind + 1);
    setIsOpen(true);
  };

  const addClothTrig = async (cloth: ClothProps | null) => {
    if (!cloth) {
      return;
    }
    const item = await addCloth(cloth);
    setData(item);
  }

  return (
    <>
      <main className="overflow-hidden">
        <div className="flex-1 padding-x pt-36 pb-10">
          Employee Logged In

          <div className='cloth-card-wrapper'>
            {clothes !== null && clothes.length > 0 && clothes.map((option, index) => (
              <ClothCard cloth={option} key={index} op1_title='' op1_image='' op2_title='' op2_image='' />
            ))}

            <div className='cloth-card group'>
              <button className='relative m-auto h-40 text-5xl w-full'
                onClick={() => openClothDetails({
                  name: 'Name...',
                  price: 29.99,
                  color: 'black',
                  material: 'Silk',
                  size: 'm',
                  description: 'Description...',
                  quantity: 0,
                  imageUrl: '/question_mark.jpg',
                })}>
                +
              </button>
            </div>
          </div>
        </div>
      </main>

      {selectedCloth &&
        <ClothDetails key={ind} isOpen={isOpen} closeModal={() => setIsOpen(false)}
          cloth={selectedCloth} submitClothItem={addClothTrig} />
      }
    </>
  )
}

export default EmployeeFeed