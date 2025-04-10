import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gray-50'>
      <h1 className='mb-8 text-3xl font-bold'>📍 임시 네비게이션 페이지</h1>
      <div className='space-y-4'>
        <Link
          to='/'
          className='rounded-lg bg-blue-500 px-6 py-3 text-white shadow transition hover:bg-blue-600'
        >
          Landing 페이지
        </Link>
        <Link
          to='/dashboard'
          className='rounded-lg bg-green-500 px-6 py-3 text-white shadow transition hover:bg-green-600'
        >
          Dashboard 페이지
        </Link>
        <Link
          to='/feedback/summary'
          className='rounded-lg bg-purple-500 px-6 py-3 text-white shadow transition hover:bg-purple-600'
        >
          Feedback Summary 페이지
        </Link>
      </div>
    </div>
  );
};

export default Landing;
