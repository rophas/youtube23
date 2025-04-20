import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {

  const [active,setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const {pathname} = useLocation()

  const isActive = ()=>{
    window.scrollY > 0 ? setActive(true) : setActive(false);
  }

  useEffect(()=>{
    window.addEventListener("scroll", isActive);

    return ()=>(
      window.removeEventListener("scroll", isActive)
    )
  },[]);

  const currentUser = {
    id:1,
    username:"Rophas Ed",
    IsSeller:true
  }

  return (
    <div className={active || pathname !="/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className='text'>InkED</span>
          </Link>
          <span className='dot'>💦.</span>
        </div>
        <div className="links">
          <span>InkED Business</span>
          <span>Explore</span>
          <span>English</span>
          <span>Sign In</span>
          {!currentUser?.IsSeller && <span>Become a Seller</span>}
          {!currentUser && <button>Join</button>}
          {currentUser && (
            <div className="user" onClick={()=>setOpen(!open)}>
              <img src="src\images\profile_pic.png" alt="" />
              <span>{currentUser?.username}</span>
              {open && <div className="options">
                {currentUser?.IsSeller && (
                  <>
                    <Link className="link" to="/mygigs">Gigs</Link>
                    <Link className="link" to="/add">Add New Gig</Link>
                  </>
                )}
                <Link className="link" to="/orders">Orders</Link>
                <Link className="link" to="/messages">Messages</Link>
                <Link className="link" to="/">Logout</Link>
              </div>}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !="/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menulink" to="/">
              Graphic & Design
            </Link>
            <Link className="link" to="/">
              Video & Animation
            </Link>
            <Link className="link" to="/">
              Writing & Translation
            </Link>
            <Link className="link" to="/">
              AI Serviices
            </Link>
            <Link className="link" to="/">
              Digital Marketing
            </Link>
            <Link className="link" to="/">
              Music & Audio
            </Link>
            <Link className="link" to="/">
              Programming & Tech
            </Link>
            <Link className="link" to="/">
              Business
            </Link>
            <Link className="link" to="/">
              Lifestyle
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Navbar
