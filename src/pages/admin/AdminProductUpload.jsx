import { useState } from 'react';
import useProductApi from '@hooks/useAddProduct';
import { uploadProductImage } from '@utils/uploadProductImage';

// select로 표시할 카테고리 목록
const CATEGORY_OPTIONS = [
  { label: '주방용품', value: 'kitchen' },
  { label: '세탁용품', value: 'laundry' },
  { label: '욕실용품', value: 'bathroom' },
  { label: '문구용품', value: 'stationery' },
  { label: '식품', value: 'food' },
  { label: '생활잡화', value: 'life' },
  { label: '반려동물', value: 'pet' },
];

const AdminProductUpload = () => {
  // 관리자 상품 등록 페이지
  const { addProduct } = useProductApi(); // 상품 등록 API 호출
  const [product, setProduct] = useState({
    // 상품 정보 상태
    name: '',
    price: '',
    quantity: '',
    shippingFees: '',
    mainImages: [],
    content: '',
    extra: {
      isNew: false,
      isBest: false,
      category: ['all-of-list'],
      tanso: 0,
    },
  });

  // 인풋 값 변경 이벤트 핸들러
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value }); // 상품 정보 업데이트
  };

  // 카테고리 변경 이벤트 핸들러
  const handleCategoryChange = (e) => {
    const selected = e.target.value; // 선택된 카테고리
    setProduct((prev) => ({
      // 상품 정보 업데이트
      ...prev, // 기존 상품 정보 유지
      extra: {
        // extra 정보 업데이트
        ...prev.extra, // 기존 extra 정보 유지
        category: ['all-of-list', selected], // 선택된 카테고리 추가
      },
    }));
  };

  // 탄소 수치 변경 이벤트 핸들러
  const handleTansoChange = (e) => {
    setProduct((prev) => ({
      // 상품 정보 업데이트
      ...prev, // 기존 상품 정보 유지
      extra: {
        // extra 정보 업데이트
        ...prev.extra, // 기존 extra 정보 유지
        tanso: Number(e.target.value), // 탄소 수치 숫자로 변환
      },
    }));
  };

  // 신상품 변경 이벤트 핸들러
  const handleIsNewChange = (e) => {
    setProduct((prev) => ({
      // 상품 정보 업데이트
      ...prev, // 기존 상품 정보 유지
      extra: {
        // extra 정보 업데이트
        ...prev.extra, // 기존 extra 정보 유지
        isNew: e.target.checked, // 체크 여부에 따라 isNew 값 변경
      },
    }));
  };

  const handleIsBestChange = (e) => {
    setProduct((prev) => ({
      // 상품 정보 업데이트
      ...prev, // 기존 상품 정보 유지
      extra: {
        ...prev.extra,
        isBest: e.target.checked, // 체크 여부에 따라 isBest 값 변경
      },
    }));
  };

  // 이미지 변경 이벤트 핸들러
  const handleImageChange = async (e) => {
    // e.target.files는 사용자가 선택한 파일들의 fileList 객체
    const files = Array.from(e.target.files); // 파일 목록을 일반 배열로 변환
    if (!files.length) return; // 선택 파일이 없으면 함수 종료

    try {
      // 이미지 업로드 시도
      // Promise.all을 사용하여 여러 이미지를 동시에 업로드
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          // files.map()을 통해 각 파일마다 업로드 작업(uploadProductImage 호출)을 수행.
          const fileUrl = await uploadProductImage(file); // 이미지 업로드 함수 호출
          return {
            path: fileUrl, // 이미지 URL = 서버가 반환한 파일 URL
            name: file.name, // 이미지 파일 이름
            originalname: file.name, // 이미지 원본 이름
          };
        })
      );

      // 기존 prodct state에 저장된 mainImages 배열과
      // 새로 업로드된 이미지 객체들이 담긴 배열(uploadImages)를 합쳐서 업데이트.
      setProduct((prev) => ({
        // 상품 정보 업데이트
        ...prev, // 기존 상품 정보 유지
        mainImages: [...prev.mainImages, ...uploadedImages], //mainImages 배열에 새 이미지 추가 (필요 시 여러 장 업로드도 가능)
      }));
    } catch (error) {
      alert('이미지 업로드 실패');
    }
  };

  // 상품 등록 이벤트 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 이벤트 기본 동작 방지

    // 상품 설명 최소 10자 검증 (이미 백엔드 로직에 구현되어있으나 프론트에서도 추가로 검증)
    if (product.content.length < 10) {
      // 상품 설명이 10자 미만이면
      alert('상품 설명은 최소 10자 이상 입력해야 합니다.'); // 경고 메시지 출력
      return;
    }

    // 상품 데이터
    const productData = {
      ...product, // ...product로 상품 정보 전달
      price: Number(product.price), // 가격, 수량, 배송비는 숫자로 변환
      quantity: Number(product.quantity), // 가격, 수량, 배송비는 숫자로 변환
      shippingFees: Number(product.shippingFees), // 가격, 수량, 배송비는 숫자로 변환
    };

    console.log('최종 변환된 보낼 데이터:', productData); // 콘솔에서 확인

    try {
      // 상품 등록 요청
      await addProduct(productData); // 상품 등록 API 호출
      alert('상품이 등록되었습니다!'); // 성공 메시지 출력
      navigator('/shop'); // 등록 후 상품 목록 페이지로 이동
    } catch (error) {
      // 상품 등록 실패 시
      console.error('상품 등록 실패:', error.response?.data || error.message); // 에러 메시지 출력
    }
  };

  return (
    <div>
      <h2>관리자 상품 등록 페이지</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="상품명" onChange={handleChange} required />
        <input type="number" name="price" placeholder="가격" onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="수량" onChange={handleChange} required />
        <input type="number" name="shippingFees" placeholder="배송비" onChange={handleChange} />
        <div>
          <label>
            <input type="checkbox" checked={product.extra.isNew} onChange={handleIsNewChange} />
            신상품
          </label>
          <label>
            <input type="checkbox" checked={product.extra.isBest} onChange={handleIsBestChange} />
            베스트 상품
          </label>
        </div>
        <select onChange={handleCategoryChange} defaultValue="">
          <option value="" disabled>
            카테고리를 선택해주세요.
          </option>
          {/*CATEGORY_OPTIONS q배열의 각 요소를 순회할 때 사용하는 cat  */}
          {CATEGORY_OPTIONS.map(
            (
              cat // 배열의 각 항목을 순회함
            ) => (
              //  cat에 대해 option 태그 생성
              <option
                key={cat.value} // {/* 배열을 랜더링할 때 각 요소에 고유한 key를 부여하고  */}
                value={cat.value} // {/* 옵션태그의 값으로 사용되며 관리자가 선택하려고 할때 해당 값 선택  */}
              >
                {cat.label} {/* 드롭다운 메뉴 표시 */}
              </option>
            )
          )}
        </select>
        <input type="number" step="0.1" placeholder="탄소 수치 (ex: 4.8)" onChange={handleTansoChange} />
        <input type="file" name="image" accept="image/*" multiple onChange={handleImageChange} />
        <textarea name="content" placeholder="상품 설명" onChange={handleChange} required />
        <button type="submit">상품 등록</button>
      </form>
    </div>
  );
};

export default AdminProductUpload;
