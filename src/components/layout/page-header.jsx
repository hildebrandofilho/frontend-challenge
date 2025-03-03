import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "../../utils/utils";
import useRestaurant from "../../hooks/useRestaurant";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../widgets/dropdown-menu";
import styles from "../components.module.css";

const defaultMenuStyle = styles.navLink;

function PageHeader() {
  const restaurant = useRestaurant((state) => state.restaurant);

  if (!Object.keys(restaurant).length) return null;

  const routesClassName = ({ isActive }) =>
    cn(
      defaultMenuStyle,
      isActive ? styles.navLinkActive : styles.navLinkInactive
    );

  const routesClassNameMobile = ({ isActive }) =>
    cn(
      styles.navLinkMobile,
      isActive ? styles.navLinkMobileActive : styles.navLinkMobileInactive
    );

  return (
    <header
      className={styles.header}
      style={{
        backgroundColor: restaurant.webSettings.navBackgroundColour,
        color: restaurant.webSettings.backgroundColour,
      }}
    >
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.navLinks}>
            <NavLink to="/" className={routesClassName}>
              MENU
            </NavLink>

            <NavLink to="/login" className={routesClassName}>
              ENTRAR
            </NavLink>

            <NavLink to="/contato" className={routesClassName}>
              CONTATO
            </NavLink>
          </div>

          <div className={styles.hamburgerContainer}>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <HamburgerMenuIcon className={styles.hamburgerIcon} color="#FFFFFF" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className={styles.dropdownMenuContent}>
                <DropdownMenuItem>
                  <NavLink to="/" className={routesClassNameMobile}>
                    MENU
                  </NavLink>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <NavLink to="/login" className={routesClassNameMobile}>
                    ENTRAR
                  </NavLink>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <NavLink to="/contact" className={routesClassNameMobile}>
                    CONTATO
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </header>
  );
}

export { PageHeader };