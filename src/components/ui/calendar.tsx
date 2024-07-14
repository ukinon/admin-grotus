"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  isMonth = false,
  ...props
}: CalendarProps & { isMonth: boolean }) {
  const [fromMonth, setFromMonth] = React.useState(new Date());
  const [toMonth, setToMonth] = React.useState(new Date());

  return (
    <>
      <div className="flex flex-row">
        {!isMonth && (
          <>
            <DayPicker
              showOutsideDays={showOutsideDays}
              className={cn(
                `hidden p-3 md:flex ${props.mode == "single" && "md:hidden"}`,
                className,
              )}
              classNames={{
                months:
                  "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                  buttonVariants({ variant: "outline" }),
                  "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell:
                  "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                ),
                day_range_end: "bg-button focus:bg-button text-black",
                day_selected:
                  "bg-primary-500 text-white text-black hover:bg-primary-600 hover:text-white focus:bg-primary-500 focus:text-white",
                day_today: "bg-primary-100 text-accent-foreground",
                day_outside:
                  "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle:
                  "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_range_start: "bg-button focus:bg-button text-black",
                day_hidden: "invisible",
                ...classNames,
              }}
              month={fromMonth}
              components={{
                IconLeft: () => <BiChevronLeft className="h-4 w-4" />,
                IconRight: () => <BiChevronRight className="h-4 w-4" />,
                Caption: () => {
                  const months = Array.from({ length: 12 }, (_, i) =>
                    new Date(0, i).toLocaleDateString("en-EN", {
                      month: "long",
                    }),
                  );
                  const years = [];

                  for (let i = 1970; i <= new Date().getFullYear() + 50; i++) {
                    years.push(i);
                  }

                  const handleChange = function (
                    e: React.ChangeEvent<HTMLSelectElement>,
                  ) {
                    const form = e.target.form;
                    const year = form?.elements.namedItem(
                      "year",
                    ) as HTMLSelectElement;
                    const month = form?.elements.namedItem(
                      "month",
                    ) as HTMLSelectElement;
                    if (year && month) {
                      setFromMonth(
                        new Date(parseInt(year.value), parseInt(month.value)),
                      );
                    }
                  };

                  return (
                    <form>
                      <select
                        value={fromMonth.getMonth()}
                        name="month"
                        onChange={handleChange}
                      >
                        {months.map((month, i) => (
                          <option
                            key={month}
                            value={i}
                            selected={i === fromMonth.getMonth() + 1}
                          >
                            {month}
                          </option>
                        ))}
                      </select>
                      <select name="year" onChange={handleChange}>
                        {years.map((year, i) => (
                          <option
                            key={i}
                            value={year}
                            selected={year === fromMonth.getFullYear()}
                          >
                            {year}
                          </option>
                        ))}
                      </select>
                      <p className="mt-2 flex text-xs text-black ">
                        <span className="text-red-500">*</span>Mulai dari
                      </p>
                    </form>
                  );
                },
              }}
              {...props}
            />

            <DayPicker
              showOutsideDays={showOutsideDays}
              className={cn("flex p-3", className)}
              classNames={{
                months:
                  "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                  buttonVariants({ variant: "outline" }),
                  "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell:
                  "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                ),
                day_range_end: "bg-button focus:bg-button text-black",
                day_selected:
                  "bg-primary-500 text-white text-black hover:bg-primary-600 hover:text-white focus:bg-primary-500 focus:text-white",
                day_today: "bg-primary-100 text-accent-foreground",
                day_outside:
                  "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle:
                  "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_range_start: "bg-button focus:bg-button text-black",
                day_hidden: "invisible",
                ...classNames,
              }}
              month={toMonth}
              components={{
                Caption: () => {
                  const months = Array.from({ length: 12 }, (_, i) =>
                    new Date(0, i).toLocaleDateString("en-EN", {
                      month: "long",
                    }),
                  );
                  const years = [];
                  for (let i = 1970; i <= new Date().getFullYear() + 50; i++) {
                    years.push(i);
                  }

                  const handleChange = function (
                    e: React.ChangeEvent<HTMLSelectElement>,
                  ) {
                    const form = e.target.form;
                    const year = form?.elements.namedItem(
                      "year",
                    ) as HTMLSelectElement;
                    const month = form?.elements.namedItem(
                      "month",
                    ) as HTMLSelectElement;
                    if (year && month) {
                      setToMonth(
                        new Date(parseInt(year.value), parseInt(month.value)),
                      );
                    }
                  };

                  return (
                    <form>
                      <select name="month" onChange={handleChange}>
                        {months.map((month, i) => (
                          <option
                            key={month}
                            value={i}
                            selected={
                              month ==
                              toMonth.toLocaleDateString("id-ID", {
                                month: "long",
                              })
                            }
                          >
                            {month}
                          </option>
                        ))}
                      </select>
                      <select name="year" onChange={handleChange}>
                        {years.map((year, i) => (
                          <option
                            key={i}
                            value={year}
                            selected={year === toMonth.getFullYear()}
                          >
                            {year}
                          </option>
                        ))}
                      </select>
                      {props.mode != "single" && (
                        <>
                          <p className="mt-2 hidden text-xs text-black md:flex">
                            <span className="text-red-500">*</span>Sampai dengan
                          </p>
                          <p className="mt-2 flex text-xs text-black md:hidden">
                            <span className="text-red-500">*</span>Pilih 2
                            tanggal
                          </p>
                        </>
                      )}
                    </form>
                  );
                },
              }}
              {...props}
            />
          </>
        )}
      </div>
    </>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
