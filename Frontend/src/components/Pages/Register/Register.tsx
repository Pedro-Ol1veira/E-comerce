import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { Input } from "@/components/ui/input";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { register } from "@/redux/auth/authSlice";

const cpfRegex = /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;
const phoneRegex = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/;

const formatPhoneAndCpf = (value: string) => {
  return(value.replace(/[.\-\)\() ]/g, ''));
}

const formSchema = z.object({
  name: z
    .string()
    .min(4, { message: "O nome deve conter entre 4 e 15 caracteres" })
    .max(15, { message: "O nome deve conter entre 4 e 15 caracteres" })
    .refine((value) => !/\d/.test(value), {
      message: "Seu nome não pode conter números",
    }),
  lastName: z
    .string()
    .min(4, { message: "O nome deve conter entre 4 e 15 caracteres" })
    .max(15, { message: "O nome deve conter entre 4 e 15 caracteres" })
    .refine((value) => !/\d/.test(value), {
      message: "A string não pode conter números",
    }),
  email: z.string().email({ message: "E-mail invalido" }),
  cpf: z.string().regex(cpfRegex, "CPF invalido"),
  phone: z.string().regex(phoneRegex, "Telefone invalido"),
  password: z
    .string()
    .min(8, { message: "A senha deve conter no minimo 8 caracteres" }),
  confirmPassword: z
    .string()
    .refine((value: any) => value.password === value.confirmPassowrd, {
      message: "As senhas e a confirmação de senha não coincidem",
      path: ["confirmPassword"],
    }),
});

export default function Register() {
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      cpf: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = ({name, lastName, email, cpf, phone, password, confirmPassword}: z.infer<typeof formSchema>) => {
    const newUser = {
      name,
      lastName,
      email,
      cpf: formatPhoneAndCpf(cpf),
      phone: formatPhoneAndCpf(phone),
      password,
      confirmPassword
    }

    console.log(newUser);
    
    dispatch(register(newUser));
  };

  return (
    <div className="flex flex-col justify-center max-w-[500px] m-auto">
      <h2 className="text-center text-3xl py-6">Criar Conta</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="pb-5">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>
                <FormDescription>Digite o seu nome</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="pb-5">
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input placeholder="Sobrenome" {...field} />
                </FormControl>
                <FormDescription>Digite o seu sobrenome</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="pb-5">
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="E-mail" {...field} />
                </FormControl>
                <FormDescription>Digite o seu e-email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem className="pb-5">
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input placeholder="CPF" {...field} />
                </FormControl>
                <FormDescription>Digite o seu CPF</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="pb-5">
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="Telefone" {...field} />
                </FormControl>
                <FormDescription>Digite o seu telefone</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="pb-5">
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Senha" {...field} />
                </FormControl>
                <FormDescription>Digite a sua senha</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="pb-5">
                <FormLabel>Confirmação de Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirmação de Senha" {...field} />
                </FormControl>
                <FormDescription>Confirme a sua senha</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Criar conta</Button>
        </form>
      </Form>
      <div className="w-full m-auto py-5">
        {authState.error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Erro ao fazer o cadastro</AlertTitle>
            <AlertDescription>{authState.error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
