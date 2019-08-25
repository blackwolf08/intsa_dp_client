import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './oval.svg';

const Navbar = () => {
  let [username, setUsername] = useState('');
  let [userData, setUserData] = useState(null);
  let [fullName, setFullName] = useState('');
  let [profilePicUrl, setProfilePicUrl] = useState('');
  let [followers, setFollowers] = useState('');
  let [following, setFollowing] = useState('');
  let [media, setMedia] = useState('');
  let [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    username = username.replace('@', '');
    const URL = 'https://afternoon-inlet-15211.herokuapp.com/api/get_data';
    let user_name = username;
    setUsername('');
    let res = await axios({
      method: 'post',
      url: URL,
      config: {
        headers: {
          'cache-control': 'no-cache',
          Connection: 'keep-alive',
          'Content-Length': '20',
          'Accept-Encoding': 'gzip, deflate',
          Host: 'afternoon-inlet-15211.herokuapp.com',
          'Cache-Control': 'no-cache',
          Accept: '*/*',
          'User-Agent': 'PostmanRuntime/7.15.2',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      },
      data: { user_name }
    });
    userData = await res.data;
    console.log(userData);
    let count = Object.keys(userData).length;
    if (count) {
      setUserData(userData);
      setFullName(userData.full_name);
      setProfilePicUrl(userData['profile_pic_url_hd']);
      console.log(profilePicUrl);
      setFollowers(userData.edge_followed_by.count);
      setFollowing(userData.edge_follow.count);
      setMedia(userData.edge_owner_to_timeline_media.count);
      setUsername(userData.username);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handlechange = e => {
    setUsername(e.target.value);
  };

  if (loading) {
    return (
      <div className='loader_div'>
        <img className='loader' src={Spinner} alt='loading' />
      </div>
    );
  }

  return (
    <>
      <div className='navbar_root'>
        <div className='navbar_title'>Instagram Deep View</div>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Enter Username'
            onChange={handlechange}
            value={username || ''}
          ></input>
        </form>
      </div>
      {userData !== null && (
        <div className='view'>
          <p className='full_name'>{fullName}</p>

          <a href={profilePicUrl} download>
            <img
              disable
              className='profile_pic'
              alt='profile'
              src={profilePicUrl}
            ></img>
          </a>
          <p className='more_info'>Following : {following}</p>
          <p className='more_info'>Followers : {followers}</p>
          <p className='more_info'>Media : {media}</p>
        </div>
      )}
    </>
  );
};

export default Navbar;
