import { Link } from "react-router-dom";
import styles from "./Signup.module.less";
import { useAuth } from "./AuthContext";
import { Formik, Field, FieldProps, ErrorMessage } from "formik";
import { Form, Input, Button, Checkbox, Radio, message } from "antd";
import { signupSchema } from "../../yup/signupSchema";
import GoogleLogo from "../../assets/images/GoogleLogo.png";
import { useNavigate } from "react-router-dom";
import ManAvatar from "../../assets/images/ManAvatar.png";
import WomanAvatar from "../../assets/images/WomanAvatar.png";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { googleSignIn } = useAuth();

  const handleSetFieldError = (setFieldError: any, error: any) => {
    const message =
      error.code === "auth/email-already-in-use"
        ? "This email is already in use, please try another one."
        : "An unexpected error occurred. Please try again.";
    setFieldError("email", message);
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/", { replace: true });
    } catch (error) {
      message.error("Error during Google sign-in");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          agreement: false,
          gender: "",
        }}
        validationSchema={signupSchema}
        validateOnMount={true}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          const avatar = values.gender === "male" ? ManAvatar : WomanAvatar;
          try {
            await signup(values.email, values.password, values.name, avatar);
            navigate("/", { replace: true });
          } catch (error: any) {
            handleSetFieldError(setFieldError, error);
          }
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, isSubmitting, errors, values }) => (
          <Form onFinish={handleSubmit} className={styles.signupForm}>
            <h2>Create an account</h2>

            <label className={styles.label} htmlFor="name">
              Full Name
            </label>
            <Field name="name" as={Input} placeholder="Full Name..." />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.errorMessage}
            />

            <label className={styles.label} htmlFor="email">
              Email Address
            </label>
            <Field
              name="email"
              as={Input}
              placeholder="hello@example.com"
              type="email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.errorMessage}
            />

            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <Field name="password" as={Input.Password} placeholder="Password" />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.errorMessage}
            />

            <label className={styles.label} htmlFor="gender">
              Gender
            </label>
            <Field name="gender">
              {({ field }: FieldProps) => (
                <Radio.Group {...field} className={styles.genderGroup}>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Radio.Group>
              )}
            </Field>

            <Form.Item name="agreement" valuePropName="checked">
              <Field type="checkbox" name="agreement">
                {({ field }: FieldProps) => (
                  <Checkbox className={styles.checkbox} {...field}>
                    By continuing, you agree to our terms of service.
                  </Checkbox>
                )}
              </Field>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  isSubmitting ||
                  !values.agreement ||
                  !values.gender ||
                  !!(errors.name || errors.email || errors.password)
                }
                className={styles.signupButton}
              >
                Sign up
              </Button>
            </Form.Item>

            <div className={styles.divider}>
              <div className={styles.line}></div>
              <span>or sign up with</span>
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
              <p>
                Already have an account? <Link to="/login">Sign in here</Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
