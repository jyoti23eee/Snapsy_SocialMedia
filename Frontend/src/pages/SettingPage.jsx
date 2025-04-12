import React, { useState, useEffect } from 'react';
import { FiFilm } from 'react-icons/fi';
//import { FiPieChart, FiActivity, FiBarChart2 } from "react-icons/fi";
import {
  FiSettings, FiActivity, FiBell, FiClock, FiShield,  
  FiUser, FiHelpCircle, FiLogOut, FiHeart, FiMessageSquare,
  FiSave, FiArchive, FiDownload, FiPieChart, FiToggleLeft,
  FiToggleRight, FiChevronRight, FiAlertCircle
} from 'react-icons/fi';
import { Howl } from 'howler';

// Alarm sound
const alarmSound = new Howl({
  src: ['https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3'],
  loop: true
});

function SettingPage() {
  const [activeTab, setActiveTab] = useState('activity');
  const [subMenu, setSubMenu] = useState('likes');
  const [timeRange, setTimeRange] = useState('7days');
  
  // Time Management State
  const [timeSettings, setTimeSettings] = useState({
    dailyLimit: 120, // in minutes
    isLimitEnabled: true,
    sleepMode: false,
    sleepStart: '22:00',
    sleepEnd: '07:00',
    timeUsage: {
      today: 45,
      thisWeek: [45, 60, 90, 30, 75, 50, 65], // minutes per day
      dailyAverage: 0
    },
    isAlarmActive: false
  });

  // Notification toggle states
  const [notificationSettings, setNotificationSettings] = useState({
    pauseAll: false,
    posts: {
      likes: true,
      comments: true,
      shares: true
    },
    stories: {
      reactions: true,
      replies: true
    },
    following: {
      follows: true,
      requests: true
    },
    messages: {
      requests: true,
      reminders: true
    },
    live: {
      videos: true,
      reels: true
    }
  });

  // Mock data
  const activityData = {
    likes: [
      { id: 1, type: 'reel', thumbnail: 'reel1.jpg', author: 'user1', date: '2h ago' },
      { id: 2, type: 'post', thumbnail: 'post1.jpg', author: 'user2', date: '1d ago' }
    ],
    comments: [
      { id: 1, type: 'reel', thumbnail: 'reel2.jpg', text: 'Nice video!', date: '5h ago' },
      { id: 2, type: 'post', thumbnail: 'post2.jpg', text: 'Great content', date: '2d ago' }
    ],
    saved: [
      { id: 1, type: 'reel', thumbnail: 'reel3.jpg', savedTo: 'Favorites', date: '1w ago' },
      { id: 2, type: 'post', thumbnail: 'post3.jpg', savedTo: 'Inspiration', date: '3d ago' }
    ],
    archived: [
      { id: 1, type: 'story', thumbnail: 'story1.jpg', date: '1w ago', expires: '24h' },
      { id: 2, type: 'story', thumbnail: 'story2.jpg', date: '5d ago', expires: '24h' }
    ],
    downloads: [
      { id: 1, type: 'reel', thumbnail: 'reel4.jpg', size: '4.2MB', date: '2d ago' },
      { id: 2, type: 'post', thumbnail: 'post4.jpg', size: '2.8MB', date: '1w ago' }
    ],
    timeSpent: {
      '7days': [2.5, 3, 4, 2, 3.5, 4, 2],
      '30days': [2, 3, 2.5, 3, 4, 2.5, 3, 2, 3, 3.5, 4, 2, 3, 2.5, 3, 4, 2.5, 3, 2, 3, 3.5, 4, 2, 3, 2.5, 3, 4, 2.5, 3, 2]
    }
  };

  const menuItems = [
    { id: 'activity', icon: <FiActivity />, label: 'Your Activity' },
    { id: 'reels', icon: <FiFilm />, label: 'Reels Analytics' },
    { id: 'notifications', icon: <FiBell />, label: 'Notifications' },
    { id: 'time', icon: <FiClock />, label: 'Time Management' },
    { id: 'privacy', icon: <FiShield />, label: 'Privacy' },
    { id: 'account', icon: <FiUser />, label: 'Account' },
    { id: 'logout', icon: <FiLogOut />, label: 'Log Out' },
    
  ];

  const subMenuItems = {
    activity: [
      { id: 'likes', icon: <FiHeart />, label: 'Likes' },
      { id: 'comments', icon: <FiMessageSquare />, label: 'Comments' },
      { id: 'saved', icon: <FiSave />, label: 'Saved' },
      { id: 'archived', icon: <FiArchive />, label: 'Archived' },
      { id: 'downloads', icon: <FiDownload />, label: 'Downloads' },
      { id: 'timeSpent', icon: <FiPieChart />, label: 'Time Spent' }
    ],
    
    notifications: [
      { id: 'settings', label: 'Notification Settings' },
    ],
    
    privacy: ['Profile Visibility', 'Blocked Accounts'],
    account: ['Account Information', 'Change Password', 'Deactivate Account']
  };

  // Add mock data for reels analytics




  // Calculate daily average
  useEffect(() => {
    const average = Math.round(
      timeSettings.timeUsage.thisWeek.reduce((a, b) => a + b, 0) / 
      timeSettings.timeUsage.thisWeek.length
    );
    setTimeSettings(prev => ({
      ...prev,
      timeUsage: {
        ...prev.timeUsage,
        dailyAverage: average
      }
    }));
  }, [timeSettings.timeUsage.thisWeek]);

  // Check time limit
  useEffect(() => {
    if (timeSettings.isLimitEnabled && 
        timeSettings.timeUsage.today >= timeSettings.dailyLimit && 
        !timeSettings.isAlarmActive) {
      setTimeSettings(prev => ({ ...prev, isAlarmActive: true }));
      alarmSound.play();
      alert(`Time limit reached! You've used ${timeSettings.timeUsage.today} minutes today.`);
    }
  }, [timeSettings.timeUsage.today, timeSettings.dailyLimit, timeSettings.isLimitEnabled]);

  // Check sleep mode
  useEffect(() => {
    if (timeSettings.sleepMode) {
      const now = new Date();
      const [sleepStartHour, sleepStartMin] = timeSettings.sleepStart.split(':').map(Number);
      const [sleepEndHour, sleepEndMin] = timeSettings.sleepEnd.split(':').map(Number);
      
      const sleepStartTime = new Date();
      sleepStartTime.setHours(sleepStartHour, sleepStartMin, 0, 0);
      
      const sleepEndTime = new Date();
      sleepEndTime.setHours(sleepEndHour, sleepEndMin, 0, 0);
      
      if (now >= sleepStartTime || now <= sleepEndTime) {
        alert('Sleep mode is active. Website access is restricted during sleep hours.');
      }
    }
  }, [timeSettings.sleepMode, timeSettings.sleepStart, timeSettings.sleepEnd]);
  
    
  // Toggle handler for notification settings
  const handleNotificationToggle = (category, setting) => {
    if (category === 'pauseAll') {
      setNotificationSettings(prev => ({
        ...prev,
        pauseAll: !prev.pauseAll
      }));
    } else {
      setNotificationSettings(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [setting]: !prev[category][setting]
        }
      }));
    }
  };

  const handleTimeLimitChange = (e) => {
    setTimeSettings({
      ...timeSettings,
      dailyLimit: parseInt(e.target.value) || 0
    });
  };

  const handleSleepTimeChange = (type, value) => {
    setTimeSettings({
      ...timeSettings,
      [`sleep${type.charAt(0).toUpperCase() + type.slice(1)}`]: value
    });
  };

  const stopAlarm = () => {
    alarmSound.stop();
    setTimeSettings(prev => ({ ...prev, isAlarmActive: false }));
  };

  const renderTimeManagement = () => {
    return (
      <div className="p-6 h-full bg-sky-900 text-white">
        <h2 className="text-2xl font-bold mb-6">Time Management</h2>
        
        
        <div className="mb-8 p-4 bg-sky-800 rounded-lg">
          <h3 className="font-semibold mb-4">Today's Usage</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold">{timeSettings.timeUsage.today} min</p>
              <p className="text-sm text-gray-300">Daily average: {timeSettings.timeUsage.dailyAverage} min</p>
            </div>
            <div className="text-right">
              <p className="text-sm">Limit: {timeSettings.dailyLimit} min</p>
              <p className={`text-sm ${
                timeSettings.timeUsage.today >= timeSettings.dailyLimit ? 'text-red-400' : 'text-green-400'
              }`}>
                {timeSettings.timeUsage.today >= timeSettings.dailyLimit ? 'Limit reached' : 'Remaining: ' + 
                (timeSettings.dailyLimit - timeSettings.timeUsage.today) + ' min'}
              </p>
            </div>
          </div>
        </div>

       
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Weekly Usage</h3>
          <div className="bg-sky-800 p-4 rounded-lg h-64">
            <div className="flex items-end h-48 space-x-2">
              {timeSettings.timeUsage.thisWeek.map((minutes, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-blue-400 rounded-t"
                    style={{ height: `${(minutes / 180) * 100}%` }}
                  ></div>
                  <span className="text-xs mt-1">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}
                  </span>
                  <span className="text-xs text-gray-300">{minutes}m</span>
                </div>
              ))}
            </div>
          </div>
        </div>

     
        <div className="mb-8 p-4 bg-sky-800 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Daily Time Limit</h3>
            <button 
              onClick={() => setTimeSettings({
                ...timeSettings,
                isLimitEnabled: !timeSettings.isLimitEnabled
              })}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                timeSettings.isLimitEnabled ? 'bg-blue-500' : 'bg-gray-500'
              }`}
            >
              <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                timeSettings.isLimitEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          
          {timeSettings.isLimitEnabled && (
            <>
              <div className="flex items-center space-x-4 mb-2">
                <input
                  type="range"
                  min="15"
                  max="240"
                  value={timeSettings.dailyLimit}
                  onChange={handleTimeLimitChange}
                  className="w-full"
                />
                <span className="w-16 text-center">{timeSettings.dailyLimit} min</span>
              </div>
              <p className="text-sm text-gray-300">
                When reached, you'll be notified and access may be restricted
              </p>
            </>
          )}
        </div>

    
        <div className="mb-8 p-4 bg-sky-800 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Sleep Mode</h3>
            <button 
              onClick={() => setTimeSettings({
                ...timeSettings,
                sleepMode: !timeSettings.sleepMode
              })}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                timeSettings.sleepMode ? 'bg-blue-500' : 'bg-gray-500'
              }`}
            >
              <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                timeSettings.sleepMode ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          
          {timeSettings.sleepMode && (
            <>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-300 mb-1">From</label>
                  <input
                    type="time"
                    value={timeSettings.sleepStart}
                    onChange={(e) => handleSleepTimeChange('start', e.target.value)}
                    className="w-full p-2 bg-sky-700 rounded"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-300 mb-1">To</label>
                  <input
                    type="time"
                    value={timeSettings.sleepEnd}
                    onChange={(e) => handleSleepTimeChange('end', e.target.value)}
                    className="w-full p-2 bg-sky-700 rounded"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-300">
                <FiMoon className="inline mr-1" />
                Website will be completely unavailable during these hours
              </p>
            </>
          )}
        </div>

        {timeSettings.isAlarmActive && (
          <div className="p-4 bg-red-900/50 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <FiAlertCircle className="text-red-400 mr-2" />
              <span>Time limit exceeded!</span>
            </div>
            <button 
              onClick={stopAlarm}
              className="px-3 py-1 bg-red-500 rounded text-white"
            >
              Stop Alarm
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (activeTab === 'activity') {
      switch(subMenu) {
        case 'likes':
          return (
            <div className="p-6 h-full bg-sky-900 text-white">
              <h2 className="text-2xl font-bold mb-4">Liked Content</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {activityData.likes.map(item => (
                  <div key={item.id} className="border border-sky-700 rounded-lg overflow-hidden">
                    <div className="w-full h-40 bg-sky-800">
                      <img 
                        src={item.thumbnail} 
                        alt={item.type} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="font-medium capitalize">{item.type} by {item.author}</p>
                      <p className="text-sm text-gray-300">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        
        case 'comments':
          return (
            <div className="p-6 h-full bg-sky-900 text-white">
              <h2 className="text-2xl font-bold mb-4">Commented Posts</h2>
              {activityData.comments.map(item => (
                <div key={item.id} className="border-b border-sky-700 py-4">
                  <div className="flex">
                    <div className="w-16 h-16 bg-sky-800 rounded overflow-hidden">
                      <img 
                        src={item.thumbnail} 
                        alt={item.type} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium capitalize">{item.type}</p>
                      <p className="text-gray-200">{item.text}</p>
                      <p className="text-sm text-gray-300">{item.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );

        case 'saved':
          return (
            <div className="p-6 h-full bg-sky-900 text-white">
              <h2 className="text-2xl font-bold mb-4">Saved Items</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {activityData.saved.map(item => (
                  <div key={item.id} className="relative">
                    <div className="w-full h-40 bg-sky-800 rounded overflow-hidden">
                      <img 
                        src={item.thumbnail} 
                        alt={item.type} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-sky-800/90 p-2">
                      <p className="text-sm">Saved to: {item.savedTo}</p>
                      <p className="text-xs text-gray-300">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );

        case 'archived':
          return (
            <div className="p-6 h-full bg-sky-900 text-white">
              <h2 className="text-2xl font-bold mb-4">Archived Stories</h2>
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {activityData.archived.map(item => (
                  <div key={item.id} className="flex-shrink-0 relative">
                    <div className="w-24 h-24 rounded-full border-2 border-sky-700 p-1">
                      <div className="w-full h-full bg-sky-800 rounded-full overflow-hidden">
                        <img 
                          src={item.thumbnail} 
                          alt="Story" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-center mt-1 text-gray-300">{item.date}</p>
                  </div>
                ))}
              </div>
            </div>
          );

        case 'downloads':
          return (
            <div className="p-6 h-full bg-sky-900 text-white">
              <h2 className="text-2xl font-bold mb-4">Downloads</h2>
              <div className="space-y-4">
                {activityData.downloads.map(item => (
                  <div key={item.id} className="flex items-center border-b border-sky-700 pb-3">
                    <div className="w-16 h-16 bg-sky-800 rounded overflow-hidden">
                      <img 
                        src={item.thumbnail} 
                        alt={item.type} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium capitalize">{item.type}</p>
                      <p className="text-sm text-gray-300">{item.size} • {item.date}</p>
                    </div>
                    <button className="ml-auto text-blue-300 hover:text-blue-200">Redownload</button>
                  </div>
                ))}
              </div>
            </div>
          );

        case 'timeSpent':
          return (
            <div className="p-6 h-full bg-sky-900 text-white">
              <h2 className="text-2xl font-bold mb-4">Time Spent</h2>
              <div className="flex space-x-2 mb-4">
                <button 
                  onClick={() => setTimeRange('7days')}
                  className={`px-3 py-1 rounded ${timeRange === '7days' ? 'bg-blue-500 text-white' : 'bg-sky-800 text-gray-300'}`}
                >
                  7 Days
                </button>
                <button 
                  onClick={() => setTimeRange('30days')}
                  className={`px-3 py-1 rounded ${timeRange === '30days' ? 'bg-blue-500 text-white' : 'bg-sky-800 text-gray-300'}`}
                >
                  30 Days
                </button>
              </div>
              <div className="bg-sky-800 p-4 rounded-lg h-64">
                <div className="flex items-end h-48 space-x-2">
                  {activityData.timeSpent[timeRange].map((hours, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-blue-400 rounded-t"
                        style={{ height: `${(hours / 6) * 100}%` }}
                      ></div>
                      <span className="text-xs mt-1">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-lg font-semibold">
                    {activityData.timeSpent[timeRange].reduce((a, b) => a + b, 0)} hours total
                  </p>
                  <p className="text-sm text-gray-300">
                    {timeRange === '7days' ? 'This week' : 'This month'}
                  </p>
                </div>
              </div>
            </div>
          );

        default:
          return (
            <div className="p-6 flex items-center justify-center h-full bg-sky-900 text-white">
              <div className="text-center">
                <FiActivity className="mx-auto text-4xl text-gray-400 mb-2" />
                <h2 className="text-xl font-semibold">Your Activity</h2>
                <p className="text-gray-400">Select a category to view details</p>
              </div>
            </div>
          );
      }
    } else if (activeTab === 'notifications') {
      if (subMenu === 'settings') {
        return (
          <div className="p-6 h-full bg-sky-900 text-white">
            <h2 className="text-2xl font-bold mb-6">Notification Settings</h2>

            <div className="mb-8 p-4 bg-sky-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Pause All Notifications</h3>
                <button 
                  onClick={() => handleNotificationToggle('pauseAll', '')}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 ${notificationSettings.pauseAll ? 'bg-blue-500' : 'bg-gray-500'}`}
                >
                  <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${notificationSettings.pauseAll ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              {notificationSettings.pauseAll && (
                <p className="text-sm text-gray-300">
                  Notifications will be paused until tomorrow at this time
                </p>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Posts</h3>
              <div className="bg-sky-800 rounded-lg divide-y divide-sky-700">
                {Object.entries(notificationSettings.posts).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4">
                    <span className="capitalize">{key}</span>
                    <button 
                      onClick={() => handleNotificationToggle('posts', key)}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${value ? 'bg-blue-500' : 'bg-gray-500'}`}
                    >
                      <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

         
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Stories</h3>
              <div className="bg-sky-800 rounded-lg divide-y divide-sky-700">
                {Object.entries(notificationSettings.stories).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4">
                    <span className="capitalize">{key}</span>
                    <button 
                      onClick={() => handleNotificationToggle('stories', key)}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${value ? 'bg-blue-500' : 'bg-gray-500'}`}
                    >
                      <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Following</h3>
              <div className="bg-sky-800 rounded-lg divide-y divide-sky-700">
                {Object.entries(notificationSettings.following).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4">
                    <span className="capitalize">{key}</span>
                    <button 
                      onClick={() => handleNotificationToggle('following', key)}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${value ? 'bg-blue-500' : 'bg-gray-500'}`}
                    >
                      <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Messages</h3>
              <div className="bg-sky-800 rounded-lg divide-y divide-sky-700">
                {Object.entries(notificationSettings.messages).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4">
                    <span className="capitalize">{key}</span>
                    <button 
                      onClick={() => handleNotificationToggle('messages', key)}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${value ? 'bg-blue-500' : 'bg-gray-500'}`}
                    >
                      <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Live & Reels</h3>
              <div className="bg-sky-800 rounded-lg divide-y divide-sky-700">
                {Object.entries(notificationSettings.live).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4">
                    <span className="capitalize">{key}</span>
                    <button 
                      onClick={() => handleNotificationToggle('live', key)}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${value ? 'bg-blue-500' : 'bg-gray-500'}`}
                    >
                      <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      } 
      
      else if (activeTab === 'Reels Analytics') {
        switch(subMenu) {
          case 'overview':
            return (
              <div className="p-6 h-full bg-sky-900 text-white">
                <h2 className="text-2xl font-bold mb-6">Reels Overview</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-sky-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Total Reels Watched</h3>
                    <p className="text-3xl font-bold">1,248</p>
                    <p className="text-sm text-gray-300 mt-1">+12% from last week</p>
                  </div>
                  
                  <div className="bg-sky-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Average Watch Time</h3>
                    <p className="text-3xl font-bold">18.7s</p>
                    <p className="text-sm text-gray-300 mt-1">+2.3s from last month</p>
                  </div>
                </div>
      
                <div className="bg-sky-800 p-4 rounded-lg mb-8">
                  <h3 className="font-semibold mb-4">Emotion Distribution</h3>
                  <div className="h-64">
                    <div className="flex items-end h-48 space-x-1">
                      {reelsData.emotions.map((emotion, index) => (
                        <div key={emotion} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full rounded-t"
                            style={{ 
                              height: `${(reelsData.daily.data[index].reduce((a, b) => a + b, 0) / 200) * 100}%`,
                              backgroundColor: emotionColors[index]
                            }}
                            title={`${emotion}: ${reelsData.daily.data[index].reduce((a, b) => a + b, 0)} reels`}
                          ></div>
                          <span className="text-xs mt-1 truncate w-full text-center">{emotion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
      
                <div className="bg-sky-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-4">Top Performing Reels</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="relative">
                        <div className="w-full h-32 bg-sky-700 rounded-lg overflow-hidden">
                          <img 
                            src={`https://picsum.photos/200/300?random=${i+100}`} 
                            alt={`Reel ${i}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                          <p className="text-xs font-medium truncate">{['Motivational', 'Comedy', 'Love'][i % 3]} Reel</p>
                          <p className="text-xs text-gray-300">{Math.floor(Math.random() * 1000)} views</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
      
          case 'byEmotion':
            const [timeFrame, setTimeFrame] = useState('weekly');
            
            return (
              <div className="p-6 h-full bg-sky-900 text-white">
                <h2 className="text-2xl font-bold mb-6">Reels by Emotion</h2>
                
                <div className="flex space-x-2 mb-6">
                  <button 
                    onClick={() => setTimeFrame('daily')}
                    className={`px-3 py-1 rounded ${timeFrame === 'daily' ? 'bg-blue-500' : 'bg-sky-800'}`}
                  >
                    Daily
                  </button>
                  <button 
                    onClick={() => setTimeFrame('weekly')}
                    className={`px-3 py-1 rounded ${timeFrame === 'weekly' ? 'bg-blue-500' : 'bg-sky-800'}`}
                  >
                    Weekly
                  </button>
                  <button 
                    onClick={() => setTimeFrame('monthly')}
                    className={`px-3 py-1 rounded ${timeFrame === 'monthly' ? 'bg-blue-500' : 'bg-sky-800'}`}
                  >
                    Monthly
                  </button>
                </div>
      
                <div className="bg-sky-800 p-4 rounded-lg mb-8">
                  <h3 className="font-semibold mb-4">Reels Consumption by Emotion Type</h3>
                  <div className="h-96">
                    <div className="flex items-end h-64 space-x-2">
                      {reelsData[timeFrame].labels.map((label, i) => (
                        <div key={label} className="flex-1 flex">
                          {reelsData.emotions.map((emotion, j) => (
                            <div 
                              key={`${label}-${emotion}`}
                              className="flex-1 hover:opacity-90 transition-opacity"
                              style={{ 
                                height: `${(reelsData[timeFrame].data[j][i] / Math.max(...reelsData[timeFrame].data.flat()) * 100)}%`,
                                backgroundColor: emotionColors[j],
                                borderTopLeftRadius: j === 0 ? '4px' : '0',
                                borderTopRightRadius: j === reelsData.emotions.length - 1 ? '4px' : '0'
                              }}
                              title={`${label}: ${emotion} - ${reelsData[timeFrame].data[j][i]} reels`}
                            ></div>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2">
                      {reelsData[timeFrame].labels.map(label => (
                        <span key={label} className="text-xs text-gray-300">{label}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap justify-center mt-4 gap-2">
                    {reelsData.emotions.map((emotion, i) => (
                      <div key={emotion} className="flex items-center mr-4">
                        <div 
                          className="w-3 h-3 rounded-full mr-1"
                          style={{ backgroundColor: emotionColors[i] }}
                        ></div>
                        <span className="text-xs">{emotion}</span>
                      </div>
                    ))}
                  </div>
                </div>
      
                <div className="bg-sky-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Emotion Breakdown</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {reelsData.emotions.map((emotion, i) => {
                      const total = reelsData[timeFrame].data[i].reduce((a, b) => a + b, 0);
                      const percentage = (total / reelsData[timeFrame].data.flat().reduce((a, b) => a + b, 0) * 100).toFixed(1);
                      
                      return (
                        <div key={emotion} className="p-3 rounded" style={{ backgroundColor: `${emotionColors[i]}20` }}>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{emotion}</span>
                            <span>{percentage}%</span>
                          </div>
                          <div className="w-full bg-sky-700 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${percentage}%`,
                                backgroundColor: emotionColors[i]
                              }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-300 mt-1">{total} reels watched</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
      
          case 'performance':
            return (
              <div className="p-6 h-full bg-sky-900 text-white">
                <h2 className="text-2xl font-bold mb-6">Reels Performance</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-sky-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Engagement Rate by Emotion</h3>
                    <div className="h-64">
                      <div className="flex items-end h-48 space-x-1">
                        {reelsData.emotions.map((emotion, i) => {
                          const rate = Math.floor(Math.random() * 20) + 5; // Mock engagement rate
                          return (
                            <div key={emotion} className="flex-1 flex flex-col items-center">
                              <div 
                                className="w-full rounded-t"
                                style={{ 
                                  height: `${rate * 4}%`,
                                  backgroundColor: emotionColors[i]
                                }}
                                title={`${emotion}: ${rate}% engagement`}
                              ></div>
                              <span className="text-xs mt-1">{rate}%</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-center mt-2 space-x-4">
                        {reelsData.emotions.map((emotion, i) => (
                          <div key={emotion} className="flex items-center">
                            <div 
                              className="w-2 h-2 rounded-full mr-1"
                              style={{ backgroundColor: emotionColors[i] }}
                            ></div>
                            <span className="text-xs">{emotion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-sky-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Completion Rate</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="relative w-40 h-40">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          {reelsData.emotions.map((emotion, i) => {
                            const rate = Math.floor(Math.random() * 20) + 60; // Mock completion rate
                            const circumference = 2 * Math.PI * 40;
                            const strokeDasharray = `${(rate / 100) * circumference} ${circumference}`;
                            
                            return (
                              <circle
                                key={emotion}
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                stroke={emotionColors[i]}
                                strokeWidth="8"
                                strokeDasharray={strokeDasharray}
                                strokeDashoffset={circumference * 0.25}
                                transform={`rotate(${-90 + (i * 360 / reelsData.emotions.length)}, 50, 50)`}
                                className="transition-all duration-500"
                              />
                            );
                          })}
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-bold">78%</span>
                          <span className="text-xs text-gray-300">Avg Completion</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
      
                <div className="bg-sky-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-4">Best Performing Emotion Types</h3>
                  <div className="space-y-3">
                    {[...reelsData.emotions]
                      .map((emotion, i) => ({
                        emotion,
                        color: emotionColors[i],
                        engagement: Math.floor(Math.random() * 20) + 5,
                        completion: Math.floor(Math.random() * 20) + 60,
                        shares: Math.floor(Math.random() * 100) + 50
                      }))
                      .sort((a, b) => b.engagement - a.engagement)
                      .map((item, i) => (
                        <div key={item.emotion} className="flex items-center p-3 rounded hover:bg-sky-700">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: item.color }}>
                            {i + 1}
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="font-medium">{item.emotion}</p>
                            <div className="flex text-xs text-gray-300 space-x-3">
                              <span>{item.engagement}% engagement</span>
                              <span>{item.completion}% completion</span>
                              <span>{item.shares} shares</span>
                            </div>
                          </div>
                          <FiChevronRight className="text-gray-400" />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            );
            default:
              return (
                <div className="p-6 flex items-center justify-center h-full bg-sky-900 text-white">
                  <div className="text-center">
                    <FiFilm className="mx-auto text-4xl text-gray-400 mb-2" />
                    <h2 className="text-xl font-semibold">Reels Analytics</h2>
                    <p className="text-gray-400">Select a category to view details</p>
                  </div>
                </div>
              );
          }
        }
      
          
      else {
        return (
          <div className="p-6 flex items-center justify-center h-full bg-sky-900 text-white">
            <div className="text-center">
              <FiBell className="mx-auto text-4xl text-gray-400 mb-2" />
              <h2 className="text-xl font-semibold">Notifications</h2>
              <p className="text-gray-400">Select a category to view details</p>
            </div>
          </div>
        );
      }
    } else if (activeTab === 'time') {
      return renderTimeManagement();
    } else if (activeTab === 'privacy') {
      return (
        <div className="p-6 h-full bg-sky-900 text-white">
          <h2 className="text-2xl font-bold mb-6">Privacy Settings</h2>
          <div className="bg-sky-800 rounded-lg divide-y divide-sky-700">
            {subMenuItems.privacy.map((item, index) => (
              <button
                key={index}
                onClick={() => setSubMenu(item)}
                className={`w-full text-left p-4 ${subMenu === item ? 'text-blue-300' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span>{item}</span>
                  <FiChevronRight className="text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    } else if (activeTab === 'account') {
      return (
        <div className="p-6 h-full bg-sky-900 text-white">
          <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
          <div className="bg-sky-800 rounded-lg divide-y divide-sky-700">
            {subMenuItems.account.map((item, index) => (
              <button
                key={index}
                onClick={() => setSubMenu(item)}
                className={`w-full text-left p-4 ${subMenu === item ? 'text-blue-300' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span>{item}</span>
                  <FiChevronRight className="text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="p-6 flex items-center justify-center h-full bg-sky-900 text-white">
          <div className="text-center">
            <FiSettings className="mx-auto text-4xl text-gray-400 mb-2" />
            <h2 className="text-xl font-semibold">Settings</h2>
            <p className="text-gray-400">Select a category to view details</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen shadow-lg rounded-xl border border-gray-100 overflow-hidden">
   
      <div className="w-1/4 border-r border-gray-200 overflow-y-auto bg-blue-200">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold flex items-center">
            <FiSettings className="mr-2" />
            Settings
          </h1>
        </div>
        
        <nav className="p-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  setActiveTab(item.id);
                  setSubMenu(subMenuItems[item.id]?.[0]?.id || subMenuItems[item.id]?.[0] || null);
                }}
                className={`w-full flex items-center p-3 rounded-lg mb-1 ${activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
              
              {subMenuItems[item.id] && activeTab === item.id && (
                <div className="ml-10 pl-2 border-l-2 border-gray-200">
                  {subMenuItems[item.id].map((subItem) => (
                    <button
                      key={subItem.id || subItem}
                      onClick={() => setSubMenu(subItem.id || subItem)}
                      className={`w-full flex items-center p-2 text-sm rounded ${subMenu === (subItem.id || subItem) ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      {subItem.icon && <span className="mr-2">{subItem.icon}</span>}
                      {subItem.label || subItem}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="w-3/4 overflow-y-auto bg-sky-900">
        {renderContent()}
      </div>
    </div>
  );
}

export default SettingPage;
