import {
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Input } from "@/components/ui/input"

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder: string;
}

const FormFieldInput = <T extends FieldValues>({ name, control, placeholder }: FormFieldProps<T>) => (
  <Controller name={name} control={control} render={({ field }) => (
    <FormItem className="w-full">
      <FormControl>
        <Input className="input" placeholder={placeholder} {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}/>
)

export default FormFieldInput