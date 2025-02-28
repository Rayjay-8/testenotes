'use server';

import { getallnotes } from "./action";
import Page from "./pagec"


export default async function Home() {
 
  const data = await getallnotes()

  return (<Page notes={data ?? []}/>)
}
