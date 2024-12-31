import './fonts.css';
export default function postDetail() {
  return (
    <div className='relative w-full max-w-[1920px] h-[1460px] box-border mx-auto my-0 px-[100px] py-0'>
      <h1 className='h-[63px] text-2xl text-center box-border m-0 px-0 py-[15px]'>
        공지사항
      </h1>
      <section className='border-t border-black'>
        <div className='flex items-center gap-[100px] py-3 border-b border-[#dedede]'>
          <label className='text-sm font-normal text-[#202020]' htmlFor='title'>
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
        <div>
          <div className='flex gap-[43px]'>
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
          <p className='pt-4 pb-[43px] text-center'>이 곳에 글 내용이 나와요</p>
        </div>
        <div className='absolute bottom-0 left-[100px] right-[100px] pt-[46px] pb-[46px] border-t border-[#dedede]'>
          <div className='flex justify-between mb-5'>
            <div>
              <button
                type='button'
                className='border border-[#d1d1d1] rounded px-9 py-2'
              >
                <a href='./list.html'>목록</a>
              </button>
            </div>
            <div className='flex gap-3'>
              <button
                type='button'
                className='border border-[#d1d1d1] rounded px-9 py-2'
              >
                <a href='./edit_post.html'>수정</a>
              </button>
              <button
                type='button'
                className='border border-[#d1d1d1] rounded px-9 py-2'
              >
                <a href='./list.html'>삭제</a>
              </button>
            </div>
          </div>
          <nav className='w-full'>
            <table className='w-full border-collapse'>
              <tbody>
                <tr>
                  <td className='p-4 border border-[#e5e5e5] w-[150px] text-[#666] text-sm'>
                    <span className='mr-1 text-xs'>▲</span>
                    이전글
                  </td>
                  <td className='p-4 border border-[#e5e5e5] text-[#333] text-sm'>
                    이전 공지글
                  </td>
                </tr>
                <tr>
                  <td className='p-4 border border-[#e5e5e5] w-[150px] text-[#666] text-sm'>
                    <span className='mr-1 text-xs'>▼</span>
                    다음글
                  </td>
                  <td className='p-4 border border-[#e5e5e5] text-[#333] text-sm'>
                    다음 공지글
                  </td>
                </tr>
              </tbody>
            </table>
          </nav>
        </div>
      </section>
    </div>
  );
}
