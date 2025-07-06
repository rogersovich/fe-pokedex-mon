import Link from 'next/link'
import React from 'react'

export default function TheHeader() {
  return (
    <div className="base-card flex justify-center gap-6 sticky top-0 border border-slate-200">
      <Link href="/">
        <div className='border border-red-300 px-4 py-2 rounded font-bold'>
          Pokedex
        </div>
      </Link>
      <Link href="/about">
        <div className='border border-red-300 px-4 py-2 rounded font-bold'>
          About
        </div>
      </Link>
    </div>
  )
}
