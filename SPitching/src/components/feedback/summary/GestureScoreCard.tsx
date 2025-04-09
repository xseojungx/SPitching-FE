const GestureScoreCard = () => {
  return (
    <article className='white-card col-span-3 col-start-9 row-span-4 row-start-5'>
      <p className='s1 justify-self-start text-gray-900'>제스처</p>
      <div className='flex w-full flex-col items-center justify-center'>
        <p className='b2 text-gray-700'>총점</p>
        <p className='h1 bg-gradient-to-b from-[#255A9B] via-[#7AB7CE] to-[#A9EAD6] bg-clip-text text-transparent'>
          89
        </p>
      </div>
    </article>
  );
};

export default GestureScoreCard;
