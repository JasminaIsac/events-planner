import { zodResolver } from "@hookform/resolvers/zod";

import { CustomButton, CustomInput } from "~/components/UI";
import { BUTTON_VARIANTS } from "~/config/styleConstants";
import { useLogin } from "~/hooks/mutations/auth";
import { loginSchema } from "~/schemas/loginSchema";
import type { LoginRequest } from "~/types/auth";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginForm() {
  const { mutateAsync: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginRequest) {
    try {
      await login(data);
      toast.success("Logged in successfully!");
    } catch {
      setError("password", { message: "Invalid email or password" });
      toast.error("Failed to log in. Please check your credentials.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <CustomInput
        label="Email"
        placeholder="Enter your email"
        error={errors.email?.message}
        {...register("email")}
      />

      <CustomInput
        label="Password"
        placeholder="Enter your password"
        type="password"
        error={errors.password?.message}
        {...register("password")}
      />

      <CustomButton
        title={isPending ? "Signing in..." : "Login"}
        variant={BUTTON_VARIANTS.DESTRUCTIVE.value}
        type="submit"
        disabled={isPending}
      />
    </form>
  );
}
