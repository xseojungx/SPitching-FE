import Sidebar from '../../components/common/sidebar/Sidebar';
const Landing = () => {
  return (
    <div className='position:relative'>
      <div className='bg-mint-500 p-12'>
        <h1 className='text-5xl font-bold text-white'>SPithcing</h1>
      </div>
      <Sidebar />
    </div>
  );
};

export default Landing;
