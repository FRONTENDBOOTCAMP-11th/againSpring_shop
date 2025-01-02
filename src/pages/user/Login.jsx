import "./main.css";

function Login() {
  return (
    <>
      <div className="my-12 mx-auto">
        <div className="content">
          <div className="login_logo_wrap">
            <img src="/public/favicon.png" alt="logo" />
          </div>

          <div className="login_wrap">
            <form>
              <div className="userInput">
                <div className="field">
                  <input id="email" type="text" placeholder="아이디" />
                </div>

                <div className="field">
                  <input id="password" type="password" placeholder="비밀번호" />
                </div>
              </div>

              <div className="btn-area">
                <button className="button btn-login">로그인</button>
                <button className="button btn-kakao">
                  카카오톡으로 시작하기
                </button>
              </div>

              <label className="choice">
                <input type="checkbox" />
                자동 로그인
              </label>

              <ul className="find_wrap">
                <li className="signUp">
                  <a>회원가입</a> ｜
                </li>
                <li>
                  <div className="find_text">
                    <a>아이디</a> · <a>비밀번호</a> 찾기
                  </div>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
