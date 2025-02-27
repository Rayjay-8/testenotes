'use server';
import Page from "./pagec"

export default async function Home() {
 
  const data = await prisma.note.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (<Page notes={data}/>)
}
