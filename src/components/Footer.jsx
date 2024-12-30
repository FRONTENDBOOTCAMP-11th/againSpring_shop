
const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-6">
        <div className="text-gray-700 text-sm space-y-2">
          <p>
            상호: 다시봄 | 대표: 멋사 2조
          </p>
          <p>
            사업자등록번호: 123-45-678 | 통신판매업신고: 2024-00-0000
          </p>
          <p>
            개인정보보호 관리책임자: 다시봄 | 주소: 서울시 강서구
          </p>
          <p>
            이메일: help@help.net | 고객센터: 010-1234-1234
          </p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-4">
            <a href="/terms" className="text-gray-500 hover:text-secondary text-sm">
              이용약관
            </a>
            <a href="/privacy" className="text-gray-500 hover:text-secondary text-sm">
              개인정보처리방침
            </a>
          </div>
          <div className="text-gray-400 text-sm">
            Copyright © 2024 다시봄 store all rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
