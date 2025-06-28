import loginImg from "../assest/login.avif"
import Template from "../components/auth/Template"

function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Enjoy booking the ticket ."
      description2="Just get smooth experience with us."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login