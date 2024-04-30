'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';

export async function CreateNewMessage({
  message,
  userId,
}: {
  message: string;
  userId: string;
}) {
  try {
    const session = await auth();
    if (!session?.user || session.user.id !== userId) return;

    await db.message.create({
      data: { message, userId },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function UpdateMessage({
  message,
  userId,
}: {
  message: string;
  userId: string;
}) {
  try {
    const session = await auth();
    if (!session?.user || session.user.id !== userId) return;

    await db.message.update({
      data: { message },
      where: { userId },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function GetMessageByUser() {
  try {
    const session = await auth();
    if (!session?.user) return;

    const message = await db.message.findUnique({
      where: {
        userId: session?.user?.id,
      },
    });

    return message;
  } catch (error) {
    console.error(error);
  }
}

export async function GetAllMessages() {
  try {
    return await db.message.findMany({
      include: {
        user: {
          select: { image: true, name: true },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function DeleteMessageById({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  try {
    return await db.message.delete({
      where: {
        id,
        userId,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
