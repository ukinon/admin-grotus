import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import {
  RxEyeClosed,
  RxEyeOpen,
} from "react-icons/rx";
import { useState } from "react";
import React from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

// Update the Props definition to ensure TFormValues extends FieldValues
type Props<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  name: keyof TFormValues;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
  min?: number | string | Date;
  max?: number | string | Date;
  isCurrency?: boolean;
  isPercentage?: boolean;
  disabled?: boolean;
  defaultValue?: string | number;
  isThisYearStart?: boolean;
  step?: string;
  icon?: React.ReactElement;
};

export default function FormInput<TFormValues extends FieldValues>({
  form,
  name,
  type = "text",
  className,
  disabled,
  icon,
  placeholder,
  label,
  min,
  max,
}: Props<TFormValues>) {
  const [show, setShow] = useState(false);

  const updatedIcon = React.cloneElement(icon as React.ReactElement, {
    className: `text-lg`,
  });

  return (
    <FormField
      control={form.control}
      name={name as Path<TFormValues>}
      render={({ field }) => (
        <FormItem className="w-full invalid:text-2xl">
          <FormControl>
            <div
              className={`w-full ${
                type == "textarea" ? "items-start" : "items-center"
              }  `}
            >
              <div className="flex w-full flex-row items-center rounded-lg border border-zinc-500 px-3">
                {updatedIcon}
                {type != "password" && type != "date" && (
                  <>
                    <Input
                      placeholder={placeholder}
                      className="mx-1 rounded-none border-none text-xs placeholder:text-xs"
                      type={type}
                      {...field}
                    />
                  </>
                )}
                {type == "date" && (
                  <Popover>
                    <PopoverTrigger asChild className="w-full">
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full  justify-start rounded-none border-none text-left text-xs font-normal disabled:bg-zinc-100 disabled:opacity-100",
                          !form.getValues(field.name) &&
                            "text-muted-foreground",
                        )}
                        disabled={disabled}
                      >
                        {field.value ? (
                          new Date(field.value).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        ) : (
                          <span>{placeholder}</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(form.getValues(field.name))}
                        onSelect={(value) => {
                          const val = new Date(
                            value as Date,
                          ).toLocaleDateString("en-CA");
                          field.onChange(val);
                        }}
                        initialFocus
                        isMonth={false}
                        disabled={(date) => {
                          if (min && max) {
                            return date < (min as Date) || date > (max as Date);
                          } else if (min && !max) {
                            return date < (min as Date);
                          } else if (max && !min) {
                            return date > (max as Date);
                          }
                          return false;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                )}
                {type == "password" && (
                  <>
                    <Input
                      placeholder={placeholder}
                      className="mx-1 rounded-none border-none text-xs placeholder:text-xs"
                      type={show ? "text" : "password"}
                      {...field}
                    />
                    {show ? (
                      <RxEyeClosed
                        className="text-lg"
                        onClick={() => setShow(!show)}
                      />
                    ) : (
                      <RxEyeOpen
                        className="text-lg"
                        onClick={() => setShow(!show)}
                      />
                    )}
                  </>
                )}
              </div>
              {type == "textarea" && (
                <textarea
                  disabled={disabled}
                  className={`col-span-4 mr-[1px] h-[18vh] w-full resize-none rounded-sm border border-zinc-400 border-opacity-55 px-3 py-2 text-[55%] disabled:bg-zinc-100 md:text-xs ${className}`}
                  {...field}
                >
                  {field.value}
                </textarea>
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
