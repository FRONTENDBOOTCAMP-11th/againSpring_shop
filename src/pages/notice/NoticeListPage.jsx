import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import '../../assets/styles/fonts.css';
import useUserStore from '@store/userStore';
import useAxiosInstance from '@hooks/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';
import NoticeListItem from './NoticeListItem';
import { useEffect, useState } from 'react';

// 사용자 정보 조회 API 함수
const fetchUserInfo = async (axios) => {
  const response = await axios.get('/users');
  return response.data;
};

// TODO 1: 검색 결과 상태 관리 추가 (부분완료)
// 1. 현재 페이지 번호 리셋 (완료)
// 2. URL 파라미터 업데이트 (검색어, 검색 타입 포함) (미완료)
// 3. 페이지네이션 정보 업데이트 (완료)

// TODO 2: 에러 처리 (부분완료)
// 1. 검색 실패 시 에러 메시지 표시 (부분완료)
// 2. 검색 결과가 없을 때의 UI 처리 (완료)
// 3. 로딩 상태 처리 (완료)

// TODO 3: URL 파라미터와 상태 동기화 (부분완료)
// 1. URL에서 검색 관련 파라미터 읽기 (완료)
// 2. 컴포넌트 마운트 시 URL 파라미터 기반으로 초기 검색 수행 (미완료)
// 3. 검색 조건 변경 시 URL 업데이트 (수정필요)

