"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();
        setTasks(data.tasks);
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to fetch tasks");
        setIsLoading(false);
      }
    }

    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId: string) => {
    setDeletingTaskId(taskId);
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks(tasks.filter((task) => task.id !== taskId));
      toast.success("Task deleted successfully");
      setDeletingTaskId(null);
    } catch (error) {
      toast.error("Failed to delete task");
      setDeletingTaskId(null);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "in-progress":
        return "progress";
      case "completed":
        return "success";
      default:
        return "secondary";
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="container mx-auto p-4 flex flex-col justify-center items-center h-[200px]">
          <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
          <p className="mt-4 text-gray-600 text-lg">
            Please wait Loading Tasks...
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-6">
        <Card className="bg-green-100 text-green-800 border-green-400">
          <CardHeader className="text-center">
            <CardTitle className="text-lg font-bold">
              Both Frontend And Backend Development Tasks Are Done
            </CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              Assignment Submission - Software Development Trainee for Bytive
            </p>
          </CardHeader>
        </Card>
      </div>
      <div className="mx-auto max-w-[780px] p-4">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Tasks</h1>
            <Link href="/add-task">
              <Button>Add New Task</Button>
            </Link>
          </div>

          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">
              No tasks found. Add a new task!
            </p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <Card key={task.id}>
                  <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle>{task.title}</CardTitle>
                    <Badge variant={getStatusVariant(task.status)}>
                      {task.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center">
                    <p className="text-gray-600">{task.description}</p>
                    <div className="flex space-x-2">
                      <Link href={`/edit-task/${task.id}`}>
                        <Button variant="outline" size="sm" className="text-sm">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        disabled={deletingTaskId === task.id}
                        size="sm"
                        className="text-sm"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        {deletingTaskId === task.id ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
