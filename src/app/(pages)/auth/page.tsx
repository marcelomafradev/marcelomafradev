import { Image } from '@/components/app';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { signIn } from '@/lib/auth';

export default async function Auth() {
  return (
    <div className="align-page flex h-screen items-center justify-center">
      <Card className="px-10 py-5">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl xl:text-5xl">
            Entre com a sua conta!
          </CardTitle>

          <CardDescription className="text-sm text-primary md:text-base lg:text-xl">
            Faça o login ou registre-se.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex items-center justify-center">
          <form
            action={async () => {
              'use server';

              await signIn('google');
            }}
          >
            <Button
              variant="outline"
              className="gap-1 text-secondary-foreground/80"
              type="submit"
            >
              <Image src="/google.svg" alt="google" className="h-6 w-6" />
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
