'use server';
import Page from "./pagec.tsx"

export default async function Home() {
 
  const response = await fetch('/api/notes');
    const data = await response.json();

  return (<Page notes={data}/>)
}
