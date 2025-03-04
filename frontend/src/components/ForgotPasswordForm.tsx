import { Formik, FormikHelpers, Form } from "formik";
import { InputProps } from "../types/form";
import Input from "./Input";
import * as Yup from "yup";

interface ForgotPasswordFormProps<T> {
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

const ForgotPasswordForm = <T extends object>({
  initialValues,
  validationSchema,
  handleSubmit,
  title,
  inputs,
  buttonText,
}: ForgotPasswordFormProps<T>) => {
  return (
    <div className="w-full max-w-sm p-8 mx-auto rounded-lg ">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
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
              <button type="submit" className="btn-primary m-2 font-Mali">
                {buttonText}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPasswordForm;
