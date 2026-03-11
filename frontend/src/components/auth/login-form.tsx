import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth";
import { toast } from "sonner";
import { useAuth } from "@/auth";
import { useNavigate } from "@tanstack/react-router";
import { Spinner } from "../ui/spinner";

type Props = {
  className?: string;
  redirect?: string;
};

export function LoginForm({ className, redirect }: Props) {
  const auth = useAuth();
  const navigate = useNavigate({ from: "/login" });
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onError: (error: any) => {
      toast.error(
        error?.data?.errors?.[0]
          ? "Invalid Credentials"
          : "Something went wrong",
      );
    },
    onSuccess: (data) => {
      auth.login(data.token);
      navigate({ to: redirect || "/", replace: true });
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () =>
    setFormValues({
      username: "",
      password: "",
    });

  const handleSubmit = () => {
    loginMutation.mutate(formValues);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle>Login to HRMS Lite</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  name="username"
                  required
                  value={formValues.username}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formValues.password}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending && <Spinner />} Login
                </Button>
                <FieldDescription className="text-center">
                  Username: <b>admin</b> &nbsp;&nbsp; Password: <b>1234</b>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
