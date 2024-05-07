import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../utils/firebase/firebase'; // Update import path

const Logout: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        const signOut = async () => {
            try {
                await auth.signOut();
                router.push('/login');
            } catch (error) {
                console.error('Error signing out:', error);
            }
        };

        signOut();
    }, []);

    return <div>Logging out...</div>;
};

export default Logout;
