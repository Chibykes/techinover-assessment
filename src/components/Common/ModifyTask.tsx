import { CgClose } from "react-icons/cg";
import uploadImage from "../../assets/upload.svg";
import { useContext, useState } from "react";
import { CreateAppLevelContext } from "../../contexts/app";
import { TaskInterface } from "../../types";
import { useFormik } from "formik";
import * as yup from "yup";
import { clsx } from "clsx";
import { FaRegTrashAlt } from "react-icons/fa";
import moment from "moment";

interface ModifyTaskInterface {
  columnId?: string;
  forEdit?: true;
  task?: TaskInterface;
  onClose: () => void;
}

const ModifyTask = ({ columnId, forEdit, onClose }: ModifyTaskInterface) => {
  const { setState } = useContext(CreateAppLevelContext);

  const formik = useFormik({
    initialValues: {
      columnId: columnId || "todo",
      priority: "",
      taskName: "",
      coverPhoto: "",
      description: "",
      deadlineDate: "",
      deadlineTime: "",
    },
    validationSchema: yup.object({
      columnId: yup.string().required(),
      priority: yup.string().required("Priorty is required"),
      taskName: yup.string().required("Task name is required"),
      deadlineDate: yup.string().required("Deadline date is required"),
      deadlineTime: yup.string().required("Deadline time is required"),
    }),
    onSubmit: (values) => {
      const newTask: TaskInterface = {
        id: crypto.randomUUID(),
        columnId: values.columnId as string,
        priority: values.priority as TaskInterface["priority"],
        taskName: values.taskName,
        coverPhoto: values.coverPhoto,
        description: values.description,
        deadline: moment(
          `${values.deadlineDate} ${values?.deadlineTime}`,
          "YYYY-MM-DD HH:mm",
        ).format(),
        createdAt: moment().format(),
      };
      console.table(newTask);

      setState?.((n) => ({
        ...n,
        search: "",
        tasks: [...n.tasks, newTask],
      }));

      onClose();
    },
  });

  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string | null>(null);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const base64String = await convertToBase64(selectedFile);
      setFile(selectedFile);
      // setPreview(URL.createObjectURL(selectedFile));
      formik.setValues({ ...formik.values, coverPhoto: base64String });
      setBase64(base64String);
    }
  };

  return (
    <div className="fixed top-0 left-0 isolate z-50 h-full w-full p-8">
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

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Upload cover
                <span className="font-normal text-[#848585]">(Optional)</span>
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-gray-300 p-4">
                {base64 ? (
                  <div className="flex items-center justify-between gap-4">
                    <img className="w-[40%] rounded-sm" src={base64} />
                    <div className="flex w-full flex-col gap-2">
                      <p className="text-sm font-medium">{file?.name}</p>
                      <p className="text-xs font-normal text-neutral-600">
                        {file?.size ? (file?.size / 1024 / 1024).toFixed(2) : 0}{" "}
                        MB
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="relative h-2 w-full overflow-hidden rounded-full">
                          <span className="absolute top-0 left-0 h-full w-full bg-indigo-600"></span>
                        </div>
                        <span className="text-xs font-normal text-neutral-600">
                          100%
                        </span>
                      </div>
                    </div>
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        setBase64(null);
                        formik.setValues({ ...formik.values, coverPhoto: "" });
                      }}
                    >
                      <FaRegTrashAlt
                        size={20}
                        className="shrink-0 text-neutral-600"
                      />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      className="m-auto"
                      src={uploadImage}
                      width={40}
                      height={40}
                    />
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                      >
                        <span className="font-medium">Click to upload</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs/5 text-gray-600">PNG, JPG</p>
                  </div>
                )}
              </div>
            </div>

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

export default ModifyTask;
