import { Link } from 'react-router-dom';
import ListItem from './ListItem';

export default function ListPage() {
  // 실제로는 API에서 받아올 데이터
  const items = [
    {
      id: 1,
      title: '연말 휴무 및 택배 없는 날 안내',
      date: '24/12/30',
    },
    {
      id: 2,
      title: '1월 신년 이벤트 안내',
      date: '24/01/02',
    },
    {
      id: 3,
      title: '웹사이트 개편 안내',
      date: '24/01/01',
    },
    {
      id: 4,
      title: '신규 상품 출시 안내',
      date: '23/12/28',
    },
  ];

  return (
    <div className='container mx-auto px-6 mb-20'>
      <h1 className='h-[63px] text-2xl text-center box-border m-0 px-0 py-[15px]'>
        공지사항
      </h1>
      <div className='flex justify-end mb-5 w-full'>
        <Link
          to='new'
          className='px-5 py-2 bg-secondary-20 text-white rounded hover:bg-secondary-40 transition-colors'
        >
          글쓰기
        </Link>
      </div>
      <div className='grid grid-cols-[repeat(4,280px)] justify-center gap-6 w-[calc(4_*_280px_+_3_*_24px)] mx-auto my-0'>
        {items.map((item) => (
          <ListItem key={item.id} title={item.title} date={item.date} />
        ))}
      </div>
      <div className='flex justify-center gap-2 mt-10'>
        <button className='flex justify-center items-center w-10 h-10 rounded-[10px] border-none cursor-pointer bg-secondary-20 text-white hover:bg-secondary-40 transition-colors'>
          1
        </button>
        <button className='flex justify-center items-center w-10 h-10 rounded-[10px] border-none cursor-pointer bg-grey-20 hover:bg-grey-30 transition-colors'>
          2
        </button>
        <button className='flex justify-center items-center w-10 h-10 rounded-[10px] border-none cursor-pointer bg-grey-20 hover:bg-grey-30 transition-colors'>
          3
        </button>
        <button className='flex justify-center items-center w-auto h-10 rounded-[10px] border-none cursor-pointer bg-grey-20 hover:bg-grey-30 transition-colors px-4'>
          Next
        </button>
      </div>
      <div className='pt-10 flex justify-center gap-[5.4px] h-[70.67px]'>
        <div className='relative w-[120px]'>
          <select className='w-full h-[37px] px-2.5 border border-grey-10 rounded bg-white'>
            <option value='title'>제목</option>
            <option value='date'>등록일</option>
            <option value='author'>작성자</option>
          </select>
        </div>
        <input
          type='text'
          className='h-[37px] py-0 px-3 border border-grey-10 rounded w-[200px]'
        />
        <button
          type='submit'
          className='bg-secondary-20 hover:bg-secondary-40 transition-colors text-white h-[37px] py-0 px-[25px] border-none rounded cursor-pointer leading-[37px]'
        >
          찾기
        </button>
      </div>
    </div>
  );
}
