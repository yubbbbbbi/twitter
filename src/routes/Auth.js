// 로그인 폼
import { authService } from "fbase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup
} from "firebase/auth"; 
import { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;

        if (name === "email") {
            setEmail(value);
        }
        else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault(); // 새로고침으로 인한 초기화 막음
    
        try {
            let data;
            if (newAccount) {
                // 회원 가입
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                // 로그인
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log("성공:", data);
        } catch (error) { // 에러 발생 시
            setError(error.message);
        }
    };

    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
        console.log(data);
    }

    const toggleAccount = () => setNewAccount((prev) => !prev); // newAccount의 상태 변경

    return (
        <div>
        <form onSubmit={onSubmit}>
            <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            required 
            value={email} 
            onChange={onChange} 
            />
            <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            required 
            value={password} 
            onChange={onChange} 
            />
            <input 
            name="submit" 
            type="submit" 
            value={newAccount ? "Create Account" : "Log In"} 
            />
            {error}
        </form>
        <span onClick={toggleAccount}>
            {newAccount ? "Sign In" : "Create Account"}
        </span>
        <div>
            <button onClick={onSocialClick} name="google">
                Continue with Google
            </button>
            <button onClick={onSocialClick} name="github">
                Continue with Github
            </button>
        </div>
        </div>
    );
};

export default Auth;
