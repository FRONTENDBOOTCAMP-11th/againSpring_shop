import "./main.css";

function Login() {
  return (
    <>
      <header>HEADER</header>

      {/* container는 스타일링으로 건드리지 말기 */}
      <div className="container">
        <div className="content">
          <div className="login_logo_wrap">
            <img src="/public/favicon.png" alt="logo" />
          </div>

          <div className="login_wrap">
            <form className="submitForm">
              <div className="userInput">
                <div className="field">
                  <input id="email" type="text" placeholder="아이디" />
                </div>

                <div className="field">
                  <input id="password" type="password" placeholder="비밀번호" />
                </div>
              </div>

              <button className="button btn-login">로그인</button>
              <button className="button btn-kakao">
                카카오톡으로 시작하기
              </button>

              <label className="checkbox">
                <input type="checkbox" />
                자동 로그인
              </label>
              {/* <img src="src/pages/user/icons/emptybox.svg" /> */}
            </form>
          </div>
        </div>
      </div>

      <footer>FOOTER</footer>
    </>
  );
}

export default Login;
