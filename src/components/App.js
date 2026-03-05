import { use, useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  useEffect(() => { // 특정 시점에 실행되는 함수
    authService.onAuthStateChanged((user) => { // 파이어베이스 로그인 정보를 받는 시점
      if (user) {
          setIsLoggedIn(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializing..."}
    <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </>
  );
}

export default App;