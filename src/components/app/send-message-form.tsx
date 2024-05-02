'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useCurrentUser } from '@/hooks';
import { useRouter } from 'next/navigation';
import { CreateNewMessage, UpdateMessage } from '@/actions/message';
import { toast } from 'sonner';
import { LockKeyhole, Send } from 'lucide-react';

const formSchema = z.object({
  message: z.string().min(2).max(50),
});

const SendMessageForm = ({
  initialMessage,
  t,
}: {
  initialMessage: string | undefined;
  t: {
    label: string;
    placeholder: string;
    auth: string;
    send: string;
    'success-updated': string;
    'success-send': string;
  };
}) => {
  const router = useRouter();
  const session = useCurrentUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: initialMessage || '',
    },
  });

  async function onSubmit({ message }: z.infer<typeof formSchema>) {
    try {
      if (!session || !session.id) {
        return router.push('/auth');
      }

      if (initialMessage) {
        await UpdateMessage({ message, userId: session.id });
        toast.success(t['success-updated']);
        return router.refresh();
      } else {
        await CreateNewMessage({ message, userId: session.id });
        toast.success(t['success-send']);
        return router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.label}</FormLabel>
              <FormControl>
                <Textarea
                  className="h-[90px] max-h-[130px]"
                  placeholder={t.placeholder}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {session ? (
          <Button
            variant="outline"
            className="gap-2 text-secondary-foreground/80"
            type="submit"
          >
            <Send size={15} /> {t.send}
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full gap-2 text-xs text-secondary-foreground/80 md:w-fit"
            onClick={() => router.push('/auth')}
            type="button"
          >
            <LockKeyhole size={15} />
            {t.auth}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default SendMessageForm;
