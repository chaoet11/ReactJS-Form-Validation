import React from "react";
import styles from "./From.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Swal from "sweetalert2";

export default function Form() {
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("名字為必填")
      .min(2, "名字至少兩字")
      .max(6, "名字最多六字"),
    phone: Yup.string()
      .required("手機是必填")
      .matches(/^[0-9]{10}$/, "手機格式不正確"),
    email: Yup.string()
      .required("信箱為必填")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "請輸入有效的信箱地址"
      ),
    gender: Yup.string().required("性別是必填"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
    reset(); // Clear the form fields
    Swal.fire({
      title: "提交成功",
      text: "您的表單已成功提交",
      icon: "success",
      confirmButtonText: "確認",
      confirmButtonColor: "#489aaa",
    }); // sweet alert
  };
  console.log(watch("name")); // watch input value by passing the name of it

  return (
    <>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>表單驗證</h2>
        <label className={styles.nameLabel}>
          名字：
          <input
            className={styles.nameInput}
            type="text"
            placeholder="請輸入名字..."
            {...register("name")}
          ></input>
          {errors.name && (
            <p className={styles.errorMessage}>{errors.name.message}</p>
          )}
        </label>
        <label className={styles.phoneLabel}>
          手機：
          <input
            className={styles.phoneInput}
            type="text"
            placeholder="請輸入手機..."
            {...register("phone")}
          ></input>
          {errors.phone && (
            <p className={styles.errorMessage}>{errors.phone.message}</p>
          )}
        </label>
        <label className={styles.emailLabel}>
          信箱：
          <input
            className={styles.emailInput}
            type="text"
            placeholder="請輸入信箱..."
            {...register("email")}
          ></input>
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email.message}</p>
          )}
        </label>
        <label className={styles.genderLabel}>
          性別：
          <select className={styles.genderSelect} {...register("gender")}>
            <option value="">請選擇性別</option>
            <option value="female">女</option>
            <option value="male">男</option>
          </select>
          {errors.gender && (
            <p className={styles.errorMessage}>{errors.gender.message}</p>
          )}
        </label>

        <input className={styles.submitInput} type="submit" value="確認" />
      </form>
    </>
  );
}
