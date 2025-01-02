import { Link } from 'react-router-dom';
import '../../assets/styles/fonts.css';

export default function PostDetail() {
  return (
    <div className='container mx-auto px-6 py-8'>
      <h1 className='text-2xl text-center py-4 mb-6'>공지사항</h1>

      <section className='flex flex-col min-h-screen'>
        {/* 게시글 헤더 */}
        <div className='border-t border-black'>
          <div className='flex items-center gap-[100px] py-3 border-b border-[#dedede]'>
            <label
              className='text-sm font-normal text-[#202020]'
              htmlFor='title'
            >
              제목
            </label>
            <h2 className='text-sm font-normal text-[#888]' id='title'>
              공지사항 입니다.
            </h2>
          </div>
          <div className='flex items-center gap-[100px] py-3 border-b border-[#dedede]'>
            <label
              className='text-sm font-normal text-[#202020]'
              htmlFor='writer'
            >
              작성자
            </label>
            <p className='text-sm font-normal text-[#888]' id='writer'>
              다시, 봄
            </p>
          </div>
          <div className='border-b border-[#dedede]'>
            <div className='flex gap-[43px] py-3'>
              <div className='flex items-center'>
                <label className='text-sm font-bold pl-5 mr-1' htmlFor='date'>
                  작성일
                </label>
                <p className='text-sm text-[#939393]' id='date'>
                  2024-01-01 00:00:00
                </p>
              </div>
              <div className='flex items-center'>
                <label className='text-sm font-bold mr-1' htmlFor='views'>
                  조회수
                </label>
                <p className='text-sm text-[#939393]' id='views'>
                  0
                </p>
              </div>
            </div>
            <p className='py-4'>감기조심하세요</p>
          </div>
        </div>

        {/* 댓글 섹션 */}
        <section className='border-b border-[#dedede] mb-8'>
          <div className='py-6'>
            <div className='flex items-center'>
              <label className='text-[12.9px] font-light' htmlFor='admin'>
                관리자
              </label>
              <p
                className='text-sm text-[#21212173] font-normal ml-2'
                id='admin'
              >
                2024-01-01-01 00:00:00
              </p>
            </div>
            <p className='text-[12.8px] text-[#212121e5] font-light mt-2'>
              고객님도 감기조심하세요
            </p>
            <div className='flex mt-2'>
              <button
                type='button'
                className='text-xs text-[#757575] font-normal'
              >
                댓글
              </button>
              <button
                type='button'
                className="text-xs text-[#757575] font-normal relative ml-3 before:content-['/'] before:absolute before:left-[-6.6px]"
              >
                수정
              </button>
              <button
                type='button'
                className="text-xs text-[#757575] font-normal relative ml-3 before:content-['/'] before:absolute before:left-[-6.6px]"
              >
                지우기
              </button>
            </div>
          </div>

          <div className='flex flex-col gap-4 border border-[#80808033] p-6 mb-6'>
            <textarea
              className='w-full min-h-[80px] resize-y border border-black p-2'
              placeholder='관리자만 작성하실 수 있습니다.'
              id='reply-text'
            />
            <div className='flex justify-end'>
              <button
                type='submit'
                className='rounded-lg bg-[#bc9f8b] text-white px-6 py-2'
              >
                작성
              </button>
            </div>
          </div>
        </section>

        {/* 하단 네비게이션 */}
        <div className='border-t border-[#dedede] pt-8 pb-4'>
          <div className='flex justify-between mb-5'>
            <button
              type='button'
              className='border border-[#d1d1d1] rounded px-9 py-2'
            >
              <Link to='/list'>목록</Link>
            </button>
            <div className='flex gap-3'>
              <button
                type='button'
                className='border border-[#d1d1d1] rounded px-9 py-2'
              >
                <Link to='/edit'>수정</Link>
              </button>
              <button
                type='button'
                className='border border-[#d1d1d1] rounded px-9 py-2'
              >
                <Link to='/'>삭제</Link>
              </button>
            </div>
          </div>

          <nav className='w-full'>
            <div className='border-t border-b border-[#e5e5e5]'>
              <div className='flex items-center border-b border-[#e5e5e5] min-h-[48px]'>
                <div className='w-[80px] sm:w-[100px] px-2 sm:px-4 py-3 text-[#666] text-sm shrink-0'>
                  <span className='text-xs mr-1'>▲</span>이전글
                </div>
                <Link
                  to='#'
                  className='flex-1 px-2 sm:px-4 py-3 text-sm text-[#333] hover:text-secondary truncate'
                >
                  이전 질문글
                </Link>
              </div>
              <div className='flex items-center min-h-[48px]'>
                <div className='w-[80px] sm:w-[100px] px-2 sm:px-4 py-3 text-[#666] text-sm shrink-0'>
                  <span className='text-xs mr-1'>▼</span>다음글
                </div>
                <Link
                  to='#'
                  className='flex-1 px-2 sm:px-4 py-3 text-sm text-[#333] hover:text-secondary truncate'
                >
                  다음 질문글
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}
