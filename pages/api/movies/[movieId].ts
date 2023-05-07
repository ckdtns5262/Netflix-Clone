
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb'

import serverAuth from "@/lib/serverAuth";

export default async function handler(req : NextApiRequest, res: NextApiResponse){
    if(req.method != 'GET'){
        res.status(405).end()
    }
    try {
        await serverAuth(req, res);

        const {movieId} = req.query;

        if(typeof movieId != 'string'){
            throw new Error('잘못된 ID')
        }
        if(!movieId){
            throw new Error('잘못된 ID')
        }
        const movie = await prismadb.movie.findUnique({
            where : {
                id : movieId
            }
        });
        if(!movie){
            throw new Error('잘못된 ID')
        }
        return res.status(200).json(movie)
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}