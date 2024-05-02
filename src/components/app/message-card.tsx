'use client';

import { Message } from '@prisma/client';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { calculateTimeDifference } from '@/helpers/UI';
import { useCurrentUser } from '@/hooks';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash } from 'lucide-react';
import { DeleteMessageById } from '@/actions/message';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface MessageCardProps extends Message {
  user: {
    name: string | null;
    image: string | null;
  };
  t: {
    title: string;
    description: string;
    cancel: string;
    continue: string;
    success: string;
  };
}

const MessageCard = ({
  createdAt,
  id,
  message,
  userId,
  user: { image, name },
  t,
}: MessageCardProps) => {
  const router = useRouter();

  const usernameFallback = name?.split(' ').map((str) => str.substring(0, 1));
  const timeAgo = calculateTimeDifference(createdAt);
  const currentUser = useCurrentUser();

  const isMessageCreatedByCurrentUser = currentUser?.id === userId;

  const handleDeleteMessage = async () => {
    try {
      if (!isMessageCreatedByCurrentUser) return;

      await DeleteMessageById({ id, userId });
      toast.success(t.success);
      return router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardContent>
        <CardHeader className="px-0">
          <p>{message}</p>
        </CardHeader>

        <CardFooter className="w-full items-center justify-between p-0">
          {image && (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={image} />
                <AvatarFallback>{usernameFallback}</AvatarFallback>
              </Avatar>

              <h3 className="text-sm font-medium text-muted-foreground">
                {name}
              </h3>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{timeAgo}</span>
            {isMessageCreatedByCurrentUser && (
              <AlertDialog>
                <AlertDialogTrigger>
                  <Trash
                    size={15}
                    className="text-muted-foreground transition-all hover:text-secondary-foreground"
                  />
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t.description}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteMessage}>
                      {t.continue}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default MessageCard;
