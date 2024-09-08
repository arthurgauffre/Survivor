'use client'

import { useState } from 'react'
import { Menu, X, Send, Phone, Video } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ChatUi() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white w-full max-w-xs flex-shrink-0 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Conversations</h2>
        </div>
        <nav className="p-2">
          {['Alice', 'Bob', 'Charlie', 'David', 'Eve'].map((name, index) => (
            <button key={index} className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://i.pravatar.cc/40?img=${index + 1}`} alt={name} />
                <AvatarFallback>{name[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-3 text-left">
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xs text-gray-500">Last message...</p>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <header className="bg-white border-b p-4 flex items-center justify-between">
          <button className="md:hidden" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </button>
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://i.pravatar.cc/40?img=1" alt="Alice" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <h1 className="ml-3 text-xl font-semibold">Alice</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
              <span className="sr-only">Call</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
              <span className="sr-only">Video call</span>
            </Button>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex items-end">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://i.pravatar.cc/40?img=1" alt="Alice" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="ml-2 bg-gray-200 rounded-lg p-3 max-w-xs">
              <p className="text-sm">Hey, how are you doing?</p>
            </div>
          </div>
          <div className="flex items-end justify-end">
            <div className="mr-2 bg-blue-500 text-white rounded-lg p-3 max-w-xs">
              <p className="text-sm">I'm good, thanks! How about you?</p>
            </div>
          </div>
          {/* Add more messages here */}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t p-4">
          <form className="flex space-x-2">
            <Input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1"
            />
            <Button type="submit">
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}