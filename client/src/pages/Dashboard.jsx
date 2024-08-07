import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import DashSideBar from '../components/DashSideBar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComment from '../components/DashComment';
import DashboardComp from '../components/DashboardComp';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFormUrl = urlParams.get('tab');
    if (tabFormUrl) setTab(tabFormUrl);
  }, [location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className="md:w-56">
        {/**sidebar */}
        <DashSideBar />
      </div>
      {/**profile */}
      {tab === 'profile' && <DashProfile />}
      {/**posts */}
      {tab === 'posts' && <DashPosts />}
      {/* users */}
      {tab === 'users' && <DashUsers />}
      {/* comments */}
      {tab === 'comments' && <DashComment />}
      {/* dashboard comp */}
      {tab === 'dash' && <DashboardComp />}
    </div>
  )
}
