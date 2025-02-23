import { clsx } from "clsx";
import { useFormik } from "formik";
import moment from "moment";
import { useContext } from "react";
import { CgClose } from "react-icons/cg";
import * as yup from "yup";
import { CreateAppLevelContext } from "../../contexts/AppContext";
import { TaskInterface } from "../../types";
import notify from "../../utilities/notify";
import FileUpload from "./FileUpload";

interface TaskFormInterface {
  columnId?: string;
  forEdit?: true;
  task?: TaskInterface;
  onClose: () => void;
}

const TaskForm = ({ columnId, task, forEdit, onClose }: TaskFormInterface) => {
  const { state, setState } = useContext(CreateAppLevelContext);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      columnId: columnId || task?.columnId || "todo",
      priority: task?.priority || "",
      taskName: task?.taskName || "",
      coverPhoto: task?.coverPhoto || "",
      description: task?.description || "",
      deadlineDate: task?.deadline
        ? moment(task?.deadline).format("YYYY-MM-DD")
        : "",
      deadlineTime: task?.deadline
        ? moment(task?.deadline).format("HH:mm")
        : "",
    },
    validationSchema: yup.object({
      columnId: yup.string().required(),
      priority: yup.string().required("Priorty is required"),
      taskName: yup.string().required("Task name is required"),
      deadlineDate: yup.string().required("Deadline date is required"),
      deadlineTime: yup.string().required("Deadline time is required"),
    }),
    onSubmit: (values) => {
      const formattedTask: TaskInterface = {
        id: task?.id || crypto.randomUUID(),
        columnId: values.columnId as string,
        priority: values.priority as TaskInterface["priority"],
        taskName: values.taskName,
        coverPhoto: values.coverPhoto,
        description: values.description,
        deadline: moment(
          `${values.deadlineDate} ${values?.deadlineTime}`,
          "YYYY-MM-DD HH:mm",
        ).format(),
        createdAt: task?.createdAt || moment(state?.currentDate).format(),
      };

      if (task || forEdit) {
        setState?.((n) => ({
          ...n,
          search: "",
          tasks: n.tasks.map((task) => {
            if (task.id === formattedTask.id) {
              return formattedTask;
            }

            return task;
          }),
        }));
        notify("Task Edited");
      } else {
        setState?.((n) => ({
          ...n,
          search: "",
          tasks: [...n.tasks, formattedTask],
        }));
        notify("New Task Added");
      }

      onClose();
    },
  });

  return (
    <div className="fixed top-0 left-0 isolate z-[99] h-full w-full p-8">
      <div className="absolute top-0 left-0 -z-[1] h-full w-full bg-[#26323899] backdrop-blur-sm"></div>
      <div className="h-full w-full">
        <form
          className="m-auto max-h-full w-full space-y-4 overflow-auto bg-white p-8 py-12 lg:w-[520px]"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex items-center justify-between">
            <p className="text-2xl font-medium">
              {forEdit ? "Edit" : "Add"} Task
            </p>
            <button
              className="grid cursor-pointer place-content-center p-1"
              onClick={onClose}
            >
              <CgClose size={32} className="text-[#848585]" />
            </button>
          </div>

          <fieldset className="flex flex-col gap-4">
            <div className="">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-900"
              >
                Task Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="taskName"
                  id="taskName"
                  placeholder="Enter task Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.taskName}
                  className={clsx(
                    formik.touched.taskName && formik.errors.taskName
                      ? "outline-red-600"
                      : "outline-gray-300",
                    "block w-full rounded-xl bg-white px-3.5 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6",
                  )}
                />
                {formik.touched.taskName && formik.errors.taskName && (
                  <p className="text-xs text-red-600">
                    {formik.errors.taskName}
                  </p>
                )}
              </div>
            </div>

            <div className="">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-900"
              >
                Description{" "}
                <span className="font-normal text-[#848585]">(Optional)</span>
              </label>
              <div className="mt-2">
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Write more on the task...."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  className="block w-full rounded-xl bg-white px-3.5 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                ></textarea>
              </div>
            </div>

            <div className="">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-900"
              >
                Priority
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="priority"
                  name="priority"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.priority}
                  className={clsx(
                    formik.touched.priority && formik.errors.priority
                      ? "outline-red-600"
                      : "outline-gray-300",
                    "col-start-1 row-start-1 w-full appearance-none rounded-xl bg-white py-2.5 pr-9 pl-3.5 text-base text-gray-900 outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6",
                  )}
                >
                  <option value="">Choose priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <svg
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              {formik.touched.priority && formik.errors.priority && (
                <p className="text-xs text-red-600">{formik.errors.priority}</p>
              )}
            </div>

            <FileUpload
              image={formik.values.coverPhoto}
              onFileUpload={(image: string | null) =>
                formik.setValues({
                  ...formik.values,
                  coverPhoto: image || "",
                })
              }
              onFileRemove={() =>
                formik.setValues({ ...formik.values, coverPhoto: "" })
              }
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-900"
                >
                  Deadline
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <input
                    type="date"
                    name="deadlineDate"
                    id="deadlineDate"
                    // placeholder="Enter task Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.deadlineDate}
                    className={clsx(
                      formik.touched.deadlineDate && formik.errors.deadlineDate
                        ? "outline-red-600"
                        : "outline-gray-300",
                      "block w-full rounded-xl bg-white px-3.5 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6",
                    )}
                  />
                  {formik.touched.deadlineDate &&
                    formik.errors.deadlineDate && (
                      <p className="text-xs text-red-600">
                        {formik.errors.deadlineDate}
                      </p>
                    )}
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-900"
                >
                  Time
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <input
                    type="time"
                    name="deadlineTime"
                    id="deadlineTime"
                    // placeholder="Enter task Name"
                    value={formik.values.deadlineTime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={clsx(
                      formik.touched.deadlineTime && formik.errors.deadlineTime
                        ? "outline-red-600"
                        : "outline-gray-300",
                      "block w-full rounded-xl bg-white px-3.5 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6",
                    )}
                  />
                  {formik.touched.deadlineTime &&
                    formik.errors.deadlineTime && (
                      <p className="text-xs text-red-600">
                        {formik.errors.deadlineTime}
                      </p>
                    )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              onSubmit={() => formik.handleSubmit}
              className="bg-button-primary my-5 block w-full cursor-pointer rounded-xl px-3.5 py-3 text-base font-medium text-white outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              Update
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
