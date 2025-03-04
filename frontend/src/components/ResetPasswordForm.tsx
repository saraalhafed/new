import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { InputProps } from "../types/form";
import Input from "./Input";

interface ResetPasswordFormProps<T> {
  initialValues: T;
  validationSchema: Yup.ObjectSchema<any>;
  handleSubmit: (
    values: T,
    formikHelpers: FormikHelpers<T>
  ) => void | Promise<void>;
  title: string;
  inputs: InputProps[];
  buttonText: string;
}

const ResetPasswordForm = <T extends object>({
  initialValues,
  validationSchema,
  handleSubmit,
  title,
  inputs,
  buttonText,
}: ResetPasswordFormProps<T>) => {
  return (
    <div className="w-full max-w-sm p-8 mx-auto rounded-lg ">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form className="space-y-4">
            <h5 className="text-3xl pb-4 text-center font-bold text-marine-blue font-Mali">
              {title}
            </h5>
            {inputs.map((input) => (
              <Input
                key={input.name}
                name={input.name as keyof T}
                label={input.label}
                inputType={input.inputType}
                placeholder={input.placeholder}
                errors={errors}
                touched={touched}
              />
            ))}

            <div className="flex flex-col justify-center items-center space-y-4 font-Roboto">
              <button
                type="submit"
                disabled={values.new_password !== values.confirm_password}
                className={`px-5 py-2 text-center text-lg rounded-lg font-medium m-2 font-Mali 
                ${
                  values.new_password !== values.confirm_password
                    ? "bg-gray-200 text-black cursor-not-allowed"
                    : "bg-blue-water text-white hover:bg-light-pink hover:text-marine-blue focus:ring-4 focus:ring-marine-blue"
                }"
                } 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {buttonText}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordForm;
