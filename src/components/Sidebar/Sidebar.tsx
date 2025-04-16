'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Home,
  List,
  FileText,
  BarChart,
  Smile,
} from 'lucide-react'

const menuItems = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Lista', icon: List, href: '/lista' },
  { label: 'Social', icon: FileText, href: '/social' },
  { label: 'Request', icon: BarChart, href: '/request' },
  { label: 'Trash', icon: Smile, href: '/trash' },
]

export default function Sidebar() {
  return (
    <aside className="w-60 h-screen bg-white border-r flex flex-col items-center py-6 space-y-8">
      <Image
        src="/logo.png"
        alt="Logo"
        width={100}
        height={100}
        className="rounded-full"
      />
      <nav className="w-full px-4 flex flex-col gap-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <Link href={item.href} key={index}>
              <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-all">
                <Icon size={20} />
                <span>{item.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>
    </aside>
    )
}






