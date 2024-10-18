"use client";
import { useDialog } from "@/hooks/useDialog";
import { combineTodayWithTime, convertToDateTime } from "@/lib/utils/dateUtils";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
  Textarea,
} from "@headlessui/react";

import clsx from "clsx";
import { useRouter } from "next/navigation";

import { useState } from "react";

interface FormElements extends HTMLFormControlsCollection {
  titleInput: HTMLInputElement;
  descriptioninput: HTMLTextAreaElement;
  startTimeInput: HTMLInputElement;
  endTimeInput: HTMLInputElement;
}
interface TaskFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

interface FormData {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}
const CreateTaskDialog = () => {
  const router = useRouter();
  const { closeDialog, open, openDialog } = useDialog(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
  });

  const handleSubmit = async (e: React.FormEvent<TaskFormElement>) => {
    e.preventDefault();
    try {
      const { description, endTime, startTime, title } = formData;
      const endDateTime = convertToDateTime(combineTodayWithTime(endTime));
      const startDateTime = convertToDateTime(combineTodayWithTime(startTime));
      const data = {
        description,
        title,
        endTime: endDateTime,
        startTime: startDateTime,
      };

      await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      router.refresh();
      closeDialog();
    } catch {
      throw Error("failed");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Button
        onClick={openDialog}
        className="rounded-md bg-blue-500 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-blue-700 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        + Create New Task
      </Button>

      <Dialog
        open={open}
        as="div"
        onClose={() => null}
        transition
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-lg  font-medium text-black">
                Create New Task
              </DialogTitle>
              <div className="border-t-2 divide-y-4 divide-slate-500"></div>
              <form onSubmit={handleSubmit}>
                <Field>
                  <Label className="text-sm/6 font-medium text-black">
                    Name
                  </Label>

                  <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Add Title"
                    className={clsx(
                      "mt-3 block w-full rounded-lg border-none bg-slate-100 py-1.5 px-3 text-sm/6 text-black",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                  />
                </Field>
                <Field>
                  <Label className="text-sm/6 font-medium text-black">
                    Description
                  </Label>

                  <Textarea
                    value={formData.description}
                    onChange={handleChange}
                    name="description"
                    className={clsx(
                      "mt-3 block w-full resize-none rounded-lg border-none bg-slate-100 py-1.5 px-3 text-sm/6 text-black",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                    placeholder="Add Description"
                    rows={3}
                  />
                </Field>
                <div className="flex items-center justify-between my-4 gap-4">
                  <div className="flex-grow">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      start time:
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      end time:
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center gap-4">
                  <Button
                    className=" w-full   gap-2 rounded-md border-red-400 border-2  py-1.5 px-3 text-sm/6 font-semibold text-red-400  shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-500 data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    onClick={closeDialog}
                  >
                    cancel
                  </Button>
                  <Button
                    type="submit"
                    className=" w-full gap-2 rounded-md bg-green-400 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-green-500 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  >
                    create
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CreateTaskDialog;
