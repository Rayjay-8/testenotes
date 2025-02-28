'use client';

import { Note } from '@prisma/client';
import { useState, useEffect } from 'react';
import { criarnota, deletarnota, editarnota } from './action';

export default function Home({notes}:{notes:Note[]}) {
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNote) {
      await editarnota({ id: editingNote.id, title, content, createdAt: new Date() })

    } else {
      await criarnota({ title, content })
    }
    setTitle('');
    setContent('');
    setEditingNote(null);

  };

  const deleteNote = async (id: string) => {
    await deletarnota(parseInt(id))  
  };

  const editNote = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };



  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Notes App</h1>
        
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Note Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded h-32"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingNote ? 'Update Note' : 'Add Note'}
          </button>
        </form>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {notes?.map((note) => (
            <div key={note.id} className="border rounded p-4 space-y-2">
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <span className="text-gray-600">{note.content}</span>
              <p className="text-sm text-gray-400">
                {new Date(note.createdAt).toLocaleDateString()}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => editNote(note)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteNote(String(note.id))}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
