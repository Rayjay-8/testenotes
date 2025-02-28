'use server';

import { Note, PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();


export const getallnotes = async () => {
   const data = await prisma.note.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    }) as Note[]

    return data
}

export const criarnota = async (data:{title: string, content: string}) => {
   const { title, content } = data;
       const note = await prisma.note.create({
         data: {
           title,
           content
         }
       });

      revalidatePath('/')
   return note
}

export const deletarnota = async (id:number) => {
   await prisma.note.delete({
         where: {
           id: id
         }
       });
       revalidatePath('/')
   return "deletado"
}

export const editarnota = async (data:Note) => {
   const { id, title, content } = data
   const note = await prisma.note.update({
     where: {
       id: parseInt(String(id))
     },
     data: {
       title,
       content
     }
   });

   revalidatePath('/')

   return "editada"
}