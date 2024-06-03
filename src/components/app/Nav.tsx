import { useEffect, useState } from "react";

// ----------
// Component
// ----------
import NavMobile from "./NavMobile";
import NavDesktop from "./NavDesktop";

function Nav() {
  const [navMobile, setNavMobile] = useState<boolean>(false);

  const displayHeader = () => {
    if (
      window.innerWidth < 1200 ||
      document.documentElement.clientWidth < 1200
    ) {
      setNavMobile(true);
    } else {
      setNavMobile(false);
    }
  };

  useEffect(() => {
    displayHeader();

    window.addEventListener("resize", (e) => {
      displayHeader();
    });
  }, []);
  return <>{navMobile ? <NavMobile /> : <NavDesktop />}</>;
}

export default Nav;
