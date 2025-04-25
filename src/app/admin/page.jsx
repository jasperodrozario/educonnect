"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  IconArrowRight,
  IconUsers,
  IconMessageCircle,
  IconCalendarEvent,
} from "@tabler/icons-react";

// Using the same rooms data as in room/[id]/page.jsx
// In a production app, this would come from an API or database
const rooms = [
  {
    id: "1",
    name: "Introduction to React",
    description: "Learn the basics of React and build your first app.",
    topic: "React",
    host: "john_doe",
    participants: [
      {
        id: "1",
        name: "John Doe",
        avatar: "/avatars/mantaka.jpg",
        isHost: true,
      },
      { id: "2", name: "Alice Smith", avatar: "/avatars/mantaka.jpg" },
      { id: "3", name: "Bob Johnson", avatar: "/avatars/mantaka.jpg" },
      { id: "4", name: "Emma Davis", avatar: "/avatars/mantaka.jpg" },
      { id: "5", name: "Michael Wilson", avatar: "/avatars/mantaka.jpg" },
    ],
    messages: [
      {
        id: "1",
        sender: "John Doe",
        text: "Welcome everyone to our React introduction session!",
        timestamp: "2023-06-15T10:00:00Z",
      },
      {
        id: "2",
        sender: "Alice Smith",
        text: "Thanks for hosting, John! I'm excited to learn React.",
        timestamp: "2023-06-15T10:02:30Z",
      },
      {
        id: "3",
        sender: "Bob Johnson",
        text: "Is this session suitable for complete beginners?",
        timestamp: "2023-06-15T10:05:45Z",
      },
      {
        id: "4",
        sender: "John Doe",
        text: "Absolutely, Bob! We'll start from the very basics.",
        timestamp: "2023-06-15T10:07:20Z",
      },
      {
        id: "5",
        sender: "Emma Davis",
        text: "I have some experience with JavaScript. Will this help?",
        timestamp: "2023-06-15T10:10:15Z",
      },
      {
        id: "6",
        sender: "John Doe",
        text: "Definitely, Emma! JavaScript knowledge will give you a head start.",
        timestamp: "2023-06-15T10:12:00Z",
      },
    ],
  },
  {
    id: "2",
    name: "Advanced JavaScript",
    description: "Dive deep into advanced JavaScript concepts.",
    topic: "JavaScript",
    host: "jane_smith",
    participants: [
      {
        id: "1",
        name: "Jane Smith",
        avatar: "/avatars/mantaka.jpg",
        isHost: true,
      },
      { id: "2", name: "David Brown", avatar: "/avatars/mantaka.jpg" },
      { id: "3", name: "Sophia Miller", avatar: "/avatars/mantaka.jpg" },
      { id: "4", name: "Oliver Taylor", avatar: "/avatars/mantaka.jpg" },
    ],
    messages: [
      {
        id: "1",
        sender: "Jane Smith",
        text: "Welcome to Advanced JavaScript! Today we'll explore closures and prototypes.",
        timestamp: "2023-06-16T14:00:00Z",
      },
      {
        id: "2",
        sender: "David Brown",
        text: "I've been struggling with understanding closures. Looking forward to this!",
        timestamp: "2023-06-16T14:03:10Z",
      },
      {
        id: "3",
        sender: "Sophia Miller",
        text: "What's the practical application of prototypes in modern JS?",
        timestamp: "2023-06-16T14:07:45Z",
      },
      {
        id: "4",
        sender: "Jane Smith",
        text: "Great question, Sophia! We'll cover that in detail today.",
        timestamp: "2023-06-16T14:09:30Z",
      },
    ],
  },
];

// Helper function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// Stat Card Component
const StatCard = ({ icon, title, value, bgColor }) => {
  return (
    <div className="flex flex-col rounded-lg p-6 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
      <div
        className={`mb-4 h-12 w-12 rounded-full flex items-center justify-center ${bgColor}`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-neutral-600 dark:text-neutral-300">
        {title}
      </h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
};

// Recent Message Component
const RecentMessage = ({ message, roomName }) => {
  return (
    <div className="border-b border-neutral-200 dark:border-neutral-700 py-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{message.sender}</span>
        <span className="text-xs text-neutral-500">
          {formatDate(message.timestamp)}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-1">
        {message.text}
      </p>
      <span className="text-xs text-orange-400">in {roomName}</span>
    </div>
  );
};

// Room Card Component
const RoomCard = ({ room }) => {
  return (
    <Link href={`/room/${room.id}`}>
      <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">{room.name}</h3>
          <span className="px-2 py-1 rounded-xl bg-orange-500 text-white text-xs font-semibold">
            {room.topic}
          </span>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
          {room.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <IconUsers size={16} className="text-neutral-500 mr-1" />
            <span className="text-xs text-neutral-500">
              {room.participants.length}
            </span>
          </div>
          <IconArrowRight size={16} className="text-orange-500" />
        </div>
      </div>
    </Link>
  );
};

export default function AdminPanel() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalParticipants: 0,
    totalMessages: 0,
  });
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    // Simulate data fetching with a slight delay
    const fetchData = () => {
      setLoading(true);

      setTimeout(() => {
        // Calculate stats
        const totalRooms = rooms.length;
        const totalParticipants = rooms.reduce(
          (sum, room) => sum + room.participants.length,
          0
        );
        const totalMessages = rooms.reduce(
          (sum, room) => sum + room.messages.length,
          0
        );

        setStats({
          totalRooms,
          totalParticipants,
          totalMessages,
        });

        // Get recent messages from all rooms
        const allMessages = rooms.flatMap((room) =>
          room.messages.map((msg) => ({
            ...msg,
            roomId: room.id,
            roomName: room.name,
          }))
        );

        // Sort by timestamp (most recent first)
        allMessages.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

        setRecentMessages(allMessages.slice(0, 5));
        setLoading(false);
      }, 800);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full rounded-tl-2xl border border-neutral-200 bg-white overflow-auto dark:border-neutral-700 dark:bg-neutral-900">
      <header className="sticky top-0 py-6 px-8 border-b border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-sm text-neutral-500">
              Monitor and manage your EduConnect platform
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-8 w-full">
        {/* Stats Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Platform Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              icon={<IconCalendarEvent size={24} className="text-white" />}
              title="Total Rooms"
              value={stats.totalRooms}
              bgColor="bg-blue-500"
            />
            <StatCard
              icon={<IconUsers size={24} className="text-white" />}
              title="Total Participants"
              value={stats.totalParticipants}
              bgColor="bg-orange-500"
            />
            <StatCard
              icon={<IconMessageCircle size={24} className="text-white" />}
              title="Total Messages"
              value={stats.totalMessages}
              bgColor="bg-green-500"
            />
          </div>
        </section>

        {/* Two-column layout for Recent Messages and Rooms */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Messages */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Messages</h2>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
              {recentMessages.length > 0 ? (
                recentMessages.map((message) => (
                  <RecentMessage
                    key={`${message.roomId}-${message.id}`}
                    message={message}
                    roomName={message.roomName}
                  />
                ))
              ) : (
                <p className="text-center py-4 text-neutral-500">
                  No messages yet
                </p>
              )}
            </div>
          </section>

          {/* Rooms List */}
          <section className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Active Rooms</h2>
              <Link
                href="/room/create"
                className="text-sm text-orange-500 hover:underline"
              >
                Create New
              </Link>
            </div>
            <div className="space-y-4">
              {rooms.map((room) => (
                <div className="my-4">
                  <RoomCard key={room.id} room={room} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
