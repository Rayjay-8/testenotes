import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching notes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    const note = await prisma.note.create({
      data: {
        title,
        content
      }
    });
    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating note' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Note ID is required' }, { status: 400 });
    }
    await prisma.note.delete({
      where: {
        id: parseInt(id)
      }
    });
    return NextResponse.json({ message: 'Note deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting note' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, content } = await request.json();
    const note = await prisma.note.update({
      where: {
        id: parseInt(id)
      },
      data: {
        title,
        content
      }
    });
    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating note' }, { status: 500 });
  }
}