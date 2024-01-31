import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/context';
import { useRouter } from 'next/navigation';

const UserAuth = (Component: any) => {
    return (props: any) => {
        const { user = {} }: any = useContext(UserContext);
        const [loading, setLoading] = useState(true);
        const router = useRouter();

        useEffect(() => {
            const loadingTimeout = setTimeout(() => {
                setLoading(false);
            }, 800);

            return () => {
                clearTimeout(loadingTimeout);
            };
        }, []);

        useEffect(() => {
            if (user !== null) {
                setLoading(false);
            }
        }, [user]);

        if (loading) {
            return <div className='pt-36'>Loading...</div>;
        }

        if (!user || !user.email) {
            router.push('/signin');
            return null;
        }

        return user ? <Component {...props} user={user} /> : null;
    };
};

export default UserAuth;