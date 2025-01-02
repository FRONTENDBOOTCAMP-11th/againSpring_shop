import "./main.css";
import "./jy-global.css";

function Login() {
  return (
    <>
      <div className="my-12 mx-auto">
        <div className="w-[400px] mx-auto flex flex-col items-center p-[20px_40px_44px] border border-grey-20 rounded-[20px] gap-[44px]">
          <div className="w-16 aspect-[1/1] object-contain">
            <img src="/public/favicon.png" alt="logo" />
          </div>

          <div className="w-[320px]">
            <form>
              <div className="flex flex-col gap-3">
                <div className="border-2 border-grey-10 rounded-2xl focus-within:border-secondary-20">
                  <input id="email" type="text" placeholder="아이디" />
                </div>

                <div className="border-2 border-grey-10 rounded-2xl focus-within:border-secondary-20">
                  <input id="password" type="password" placeholder="비밀번호" />
                </div>
              </div>

              <div className="mt-8">
                <button className="font-gowunBold w-full h-[42px] text-[1.6rem] rounded-[12px] text-center cursor-pointer box-border bg-primary-40 text-white mb-[10px]">
                  로그인
                </button>
                <button className="font-gowunBold w-full h-[42px] text-[1.6rem] rounded-[12px] text-center cursor-pointer box-border bg-kakao text-black">
                  카카오톡으로 시작하기
                </button>
              </div>

              <label className="choice flex gap-3 mt-8 align-middle">
                <input type="checkbox" />
                자동 로그인
              </label>

              <ul className="font-gowun mt-12 text-center">
                <li>
                  <a className="cursor-pointer text-primary-70">회원가입</a> ｜
                </li>
                <li>
                  <div className="inline-block">
                    <a className="cursor-pointer underline">아이디</a> ·{" "}
                    <a className="cursor-pointer underline">비밀번호</a> 찾기
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
