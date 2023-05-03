import useCurrentUser from "@/hooks/useCurrentUser"
import { NextPageContext, InferGetServerSidePropsType } from "next"
import { getSession, signOut } from "next-auth/react"

export async function getServerSideProps(context : NextPageContext) {
  const session = await getSession(context)

  if(!session) {
    return {
      redirect : {
        destination : '/auth',
        permanent : false,
      }
    }
  }
  return {
    props : {}
  }
}


export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const { data : user} = useCurrentUser();

  return (
  <>
   <h1 className="text-4xl text-green-500">Netflix Clone</h1>
   <p className="text-white">로그인된 계정 : {user?.email}</p>
   <button className="h-10 w-full bg-white" onClick={()=>signOut()}>LogOut!</button>
   </>
  )
}
