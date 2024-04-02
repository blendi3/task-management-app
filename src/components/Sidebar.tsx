import styles from "./Sidebar.module.less";
import { message } from "antd";
import {
  BookOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  StarOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigation } from "../hooks/useNavigation";
import { useAuth } from "../pages/auth/AuthContext";
import { Link } from "react-router-dom";
import DefaultAvatar from "../assets/images/DefaultAvatar.png";
import { useEffect, useRef, useState } from "react";

const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  const { goTo } = useNavigation();
  const [showMenu, setShowMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleSignOut = async () => {
    try {
      await logout();
      goTo("/login")();
    } catch (error) {
      message.error("Error during sign out.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);
  return (
    <div className={styles.sidebarContainer}>
      <aside className={styles.sidebar}>
        <div ref={profileRef} onClick={toggleMenu} className={styles.profile}>
          <img
            src={currentUser?.photoURL || DefaultAvatar}
            alt="User"
            className={styles.userImage}
          />
          <h2 className={styles.userName}>
            {currentUser?.displayName || "User Name"}
          </h2>
        </div>
        {showMenu && (
          <div ref={profileRef} className={styles.profileMenu}>
            <div className={styles.menuItem}>
              <img
                src={currentUser?.photoURL || DefaultAvatar}
                alt="User"
                className={styles.smallAvatar}
              />
              <div className={styles.avatarPopUnder}>
                <span>{currentUser?.displayName}</span>
                <div className={styles.emailAddress}>
                  <span>{currentUser?.email}</span>
                </div>
              </div>
            </div>
            <div className={styles.menuItem} onClick={() => {}}>
              <SettingOutlined />
              <div className={styles.manageAccounts}>
                <span>
                  Manage account <i>(soon)</i>
                </span>
              </div>
            </div>
            <div className={styles.menuItem} onClick={handleSignOut}>
              <LogoutOutlined />
              <div className={styles.manageAccounts}>
                <span>Sign out</span>
              </div>
            </div>
          </div>
        )}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/" className={styles.navLink}>
                <BookOutlined className={styles.logo} /> All Tasks
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/important" className={styles.navLink}>
                <StarOutlined className={styles.logo} /> Important
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/completed" className={styles.navLink}>
                <CheckSquareOutlined className={styles.logo} /> Completed
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/doitnow" className={styles.navLink}>
                <ClockCircleOutlined className={styles.logo} /> Do It Now
              </Link>
            </li>
          </ul>
        </nav>
        <button className={styles.signOutButton} onClick={handleSignOut}>
          <LogoutOutlined className={styles.logo} /> Sign Out
        </button>
      </aside>
    </div>
  );
};

export default Sidebar;
