import { NextApiRequest } from "next";
import { getSession} from 'next-auth/react'

import prismadb from './prismadb'

const serverAuth = async (req : NextApiRequest) => {
    const session = await getSession({req});

    if(!session?.user?.email) {
        throw new Error('로그인하지 않았습니다')
    }
    const currentUser = await prismadb.user.findUnique({
        where : {
            email : session.user.email
        }
    });

    if(!currentUser) {
        throw new Error('로그인하지 않았습니다')
    }
    return {currentUser}
}
export default serverAuth;