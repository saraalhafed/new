import { object, string } from "yup";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ForgotPassword = () => {
  const inputs = [
    {
      name: "email",
      label: "Email",
      inputType: "email",
      placeholder: "Enter your email",
    },
  ];

  const initialValues = {
    email: "",
  };

  const forgotPasswordSchema = object().shape({
    email: string().email("Invalid Email").required("Email is required!"),
  });

  const navigate = useNavigate();
  const { forgotPassword } = useAuth();

  const handleSubmit = (values, actions) => {
    forgotPassword(values, navigate);
    actions.setSubmitting(false);
  };
  return (
    <div className="flex items-center justify-center py-16">
      <ForgotPasswordForm
        initialValues={initialValues}
        validationSchema={forgotPasswordSchema}
        handleSubmit={handleSubmit}
        title="Forgot password"
        inputs={inputs}
        buttonText="Submit"
      />
    </div>
  );
};

export default ForgotPassword;
