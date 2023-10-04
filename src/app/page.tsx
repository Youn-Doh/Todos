import Link from 'next/link'
import React from 'react'
import prisma from './db'

import Todo from '@/component/Todo'

function fetchTodos() {
  return prisma.todo.findMany()
}

async function toggleTodo(id: string, complete: boolean) {
  'use server'
  await prisma.todo.update({ where: { id }, data: { complete } })
}

const Home = async () => {
  // await prisma.todo.create({
  //   data: {
  //     task: 'Walk the Dog',
  //     complete: false,
  //   },
  // })
  const todos = await fetchTodos()
  console.log(todos)
  return (
    <div className="flex flex-col items-center gap-4 justify-center mt-12">
      <h1 className="text-4xl">Home</h1>
      <Link href="/new" className="border-2 border-red">
        New Tasks
      </Link>
      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </div>
  )
}

export default Home
