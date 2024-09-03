"use client";

export default function Spawnbox({ title, content }: { title: string; content: string }) {
    return (
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8">
            <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-700 text-base">{content}</p>
        </div>
    );
  }
