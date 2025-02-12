import ListIcon from '../../../assets/sidebar_list.svg?react';
import MicIcon from '../../../assets/sidebar_mic.svg?react';
import ProfileIcon from '../../../assets/sidebar_profile.svg?react';
import SettingIcon from '../../../assets/sidebar_setting.svg?react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const nav = useNavigate();
  return (
    <div className='sidebar top-1/2 left-3 -translate-y-1/2'>
      <ListIcon
        className='transition-transform duration-200 hover:scale-120'
        onClick={() => nav('/dashboard')}
      />
      <MicIcon className='transition-transform duration-200 hover:scale-120' />
      <ProfileIcon className='transition-transform duration-200 hover:scale-120' />
      <SettingIcon className='transition-transform duration-200 hover:scale-120' />
    </div>
  );
};

export default Sidebar;
