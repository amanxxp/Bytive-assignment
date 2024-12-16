import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: params.id },
    });

    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });

    return NextResponse.json({ task }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json();

    if (!["pending", "in-progress", "completed"].includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json({ message: "Task updated", task: updatedTask }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const deletedTask = await prisma.task.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Task deleted", task: deletedTask }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
