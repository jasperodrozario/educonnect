"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Mock resource data - replace with actual API call in production
  useEffect(() => {
    // Simulate fetching resources from API
    const fetchResources = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/resources');
        // const data = await response.json();

        // Mock data for development
        const mockData = [
          {
            id: "1",
            title: "React Official Docs",
            type: "link",
            url: "https://reactjs.org",
            description: "Comprehensive guide and API reference for React.",
            roomName: "Introduction to React",
            roomId: "1",
            createdAt: "2023-05-15",
          },
          {
            id: "2",
            title: "React Crash Course 2023",
            type: "youtube",
            url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
            description: "Hands-on React crash course for beginners.",
            roomName: "Introduction to React",
            roomId: "1",
            createdAt: "2023-05-22",
          },
          {
            id: "3",
            title: "React Component Lifecycle.pptx",
            type: "ppt",
            url: "/resources/react-component-lifecycle.pptx",
            description: "Presentation on React component lifecycle methods.",
            roomName: "Introduction to React",
            roomId: "1",
            createdAt: "2023-05-25",
          },
          {
            id: "4",
            title: "JavaScript Advanced Concepts",
            type: "youtube",
            url: "https://www.youtube.com/watch?v=SBwoFkRjZvE",
            description:
              "Deep dive into closures, scopes, and execution contexts.",
            roomName: "Advanced JavaScript",
            roomId: "2",
            createdAt: "2023-06-01",
          },
          {
            id: "5",
            title: "JavaScript Info Docs",
            type: "link",
            url: "https://javascript.info",
            description: "Covers advanced JavaScript concepts in depth.",
            roomName: "Advanced JavaScript",
            roomId: "2",
            createdAt: "2023-06-12",
          },
          {
            id: "6",
            title: "JS Asynchronous Patterns.docx",
            type: "doc",
            url: "/resources/js-async-patterns.docx",
            description:
              "Explains async/await and callback patterns in JavaScript.",
            roomName: "Advanced JavaScript",
            roomId: "2",
            createdAt: "2023-06-15",
          },
          {
            id: "7",
            title: "Tailwind CSS Guide",
            type: "pdf",
            url: "/resources/tailwind-css-guide.pdf",
            description:
              "Downloadable guide for using Tailwind CSS effectively.",
            roomName: "Tailwind CSS Workshop",
            roomId: "3",
            createdAt: "2023-07-05",
          },
          {
            id: "8",
            title: "Build a Page with Tailwind",
            type: "youtube",
            url: "https://www.youtube.com/watch?v=dFgzHOX84xQ",
            description:
              "Tutorial for building a responsive page with Tailwind.",
            roomName: "Tailwind CSS Workshop",
            roomId: "3",
            createdAt: "2023-07-18",
          },
          {
            id: "9",
            title: "Tailwind CSS Utilities.ppt",
            type: "ppt",
            url: "/resources/tailwind-utilities.ppt",
            description: "Presentation on common Tailwind utility classes.",
            roomName: "Tailwind CSS Workshop",
            roomId: "3",
            createdAt: "2023-07-20",
          },
          {
            id: "10",
            title: "Node.js Crash Course",
            type: "youtube",
            url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4",
            description: "A beginner-friendly crash course to learn Node.js.",
            roomName: "Node.js for Beginners",
            roomId: "4",
            createdAt: "2023-08-02",
          },
          {
            id: "11",
            title: "Node.js Docs",
            type: "link",
            url: "https://nodejs.org/en/docs",
            description: "Official documentation for Node.js.",
            roomName: "Node.js for Beginners",
            roomId: "4",
            createdAt: "2023-08-15",
          },
          {
            id: "12",
            title: "Node.js Setup Guide.doc",
            type: "doc",
            url: "/resources/node-setup-guide.doc",
            description: "Step-by-step setup guide for Node.js development.",
            roomName: "Node.js for Beginners",
            roomId: "4",
            createdAt: "2023-08-18",
          },
          {
            id: "13",
            title: "Python for Data Science",
            type: "youtube",
            url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
            description: "Complete Python course for data science.",
            roomName: "Python Data Science",
            roomId: "5",
            createdAt: "2023-08-20",
          },
          {
            id: "14",
            title: "Pandas Documentation",
            type: "link",
            url: "https://pandas.pydata.org/docs/",
            description: "User guide and API for data analysis in Python.",
            roomName: "Python Data Science",
            roomId: "5",
            createdAt: "2023-08-25",
          },
          {
            id: "15",
            title: "Data Wrangling Techniques.docx",
            type: "doc",
            url: "/resources/data-wrangling.docx",
            description: "Document on techniques to clean and reshape data.",
            roomName: "Python Data Science",
            roomId: "5",
            createdAt: "2023-08-28",
          },
          {
            id: "16",
            title: "UI/UX Fundamentals",
            type: "youtube",
            url: "https://www.youtube.com/watch?v=Ovj4hFxko7c",
            description: "Introduction to UX design fundamentals.",
            roomName: "UI/UX Design Principles",
            roomId: "6",
            createdAt: "2023-09-10",
          },
          {
            id: "17",
            title: "UI/UX Principles Explained",
            type: "pdf",
            url: "/resources/ui-ux-principles.pdf",
            description: "Downloadable resource covering key UI/UX strategies.",
            roomName: "UI/UX Design Principles",
            roomId: "6",
            createdAt: "2023-09-01",
          },
          {
            id: "18",
            title: "Design Heuristics.pptx",
            type: "ppt",
            url: "/resources/design-heuristics.pptx",
            description:
              "Presentation on Jakob Nielsen’s usability heuristics.",
            roomName: "UI/UX Design Principles",
            roomId: "6",
            createdAt: "2023-09-14",
          },
          {
            id: "19",
            title: "Intro to ML",
            type: "youtube",
            url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ",
            description: "Introductory concepts in machine learning.",
            roomName: "Machine Learning Basics",
            roomId: "7",
            createdAt: "2023-09-15",
          },
          {
            id: "20",
            title: "ML Terminologies.docx",
            type: "doc",
            url: "/resources/ml-terminologies.docx",
            description: "Glossary of machine learning terms and definitions.",
            roomName: "Machine Learning Basics",
            roomId: "7",
            createdAt: "2023-09-20",
          },
          {
            id: "21",
            title: "Docker Getting Started",
            type: "link",
            url: "https://docs.docker.com/get-started/",
            description: "Step-by-step Docker guide for developers.",
            roomName: "Docker for Developers",
            roomId: "10",
            createdAt: "2023-10-25",
          },
          {
            id: "22",
            title: "Docker Explained",
            type: "youtube",
            url: "https://www.youtube.com/watch?v=pTFZFxd4hOI",
            description: "Learn the basics of Docker and containers.",
            roomName: "Docker for Developers",
            roomId: "10",
            createdAt: "2023-10-21",
          },
          {
            id: "23",
            title: "DevOps Basics for Beginners",
            type: "youtube",
            url: "https://www.youtube.com/watch?v=0yWAtQ6wYNM",
            description: "DevOps workflow and tools introduction.",
            roomName: "DevOps Essentials",
            roomId: "8",
            createdAt: "2023-10-01",
          },
          {
            id: "24",
            title: "Git & GitHub Guide",
            type: "youtube",
            url: "https://www.youtube.com/watch?v=RGOj5yH7evk",
            description: "Complete Git and GitHub crash course.",
            roomName: "DevOps Essentials",
            roomId: "8",
            createdAt: "2023-10-06",
          },
          {
            id: "25",
            title: "Getting Started with GraphQL",
            type: "youtube",
            url: "https://www.youtube.com/watch?v=ed8SzALpx1Q",
            description: "GraphQL tutorial for beginners.",
            roomName: "GraphQL Fundamentals",
            roomId: "9",
            createdAt: "2023-10-12",
          },
        ];

        setResources(mockData);
        setFilteredResources(mockData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching resources:", error);
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredResources(resources);
    } else {
      const filtered = resources.filter(
        (resource) =>
          resource.title.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query) ||
          resource.roomName.toLowerCase().includes(query)
      );
      setFilteredResources(filtered);
    }
  };

  return (
    <div className="h-full w-full rounded-tl-2xl bg-white pb-6 px-8 overflow-scroll border dark:border-neutral-700 dark:bg-neutral-900">
      <div className="flex sticky top-0 items-center justify-between mb-4 pb-4 pt-8 z-10 bg-white dark:bg-neutral-900">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Resource Hub
        </h1>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <Input
            className="pl-10 py-6"
            placeholder="Search resources by title, description, or room..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Resource Filtering Tabs */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-neutral-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
                No resources found
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 mt-2">
                Try adjusting your search or check back later for new resources.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="links">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : filteredResources.filter((r) => r.type === "link").length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources
                .filter((resource) => resource.type === "link")
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
                No link resources found
              </h3>
            </div>
          )}
        </TabsContent>

        <TabsContent value="documents">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : filteredResources.filter((r) =>
              ["pdf", "doc", "docx", "ppt", "pptx"].includes(r.type)
            ).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources
                .filter((resource) =>
                  ["pdf", "doc", "docx", "ppt", "pptx"].includes(resource.type)
                )
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
                No document resources found
              </h3>
            </div>
          )}
        </TabsContent>

        <TabsContent value="videos">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : filteredResources.filter((r) => r.type === "youtube").length >
            0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources
                .filter((resource) => resource.type === "youtube")
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
                No video resources found
              </h3>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Resource Card Component
