"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./login.module.css";

type FormValues = {
  email: string;
  password: string;
};

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (values: FormValues) => {
    // Handle login logic here
    console.log("Login attempt with:", values);
  };

  return (
    <div className={styles.loginContainer}>
      <div
        className={styles.backgroundPattern}
        style={{
          backgroundImage: "url('/placeholder.svg?height=200&width=200')",
        }}
      ></div>

      <div className={styles.cardWrapper}>
        {/* Glassmorphic card */}
        <div className={styles.glassmorphicCard}>
          {/* Decorative elements */}
          <div className={styles.greenBlob}></div>
          <div className={styles.blueBlob}></div>

          {/* Content */}
          <div className={styles.content}>
            <div className={styles.header}>
              <h1 className={styles.title}>Admin Login</h1>
              <p className={styles.subtitle}>Sign in to your admin dashboard</p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Email
                    </label>
                    <div className={styles.inputWrapper}>
                      <div className={styles.iconLeft}>
                        <Mail className="h-5 w-5" />
                      </div>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        placeholder="admin@example.com"
                        className={`${styles.input} ${
                          errors.email && touched.email ? styles.inputError : ""
                        }`}
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <div className={styles.formHeader}>
                      <label htmlFor="password" className={styles.label}>
                        Password
                      </label>
                      <Link href="#" className={styles.forgotPassword}>
                        Forgot password?
                      </Link>
                    </div>
                    <div className={styles.inputWrapper}>
                      <div className={styles.iconLeft}>
                        <Lock className="h-5 w-5" />
                      </div>
                      <Field
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={`${styles.input} ${
                          errors.password && touched.password
                            ? styles.inputError
                            : ""
                        }`}
                      />
                      <div
                        className={styles.iconRight}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className={styles.errorMessage}
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
