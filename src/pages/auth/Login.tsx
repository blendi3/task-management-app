import styles from "./Login.module.less";
import { Form, Input, Button, Checkbox, message } from "antd";
import { loginSchema } from "../../yup/loginSchema";
import { useAuth } from "./AuthContext";
import { Formik, Field, FieldProps, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import GoogleLogo from "../../assets/images/GoogleLogo.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { login, currentUser } = useAuth();
  const { googleSignIn } = useAuth();

  const handleSetFieldError = (setFieldError: any, error: any) => {
    const message =
      error.code === "auth/invalid-credential"
        ? "Invalid email address or password. Please try again!"
        : "An unexpected error occurred. Please try again.";

    setFieldError("password", message);
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      message.error("Error during Google sign-in");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Formik
        initialValues={{ email: "", password: "", remember: false }}
        validationSchema={loginSchema}
        validateOnMount={true}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            await login(values.email, values.password, values.remember);
            navigate("/");
          } catch (error) {
            handleSetFieldError(setFieldError, error);
          }
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, isSubmitting, values }) => (
          <Form onFinish={handleSubmit} className={styles.loginForm}>
            <h2>Login</h2>

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

            <div className={styles.passwordContainer}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <Link className={styles.forgotPasswordLink} to="/forgotpassword">
                Forgot Password?
              </Link>
            </div>
            <Field
              name="password"
              as={Input.Password}
              className="ant-input"
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.errorMessage}
            />

            <Field name="remember" type="checkbox">
              {({ field }: FieldProps) => (
                <Checkbox {...field} className={styles.checkbox}>
                  Keep me signed in
                </Checkbox>
              )}
            </Field>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isSubmitting || !(values.email && values.password)}
                className={styles.loginButton}
              >
                Login
              </Button>
            </Form.Item>

            <div className={styles.divider}>
              <div className={styles.line}></div>
              <span>or sign in with</span>
              <div className={styles.line}></div>
            </div>

            <div className={styles.additionalOptions}>
              <Button
                onClick={handleGoogleSignIn}
                className={styles.googleSignupButton}
              >
                <img
                  src={GoogleLogo}
                  alt="Google"
                  className={styles.googleLogo}
                />
                Continue with Google
              </Button>
              <p className={styles.creteaAccount}>
                Don't have an account?{" "}
                <Link to="/signup">Create an account</Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
