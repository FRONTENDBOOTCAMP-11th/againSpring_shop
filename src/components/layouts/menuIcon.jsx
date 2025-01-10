import useUserStore from "@store/userStore";

const MenuIcons = () => {
  const { user, resetUser } = useUserStore();

  const handleLogout = (e) => {
    e.preventDefault();
    resetUser();
    alert(`${user.name} 님, 정상적으로 로그아웃 되었습니다.`);
  };

  return (
    <div className="absolute top-4 right-6 flex space-x-6 items-center">
      {user ? (
        <form className="flex gap-[20px] items-center" onSubmit={handleLogout}>
          <a href="/order" className="text-gray-700 hover:text-primary-30">
            <i className="fas fa-user"></i>
          </a>
          <a href="/cart" className="text-gray-700 hover:text-primary-30">
            <i className="fas fa-shopping-cart"></i>
          </a>
          <a href="/search" className="text-gray-700 hover:text-primary-30">
            <i className="fas fa-search mr-2"></i>
          </a>
          {user.profile && (
            <img
              className="w-12 h-12 rounded-full object-contain"
              src={`https://11.fesp.shop${user.profile}`}
              alt="프로필 이미지"
            />
          )}
          <p> {user.name} 님 :)</p>
          <button
            type="submit"
            className="bg-primary-40 py-2 px-4 text-white hover:bg-primary-20 rounded font-gowunBold"
          >
            로그아웃
          </button>
        </form>
      ) : (
        <>
          <a href="/search" className="text-gray-700 hover:text-primary-30">
            <i className="fas fa-search mr-2"></i>
          </a>
          <a
            href="/login"
            className="bg-primary-40 px-4 py-2 rounded text-white hover:bg-primary-20 font-gowunBold"
          >
            로그인
          </a>
          <a
            href="/signup"
            className="bg-secondary-20 px-4 py-2 rounded text-white hover:bg-secondary-10 font-gowunBold"
          >
            회원가입
          </a>
        </>
      )}
    </div>
  );
};

export default MenuIcons;
