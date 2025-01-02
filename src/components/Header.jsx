import { useEffect, useState } from "react";
import useMenuStore from "../store/menuStore";

const Header = () => {
  const { activeMenu, setActiveMenu } = useMenuStore();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!hovered) {
      const timeout = setTimeout(() => setActiveMenu(null), 100); // 드롭다운 menu timout (필요없게되면 삭제)
      return () => clearTimeout(timeout);
    }
  }, [hovered, setActiveMenu]);

  const menuItems = [
    { name: "다시,봄", subMenu: ["다시,봄"], links: ["/spring"] },
    { name: "커뮤니티", subMenu: ["커뮤니티"], links: ["/community"] },
    { name: "SHOP", subMenu: ["SHOP"], links: ["/shop"] },
    { name: "문의사항", subMenu: ["문의사항"], links: ["/inquiry"] },
    { name: "공지사항", subMenu: ["공지사항", "이벤트", "Q&A"], links: ["/notice", "/event", "/qna"] },
  ];

  return (
    <header className="w-full bg-white shadow-md">
      <div className="flex justify-center py-4">
        {/* 로고 */}
        <img src="/public/images/logo.png" alt="logo" className="w-12 h-12" />
      </div>

      <nav className="w-full">
        <div className="flex justify-center space-x-8">
          {menuItems.map((item, index) => (
            <div key={index} className="relative group"
              onMouseEnter={() => {
                setActiveMenu(item.name);
                setHovered(true);
              }}
              onMouseLeave={() => setHovered(false)}
            >
              <a href="#" className="text-gray-700 hover:text-secondary font-semibold"> {item.name} </a>
              {item.subMenu && activeMenu === item.name && (
                <div className="absolute top-full mt-2 bg-white shadow-lg rounded-md p-6 min-w-[200px]">
                  <ul className="space-y-3">
                    {item.subMenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <a href={item.links[subIndex]} className="hover:text-secondary cursor-pointer block"> {subItem} </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      <div className="absolute top-4 right-6 flex space-x-4">
        <a href="/login" className="text-gray-700 hover:text-secondary">로그인</a>
        <a href="/profile" className="text-gray-700 hover:text-secondary">
          <i className="fas fa-user"></i>
        </a>
        <a href="/cart" className="text-gray-700 hover:text-secondary">
          <i className="fas fa-shopping-cart"></i>
        </a>
        <a href="/search" className="text-gray-700 hover:text-secondary">
          <i className="fas fa-search"></i>
        </a>
      </div>
    </header>
  );
};

export default Header;