export default function NoticeListPage() {
  const PAGES_PER_GROUP = 5;
  const limit = 12;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const axios = useAxiosInstance();
  const { user } = useUserStore();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const [periodType, setPeriodType] = useState('all-day');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [sortOption, setSortOption] = useState(() => {
    const sortParam = searchParams.get('sort');
    if (!sortParam) return 'default';
    // URL의 sort 파라미터를 옵션값으로 변환하는 로직
    const options = {
      '{"title":1}': 'title-asc',
      '{"title":-1}': 'title-desc',
      '{"createdAt":1}': 'date-asc',
      '{"createdAt":-1}': 'date-desc',
      '{"views":1}': 'view-asc',
      '{"views":-1}': 'view-desc',
    };
    return options[sortParam] || 'default';
  });

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => fetchUserInfo(axios),
  });

  const { data: noticeData, isLoading: isNoticeLoading } = useQuery({
    queryKey: [
      'posts',
      'notice',
      currentPage,
      sortOption,
      periodType,
      startDate,
      endDate,
    ],
    queryFn: () =>
      axios.get('/posts', {
        params: {
          type: 'notice',
          page: currentPage,
          limit,
          ...(sortOption !== 'default' && {
            sort: getSortParamsByOption(sortOption),
          }),
          ...(periodType === 'custom' && {
            // 기간 입력이 선택된 경우에만 날짜 파라미터 추가
            startDate,
            endDate,
          }),
        },
      }),
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

  useEffect(() => {
    if (noticeData?.item) {
      setFilteredData(noticeData.item);
    }
  }, [noticeData?.item]);

  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);

    // URL 파라미터 업데이트
    const newSearchParams = new URLSearchParams(searchParams);
    if (newSortOption !== 'default') {
      newSearchParams.set('sort', getSortParamsByOption(newSortOption));
    } else {
      newSearchParams.delete('sort');
    }
    navigate(`?${newSearchParams.toString()}`);
  };

  const handlePeriodChange = (newPeriodType) => {
    setPeriodType(newPeriodType);
    const newSearchParams = new URLSearchParams(searchParams);

    if (newPeriodType === 'custom') {
      newSearchParams.set('startDate', startDate);
      newSearchParams.set('endDate', endDate);
    } else {
      newSearchParams.delete('startDate');
      newSearchParams.delete('endDate');
    }

    navigate(`?${newSearchParams.toString()}`);
  };

  const handleDateChange = (type, value) => {
    if (type === 'start') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }

    // URL 파라미터 업데이트
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(type === 'start' ? 'startDate' : 'endDate', value);
    navigate(`?${newSearchParams.toString()}`);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearch = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (searchText.trim()) {
      // 검색어가 있을 때
      newSearchParams.set('keyword', searchText);
      newSearchParams.set('searchType', searchType);
    } else {
      // 검색어가 없을 때
      newSearchParams.delete('keyword');
      newSearchParams.delete('searchType');
      setFilteredData(noticeData.item);
      navigate(`?${newSearchParams.toString()}`);
      return;
    }

    newSearchParams.set('page', '1');

    navigate(`?${newSearchParams.toString()}`);

    let apiSearchParams = {
      type: 'notice',
      page: 1,
      limit,
      keyword: searchText,
      searchType: searchType,
    };

    axios
      .get('/posts', {
        params: apiSearchParams,
      })
      .then((response) => {
        let results = response.data.item;
        setFilteredData(results);
      })
      .catch((error) => {
        console.error('검색 중 오류 발생', error);
      });
  };

  const getSortParamsByOption = (sortOption) => {
    const sortParams = {
      default: undefined,
      'title-asc': JSON.stringify({ title: 1 }), // 오름차순
      'title-desc': JSON.stringify({ title: -1 }), // 내림차순
      'date-asc': JSON.stringify({ createdAt: 1 }),
      'date-desc': JSON.stringify({ createdAt: -1 }),
      'view-asc': JSON.stringify({ views: 1 }),
      'view-desc': JSON.stringify({ views: -1 }),
    };

    return sortParams[sortOption];
  };

  const getPageLink = (pageNum) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNum.toString());
    if (sortOption !== 'default') {
      params.set('sort', getSortParamsByOption(sortOption));
    }
    return `?${params.toString()}`;
  };

  const userType = user
    ? userData.item.find((item) => item._id === user._id)?.type
    : null;
  const isAdmin = userType === 'admin';

  const totalData = noticeData?.pagination?.total || 0;
  const totalPages = Math.max(1, Math.ceil(totalData / limit));
  const currentGroup = Math.ceil(currentPage / PAGES_PER_GROUP);
  const startPage = (currentGroup - 1) * PAGES_PER_GROUP + 1;
  const endPage = Math.min(currentGroup * PAGES_PER_GROUP, totalPages);
  const prevGroupLastPage = startPage - 1;
  const nextGroupFirstPage = endPage + 1;
  const showPrevButton = currentGroup > 1;
  const showNextButton = endPage < totalPages;

  if (isUserLoading || isNoticeLoading) {
    return <div>로딩중...</div>;
  }

  if (!userData?.item || !noticeData?.item) {
    return <div>데이터를 불러오는데 실패했습니다.</div>;
  }

  const noticePostList = searchText.trim() ? (
    filteredData.length > 0 ? (
      // 검색 결과가 있을 때
      filteredData.map((item, index) => (
        <NoticeListItem
          key={item._id}
          item={item}
          number={totalData - ((currentPage - 1) * limit + index)}
        />
      ))
    ) : (
      // 검색 결과가 없을 때
      <div className='col-span-4 py-16'>
        <div className='flex flex-col items-center gap-2'>
          <span className='text-4xl' role='img' aria-label='검색'>
            🔍
          </span>
          <p className='text-grey-60'>검색 결과가 없습니다.</p>
          <p className='text-sm text-grey-40'>다른 검색어로 시도해보세요.</p>
          <button
            onClick={() => {
              setSearchText('');
              setFilteredData(noticeData.item);
              const newSearchParams = new URLSearchParams(searchParams);
              newSearchParams.delete('keyword');
              newSearchParams.set('page', '1');
              navigate(`?${newSearchParams.toString()}`);
            }}
            className='mt-2 px-4 py-2 bg-secondary-20 text-white rounded hover:bg-secondary-40 transition-colors'
          >
            전체 공지사항 보기
          </button>
        </div>
      </div>
    )
  ) : (
    // 검색어가 없을 때
    noticeData.item.map((item, index) => (
      <NoticeListItem
        key={item._id}
        item={item}
        number={totalData - ((currentPage - 1) * limit + index)}
      />
    ))
  );

  return (
    <div className='w-[1200px] mx-auto px-6 mb-20'>
      <h1 className='h-[80px] text-4xl text-center box-border m-0 px-0 py-[20px]'>
        공지사항
      </h1>
      <div className='flex justify-between items-center mb-4'>
        <select
          value={sortOption}
          onChange={(e) => handleSortChange(e)}
          className='border border-grey-20 rounded p-1 text-lg focus:border-secondary-30 focus:ring-1 focus:ring-secondary-30 text-grey-60'
          aria-label='정렬 기준'
        >
          <option value='default'>기본순</option>
          <option value='title-asc'>제목 오름차순</option>
          <option value='title-desc'>제목 내림차순</option>
          <option value='date-asc'>작성일 오름차순</option>
          <option value='date-desc'>작성일 내림차순</option>
          <option value='view-asc'>조회수 오름차순</option>
          <option value='view-desc'>조회수 내림차순</option>
        </select>

        {isAdmin && (
          <button
            onClick={() => navigate('/notice/new')}
            className='px-5 py-2 bg-secondary-20 text-white rounded hover:bg-secondary-40 transition-colors'
          >
            작성하기
          </button>
        )}
      </div>
      <div className='grid grid-cols-[repeat(4,280px)] justify-center gap-6 w-[calc(4_*_280px_+_3_*_24px)] mx-auto my-0'>
        {noticePostList}
      </div>

      <div className='justify-center mb-[16px] flex gap-[16px] mt-10'>
        {/* 페이지네이션 영역 */}
        {totalPages > 1 && ( // 전체 페이지가 1보다 클 때만 표시
          <div className='justify-center mb-[16px] flex gap-[16px] mt-10'>
            {showPrevButton && (
              <Link
                to={getPageLink(prevGroupLastPage)}
                className='bg-grey-20 text-black w-[60px] py-[8px] rounded-md text-[15px] text-center hover:bg-grey-30'
              >
                Prev
              </Link>
            )}

            {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
              const pageNum = startPage + i;
              return (
                <Link
                  key={pageNum}
                  to={getPageLink(pageNum)}
                  className={`${
                    currentPage === pageNum
                      ? 'bg-secondary-20 text-white'
                      : 'bg-grey-20 text-black'
                  } w-[40px] py-[8px] rounded-md text-[15px] text-center hover:bg-grey-30`}
                >
                  {pageNum}
                </Link>
              );
            })}

            {showNextButton && (
              <Link
                to={getPageLink(nextGroupFirstPage)}
                className='bg-grey-20 text-black w-[60px] py-[8px] rounded-md text-[15px] text-center hover:bg-grey-30'
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>

      <div className='pt-10 flex justify-center gap-[5.4px] h-[70.67px]'>
        <div className='relative w-[120px]'>
          <select
            value={periodType}
            onChange={(e) => handlePeriodChange(e.target.value)}
            className='w-full h-[37px] px-2.5 border border-grey-10 rounded bg-white'
          >
            <option value='all-day'>전체기간</option>
            <option value='one-day'>1일</option>
            <option value='one-week'>1주</option>
            <option value='one-month'>1개월</option>
            <option value='six-month'>6개월</option>
            <option value='one-year'>1년</option>
            <option value='custom'>기간 입력</option>
          </select>
        </div>

        {periodType === 'custom' && (
          <div className='flex gap-2'>
            <input
              type='date'
              value={startDate}
              onChange={(e) => handleDateChange('start', e.target.value)}
              className='h-[37px] px-2 border border-gray-300 rounded'
            />
            <span className='flex items-center'>~</span>
            <input
              type='date'
              value={endDate}
              onChange={(e) => handleDateChange('end', e.target.value)}
              className='h-[37px] px-2 border border-gray-300 rounded'
            />
          </div>
        )}
        <div className='relative w-[120px]'>
          <select
            value={searchType}
            onChange={handleSearchTypeChange}
            className='w-full h-[37px] px-2.5 border border-grey-10 rounded bg-white'
          >
            <option value='title'>제목</option>
            <option value='content'>내용</option>
            <option value='all'>제목+내용</option>
          </select>
        </div>
        <input
          type='text'
          value={searchText}
          onChange={handleSearchChange}
          className='h-[37px] py-0 px-3 border border-grey-10 rounded w-[200px]'
          placeholder='검색어를 입력하세요'
        />
        <button
          type='submit'
          onClick={handleSearch}
          className='bg-secondary-20 hover:bg-secondary-40 transition-colors text-white h-[37px] py-0 px-[25px] border-none rounded cursor-pointer leading-[37px]'
        >
          찾기
        </button>
      </div>
    </div>
  );
}
