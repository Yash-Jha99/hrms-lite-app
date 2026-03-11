import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { createEmployee } from "@/services/employee";
import { Spinner } from "../ui/spinner";

type Props = {
  refetch: () => void;
};

const AddEmployeeButton = ({ refetch }: Props) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    department: "",
  });
  const [open, setOpen] = useState(false);

  const addEmployeeMutation = useMutation({
    mutationKey: ["new_employee"],
    mutationFn: createEmployee,
    onError: (error: any) => {
      toast.error(error?.response?.data?.errors?.[0] || "Something went wrong");
    },
    onSuccess: () => {
      resetForm();
      setOpen(false);
      refetch();
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () =>
    setFormValues({
      name: "",
      email: "",
      department: "",
    });

  const handleSubmit = () => {
    if (!formValues.name.trim()) return toast.error("Name cannot be empty");
    if (!formValues.email.trim()) return toast.error("Email cannot be empty");
    if (!formValues.department.trim())
      return toast.error("Department cannot be empty");

    addEmployeeMutation.mutate(formValues);
  };

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          resetForm();
        }}
      >
        <form>
          <DialogTrigger asChild>
            <Button>Add Employee</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm" showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Add Employee</DialogTitle>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <Label htmlFor="department">Department</Label>
                <Select
                  value={formValues.department}
                  onValueChange={(val) =>
                    setFormValues((prev) => ({ ...prev, department: val }))
                  }
                >
                  <SelectTrigger id="department" className="w-full ">
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                disabled={addEmployeeMutation.isPending}
                onClick={handleSubmit}
              >
                {addEmployeeMutation.isPending && <Spinner />} Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default AddEmployeeButton;
