import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prismadb from './prismadb'

const serverAuth = async (req : NextApiRequest, res : NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

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