function ResourceCard({ resource }) {
  // Function to render different resource previews based on type
  const renderResourcePreview = () => {
    switch (resource.type) {
      case "youtube":
        return (
          <div className="relative pt-[56.25%] bg-neutral-100 dark:bg-neutral-800 rounded-md overflow-hidden">
            <img
              src={`https://img.youtube.com/vi/${getYoutubeId(
                resource.url
              )}/hqdefault.jpg`}
              alt={resource.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-600 rounded-full p-3 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="5 3 19 12 5 21"></polygon>
                </svg>
              </div>
            </div>
          </div>
        );
      case "pdf":
        return (
          <div className="bg-red-200 dark:bg-red-900/20 p-6 rounded-md flex items-center justify-center h-67">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-500"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <path d="M9 15h6"></path>
              <path d="M9 11h6"></path>
            </svg>
          </div>
        );
      case "doc":
      case "docx":
        return (
          <div className="bg-blue-200 dark:bg-blue-900/20 p-6 rounded-md flex items-center justify-center h-67">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
          </div>
        );
      case "ppt":
      case "pptx":
        return (
          <div className="bg-orange-100 dark:bg-orange-900/20 p-6 rounded-md flex items-center justify-center h-67">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-orange-500"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <rect x="8" y="12" width="8" height="6" rx="1"></rect>
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-neutral-300 dark:bg-neutral-800 p-6 rounded-md flex items-center justify-center h-67">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-neutral-500"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          </div>
        );
    }
  };

  // Helper function to extract YouTube video ID from URL
  const getYoutubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300 justify-between">
      <div className="overflow-hidden">{renderResourcePreview()}</div>
      <div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{resource.title}</CardTitle>
          </div>
          <div className="flex items-center mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            <span>Shared on {formatDate(resource.createdAt)}</span>
          </div>
        </CardHeader>

        <CardContent className="pb-3">
          <p className="text-neutral-600 dark:text-neutral-300 mb-3">
            {resource.description}
          </p>
          <Badge
            variant="default"
            className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500"
          >
            From: {resource.roomName}
          </Badge>
        </CardContent>
        <CardFooter className="pt-0">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => window.open(resource.url, "_blank")}
          >
            View Resource
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
