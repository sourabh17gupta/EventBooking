import signupImg from "../assest/signup.jpg"
import Template from "../components/auth/Template"

function Signup() {
  return (
    <Template
      title="Get your music fix with festival"
      description1="Enjoy and make some fun."
      description2="Get good experienece to buy ticket."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup