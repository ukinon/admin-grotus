import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import Select, {
  CSSObjectWithLabel,
  ControlProps,
  GroupBase,
  SingleValueProps,
} from "react-select";

export type OptionsType = {
  value: string | number | boolean | Record<string, unknown>;
  label: string;
};

type Props<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  data?: unknown;
  name: keyof TFormValues;
  label: string;
  placeholder?: string;
  options: undefined | OptionsType[];
  defaultVal?: string | number | (string | number)[] | Record<string, unknown>;
  required?: boolean;
  multiple?: boolean;
  disabled?: boolean;
};

export default function SelectInput<TFormValues extends FieldValues>({
  form,
  name,
  label,
  options,
  required,
  multiple,
  disabled,
  defaultVal,
}: Props<TFormValues>) {
  console.log(defaultVal);
  const currentValue = form.watch(name as Path<TFormValues>);

  const getSelectedOptions = () => {
    if (multiple) {
      return options?.filter((option) =>
        Array.isArray(currentValue)
          ? currentValue.includes(option.value)
          : false,
      );
    } else {
      return options?.find((option) => option.value === currentValue);
    }
  };

  const selectedOptions = getSelectedOptions();

  const customStyles = {
    control: (
      provided: CSSObjectWithLabel,
      state: ControlProps<OptionsType, boolean, GroupBase<OptionsType>>,
    ) => ({
      ...provided,
      backgroundColor: state.isDisabled
        ? "rgb(244 244 245)"
        : provided.backgroundColor,
      borderRadius: "0.375rem",
      border: state.isDisabled ? "1px solid rgb(212 212 216)" : provided.border,
      color: state.isDisabled ? "#000000" : provided.color,
      opacity: state.isDisabled ? 1 : provided.opacity,
      cursor: state.isDisabled ? "not-allowed" : provided.cursor,
    }),
    singleValue: (
      provided: CSSObjectWithLabel,
      state: SingleValueProps<OptionsType, boolean, GroupBase<OptionsType>>,
    ) => ({
      ...provided,
      color: state.isDisabled ? "#000000" : provided.color,
    }),
  };

  return (
    <FormField
      control={form.control}
      name={name as Path<TFormValues>}
      render={() => {
        return (
          <FormItem>
            <div className="grid grid-cols-12 items-center">
              <Label className="col-span-3 pr-3 text-[55%] font-bold md:text-sm">
                {label}{" "}
                {required ? <span className="text-red-500">*</span> : ""}{" "}
              </Label>
              <p className="col-span-1">:</p>
              <FormControl>
                <Select
                  name={(name as string) + "select"}
                  styles={customStyles}
                  value={selectedOptions}
                  isDisabled={disabled}
                  className="react-select col-span-8 border-black text-[55%]  md:text-xs"
                  isClearable={true}
                  placeholder={`Choose ${label.toLowerCase().replace(":", "")}...`}
                  isLoading={
                    currentValue != undefined &&
                    !selectedOptions &&
                    (Array.isArray(currentValue)
                      ? currentValue.length === 0
                      : !currentValue)
                  }
                  isSearchable={true}
                  options={options}
                  onChange={(selectedOption) => {
                    if (multiple) {
                      const options = selectedOption as OptionsType[] | null;
                      const newValues = options
                        ? options.map((option) => option.value)
                        : [];
                      form.setValue(
                        name as Path<TFormValues>,
                        newValues as PathValue<TFormValues, Path<TFormValues>>,
                        { shouldValidate: true },
                      );
                    } else {
                      const option = selectedOption as OptionsType | null;
                      const newValue = option ? option.value : null;
                      form.setValue(
                        name as Path<TFormValues>,
                        newValue as PathValue<TFormValues, Path<TFormValues>>,
                        { shouldValidate: true },
                      );
                    }
                  }}
                  isMulti={multiple}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
