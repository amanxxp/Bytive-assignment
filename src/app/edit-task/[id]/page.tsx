"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
}

export default function EditTaskPage({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<Task | null>(null);
  const [status, setStatus] = useState<string>("pending");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await fetch(`/api/tasks/${params.id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch task");
        }

        const data = await response.json();
        setTask(data.task);
        setStatus(data.task.status);
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to fetch task");
        setIsLoading(false);
        router.push("/");
      }
    }

    fetchTask();
  }, [params.id, router]);

  const handleUpdateStatus = async () => {
    if (!task) return;

    setIsUpdating(true);

    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      toast.success("Task status updated successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to update task status");
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="container mx-auto p-4 flex flex-col justify-center items-center h-[200px]">
          <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
          <p className="mt-4 text-gray-600 text-lg">
            Please wait Loading Task To Edit...
          </p>
        </div>
      </>
    );
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <>
      <div className="container mx-auto p-4 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Edit Task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title
                </label>
                <Input type="text" value={task.title} disabled />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Textarea value={task.description} disabled />
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Task Status
                </label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleUpdateStatus}
                className="w-full mt-4"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update Task Status"}
              </Button>
              <Button
                variant={"outline"}
                className="w-full"
                onClick={() => {
                  router.push("/");
                }}
              >
                Back To Tasks
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
