import LoginHeader from "../components/login/LoginHeader";
import LoginForm from "../components/login/LoginForm";
import loginStyles from './Login.module.css'

export default function Login() {
  return (
    <div className={loginStyles['login-container']}>
      <LoginHeader />
      <LoginForm />
    </div>
  );
}
