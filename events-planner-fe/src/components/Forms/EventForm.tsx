import { zodResolver } from "@hookform/resolvers/zod";

import { CustomInput, CustomSelect, CustomTextarea } from "~/components/UI";
import { EVENT_COLORS } from "~/config/styleConstants";
import { useCreateEvent, useUpdateEvent } from "~/hooks";
import type { EventFormValues } from "~/schemas/addEventSchema";
import { eventFormSchema } from "~/schemas/addEventSchema";
import type { Event } from "~/types";
import { EVENT_CATEGORIES } from "~/types";
import {
  buildEventPayload,
  formatTime,
  getCurrentTimeKey,
  getDateKey,
  getTodayKey,
} from "~/utils";

import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

export type EventFormDefaults = {
  date: string;
  startTime: string;
  endTime: string;
};

type EventFormProps = {
  id: string;
  event?: Event;
  defaultValues?: EventFormDefaults;
  onSuccess?: () => void;
};

export default function EventForm({
  id,
  event,
  defaultValues,
  onSuccess,
}: EventFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    criteriaMode: "all",
    mode: "onSubmit",
    defaultValues: {
      title: event?.title ?? "",
      description: event?.description ?? "",
      category: event?.category ?? EVENT_CATEGORIES.OFFLINE,
      date: event
        ? getDateKey(new Date(event.startDateTime))
        : (defaultValues?.date ?? ""),
      startTime: event
        ? formatTime(event.startDateTime)
        : (defaultValues?.startTime ?? ""),
      endTime: event
        ? formatTime(event.endDateTime)
        : (defaultValues?.endTime ?? ""),
      color: event?.color ?? EVENT_COLORS[0].value,
    },
  });

  const today = getTodayKey();
  const currentTime = getCurrentTimeKey();

  const selectedDate = useWatch({
    control,
    name: "date",
  });

  const selectedStartTime = useWatch({
    control,
    name: "startTime",
  });

  const { mutateAsync: createEvent } = useCreateEvent();
  const { mutateAsync: updateEvent } = useUpdateEvent();

  const onSubmit = async (data: EventFormValues) => {
    try {
      const payload = buildEventPayload(data);

      if (event) {
        await updateEvent({
          id: event.id,
          event: payload,
        });
        toast.success("Event updated successfully");
      } else {
        await createEvent(payload);
        toast.success("Event created successfully");
      }
      onSuccess?.();
    } catch {
      toast.error("Oops, something went wrong");
    }
  };

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <CustomInput
        label="Title"
        placeholder="Event title"
        error={errors.title?.message}
        {...register("title")}
      />

      <div className="flex gap-2">
        <CustomInput
          label="Date"
          type="date"
          min={today}
          error={errors.date?.message}
          {...register("date")}
        />

        <CustomInput
          label="Start"
          type="time"
          min={selectedDate === today ? currentTime : undefined}
          error={errors.startTime?.message}
          {...register("startTime")}
        />

        <CustomInput
          label="End"
          type="time"
          min={selectedStartTime || undefined}
          error={errors.endTime?.message}
          {...register("endTime")}
        />
      </div>

      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <CustomSelect
            label="Category"
            placeholder="Select category"
            value={field.value}
            onValueChange={field.onChange}
            error={errors.category?.message}
            options={[
              {
                label: "Online",
                value: EVENT_CATEGORIES.ONLINE,
              },
              {
                label: "Offline",
                value: EVENT_CATEGORIES.OFFLINE,
              },
            ]}
          />
        )}
      />

      <CustomTextarea
        label="Description"
        placeholder="Event description"
        error={errors.description?.message}
        {...register("description")}
      />

      <Controller
        control={control}
        name="color"
        render={({ field }) => (
          <CustomSelect
            label="Color"
            placeholder="Select color"
            value={field.value}
            onValueChange={field.onChange}
            error={errors.color?.message}
            options={EVENT_COLORS}
          />
        )}
      />
    </form>
  );
}
