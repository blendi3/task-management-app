import { forgotPasswordSchema } from "../../yup/forgotPasswordSchema";
import { Formik, Field, ErrorMessage } from "formik";
import { Form, Input, Button, message } from "antd";
import styles from "./ForgotPassword.module.less";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();

  const handleResetPassword = async (email: string) => {
    try {
      await resetPassword(email);
      message.success({
        content: "Check your inbox for further instructions.",
        icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      });
    } catch (error: any) {
      if (error.code === "auth/invalid-email") {
        message.error({
          content: "Email address not found. Please try again.",
          icon: <CloseCircleOutlined style={{ color: "#ff4d4f" }} />,
        });
      } else {
        message.error({
          content: "An unexpected error occurred. Please try again.",
          icon: <CloseCircleOutlined style={{ color: "#ff4d4f" }} />,
        });
      }
    }
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={forgotPasswordSchema}
        onSubmit={async (values, actions) => {
          await handleResetPassword(values.email);
          actions.setSubmitting(false);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form className={styles.form} onFinish={handleSubmit}>
            <h2 className={styles.title}>Forgot Password?</h2>
            <p className={styles.description}>
              Enter your email address to get the password reset link.
            </p>
            <label className={styles.label} htmlFor="email">
              Email Address
            </label>
            <Field
              name="email"
              as={Input}
              className="ant-input"
              placeholder="Email Address"
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.errorMessage}
            />

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isSubmitting}
                className={styles.resetButton}
              >
                Password Reset
              </Button>
            </Form.Item>

            <Link to="/login" className={styles.backToLogin}>
              Back to login
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
