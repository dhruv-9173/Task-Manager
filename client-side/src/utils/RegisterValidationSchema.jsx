import * as yup from "yup"
const RegitserValidationSchema = yup.object().shape({
    name : yup.string().required("Name should be mentioned")
                       .max(3,"Enter Full Name"),
    email : yup.string().required("Email is required")
                        .matches('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$', "Please Enter Valid Email"),
    password : yup.string().required("Create a password")
                           .max(8, "Password size must be atleast 8"),                  
    confirmPassword: yup.string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
})
export default RegitserValidationSchema;