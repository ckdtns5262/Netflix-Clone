import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    if(req.method != 'POST') {
        return res.status(405).end()
    }
    try {
        const {email, name, password}  = req.body;

        const existingUser = await prismadb.user.findUnique({
            where : {
                email,
            }
        })
        if(existingUser) {
            res.status(422).json({Error : '이메일이 존재합니다'})
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const user  = await prismadb.user.create({
            data : {
                email, name, hashedPassword, 
                image : '',
                emailVerified : new Date(),
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).end()
    }
}