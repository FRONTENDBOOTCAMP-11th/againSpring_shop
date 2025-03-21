import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { jwtDecode } from 'jwt-decode';
import useAxiosInstance from '@hooks/useAxiosInstance';
import useUserStore from '@store/userStore';

function GoogleLoginButton() {
  const instance = useAxiosInstance();
  const setUser = useUserStore((state) => state.setUser);

  // 로그인 함수
  async function handleGoogleLogin() {
    try {
      // Firebase로 구글 로그인
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // ID 토큰 → 구글 사용자 정보 추출
      const idToken = await result.user.getIdToken(true);
      const decoded = jwtDecode(idToken);

      const sub = decoded.sub;
      const email = decoded.email;
      const name = decoded.name;
      const picture = decoded.picture;

      // 회원 가입 API (/users/signup/oauth)
      //  먼저 로그인 시도 (/users/login/with)
      try {
        const loginRes = await instance.post('/users/login/with', {
          providerAccountId: sub,
        });
        // 이미 가입된 회원인 경우
        const userData = loginRes.data.item;

        // userStore에 저장
        setUser({
          _id: userData._id,
          name: userData.name,
          type: userData.type,
          accessToken: userData.token.accessToken,
          refreshToken: userData.token.refreshToken,
        });

        alert(`${userData.name}님, [Google 계정] 로그인이 완료되었습니다.`);
      } catch (loginErr) {
        // 로그인 실패(404/400) → 회원가입 후 재로그인
        if (loginErr.response?.status === 404 || loginErr.response?.status === 400) {
          // 회원가입 (/users/signup/oauth)
          await instance.post('/users/signup/oauth', {
            type: 'user',
            loginType: 'google',
            name,
            email,
            image: picture,
            extra: {
              providerAccountId: sub,
              ...decoded, // iss, iat, exp 등 필요하면 모두 저장 가능
            },
          });

          // 가입 후 다시 로그인
          const secondLogin = await instance.post('/users/login/with', {
            providerAccountId: sub,
          });
          const userData = secondLogin.data.item;

          // userStore에 토큰/회원정보 저장
          setUser({
            _id: userData._id,
            name: userData.name,
            type: userData.type,
            accessToken: userData.token.accessToken,
            refreshToken: userData.token.refreshToken,
          });

          alert(`${userData.name}님, [Google 계정] 신규 회원 가입 + 로그인이 완료되었습니다.`);
        } else if (loginErr.response?.status === 409) {
          // 이미 가입된 사용자(Conflict) - 백엔드가 409를 준다면
          // 바로 로그인 로직으로 넘어가거나, 메시지 띄움
          alert('이미 가입된 사용자입니다. 다시 로그인 해주세요.');
        } else {
          // 그 외 에러
          throw loginErr;
        }
      }
    } catch (error) {
      console.error('Google OAuth 에러:', error);
      alert('로그인 실패. 서버 상태 및 에러 메시지를 확인해 주세요');
    }
  }

  return (
    <button onClick={handleGoogleLogin} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
      Google로 로그인
    </button>
  );
}

export default GoogleLoginButton;
