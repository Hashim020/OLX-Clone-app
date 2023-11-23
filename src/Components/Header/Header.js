import React, { useContext } from 'react';
import { getAuth,signOut} from 'firebase/auth';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { authContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';

function Header() {
  const {user} = useContext(authContext)
   const auth = getAuth()
   const navigate = useNavigate()
  const handleLogout = ()=>{
    signOut(auth).then(()=>{
      navigate('/login')
    })
    .catch(Error=>{
      alert(Error.message)
    })
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={()=>navigate('/')}>
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="loginPage">
          {user ? <span>Welcome {user.displayName}</span> : <span onClick={()=>navigate('/login')}>login</span>}
          <hr />
        </div>
        {user && <span onClick={handleLogout} style={{cursor:'pointer'}}>logout</span>}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus ></SellButtonPlus>
            <span onClick={()=>navigate('/create')}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
