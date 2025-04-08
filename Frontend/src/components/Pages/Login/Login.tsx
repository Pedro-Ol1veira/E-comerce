// zod
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// react hook form
import { useForm } from "react-hook-form";
// shadcn UI
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
// redux
import { login } from "@/redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
// icons
import { Terminal } from "lucide-react";
// react
// React Router dom

const formSchema = z.object({
  email: z.string().email({
    message: "Email invalido",
  }),
  password: z.string().min(8, {
    message: "A sua senha deve conter no minimo 8 caracteres",
  }),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch(login(values));
  };

  return (
    <div className="flex flex-col justify-center align-middle h-11/12 w-[500px] m-auto gap-4">
      <h2 className="text-center text-3xl pb-6">Faça o Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormDescription>Digite seu e-mail cadastrado</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input placeholder="Senha" type="password" {...field} />
                </FormControl>
                <FormDescription>Digite a sua Senha</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {authState.loading == false ? (
            <Button type="submit">Entrar</Button>
          ) : (
            <Button type="submit" className="cursor-wait ">
              Entrar
            </Button>
          )}
        </form>
      </Form>
      <div>
        {authState.error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Erro ao fazer o login</AlertTitle>
            <AlertDescription>{authState.error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
