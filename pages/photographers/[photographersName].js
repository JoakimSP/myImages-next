import prisma from "@/components/prisma"
import useSession from 'next-auth/react'


export default function PhotographersName({photographer}) {
  const { data: session } = useSession()
  return (
    <div>
      <h1>{session.user.firstName}</h1>
    </div>
  )
}

export async function getServerSideProps(context){
  const {photographersName} = context.params

  const photographer = await prisma.photographer.findFirst({
    where: {
      firstName: photographersName
    }
  })

  if(!photographer){ return {notFound: true}}

  return {
    props: {
      photographer,
    }
  }
}
