'use server';
import { PrismaClient } from '@prisma/client';
import Page from "./pagec"

const prisma = new PrismaClient();

export default async function Home() {
 
  const data = await prisma.note.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (<Page notes={data}/>)
}
