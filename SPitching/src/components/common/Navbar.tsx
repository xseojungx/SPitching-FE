const Navbar = () => {
  return (
    <header className='fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-white px-6 shadow'>
      {/* 로고 */}
      <div className='text-xl font-bold text-[#255A9B]'>SPitching</div>

      {/* 네비 메뉴 (예: 마이페이지, 설정 등) */}
      <nav className='flex items-center gap-6 text-sm text-gray-700'>
        <button className='transition hover:text-[#255A9B]'>홈</button>
        <button className='transition hover:text-[#255A9B]'>
          연습 바로가기
        </button>
        <button className='transition hover:text-[#255A9B]'>마이페이지</button>
      </nav>
    </header>
  );
};

export default Navbar;
