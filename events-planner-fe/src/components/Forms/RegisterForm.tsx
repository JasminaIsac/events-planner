import { zodResolver } from "@hookform/resolvers/zod";

import { CustomButton, CustomInput } from "~/components/UI";
import { BUTTON_VARIANTS } from "~/config/styleConstants";
import { useRegister } from "~/hooks/mutations/auth";
import { RegisterSchema } from "~/schemas/registerSchema";
import type { RegisterRequest } from "~/types/auth";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterForm() {
  const { mutateAsync: signUp, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterSchema),
  });

  async function onSubmit(data: RegisterRequest) {
    try {
      await signUp(data);
      toast.success("Registered successfully!");
    } catch {
      setError("form", {
        message: "Failed to register. Please check your credentials.",
      });
      toast.error("Failed to register. Please check your credentials.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <CustomInput
        label="First name"
        placeholder="Enter your first name"
        error={errors.firstName?.message}
        {...register("firstName")}
      />
      <CustomInput
        label="Last name"
        placeholder="Enter your last name"
        error={errors.lastName?.message}
        {...register("lastName")}
      />

      <CustomInput
        label="Email"
        placeholder="Enter your email"
        error={errors.email?.message}
        {...register("email")}
      />

      <CustomInput
        label="Phone number"
        placeholder="Enter your phone number"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <CustomInput
        label="Password"
        placeholder="Enter your password"
        type="password"
        error={errors.password?.message}
        {...register("password")}
      />

      <CustomInput
        label="Confirm Password"
        placeholder="Enter your password again"
        type="password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      {errors.form && (
        <p className="text-sm text-red-500">{errors.form.message}</p>
      )}

      <CustomButton
        title={isPending ? "Signing up..." : "Sign Up"}
        variant={BUTTON_VARIANTS.DESTRUCTIVE.value}
        type="submit"
        disabled={isPending}
      />
    </form>
  );
}
