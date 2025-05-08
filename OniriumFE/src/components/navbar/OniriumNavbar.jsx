import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Gear, Person, BoxArrowRight, List, X } from "react-bootstrap-icons";
import { Logout } from "../../api/AccountApi";
import { Button } from "../Generic/ButtonCustom";
import { Logo } from "../../assets/icons/generic";

const OniriumNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profile = useSelector((state) => state.user?.profile);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const logoutAccount = () => {
    dispatch(Logout());
    navigateTo("/Account/Login");
  };

  useEffect(() => {}, [profile]);

  const isAdmin = profile?.role === "Admin";

  const navigation = [
    { name: "HOME", href: "/" },
    { name: "CAMPAGNA", href: "/Campaign" },
    // { name: "COMMUNITY", href: "/community" },
    { name: "LABORATORIO", href: "/Creations" },
    { name: "SHOP", href: "/shop" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold/20 bg-dark">
      <div className="container-fuild flex h-16 items-center justify-between px-10">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center">
            <Logo className="text-gold h-10 w-10 mr-2" />
            <span className="text-xl font-bold tracking-wider text-gold uppercase font-trajan">
             | onirium
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-20 mr-20">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium tracking-wider transition-colors ${
                  isActive(item.href)
                    ? "text-gold"
                    : "text-gray-400 hover:text-gold"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          {!profile ? (
            <Button
              variant="outline"
              className="hidden md:flex border-gold/30 text-gold hover:bg-gold/10 hover:text-gold"
            >
              <Link to="/account/login">
              ACCEDI
              </Link>
              
            </Button>
          ) : (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <Button
                  variant="ghost"
                  className="p-0 h-8 w-8"
                  aria-label="Menu utente"
                >
                  <Avatar.Root className="h-9 w-9 border border-gold/30 rounded-full overflow-hidden">
                    <Avatar.Image
                      src={`http://localhost:5034/${profile?.profilePic?.replace(/\\/g, "/")}`}
                      alt="User"
                      className="object-cover w-full h-full"
                    />
                    <Avatar.Fallback className="bg-second-bg text-gold w-full h-full flex items-center justify-center">
                      {profile?.name?.charAt(0).toUpperCase() || "U"}
                    </Avatar.Fallback>
                  </Avatar.Root>
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="end"
                  className="w-56 border-gold/30 bg-dark p-1 z-50"
                >
                  <DropdownMenu.Label className="text-gold px-2 py-1 text-sm">
                    Il mio account
                  </DropdownMenu.Label>
                  <DropdownMenu.Separator className="bg-gold/20 my-1 h-px" />

                  <DropdownMenu.Item asChild>
                    <Link
                      to="/profilo"
                      className="cursor-pointer px-2 py-1 flex items-center gap-2 text-sm text-gray-400 hover:text-white hover:bg-gold/10"
                    >
                      <Person className="h-4 w-4" /> {profile.name}
                    </Link>
                  </DropdownMenu.Item>
                  {/* <DropdownMenu.Item asChild>
                    <Link
                      to="/mod"
                      className="cursor-pointer px-2 py-1 text-sm text-gray-400 hover:text-white  hover:bg-gold/10"
                    >
                      Le mie mod
                    </Link>
                  </DropdownMenu.Item> */}
                  <DropdownMenu.Item asChild>
                    <Link
                      to="/Creations"
                      className="cursor-pointer px-2 py-1 flex text-sm text-gray-400 hover:text-white  hover:bg-gold/10"
                    >
                      Le mie creazioni
                    </Link>
                  </DropdownMenu.Item>

                  {isAdmin && (
                    <>
                      <DropdownMenu.Separator className="bg-gold/20 my-1 h-px" />
                      <DropdownMenu.Item asChild>
                        <Link
                          to="/admin"
                          className="cursor-pointer px-2 py-1 flex items-center gap-2 text-sm text-gold hover:bg-gold/10"
                        >
                          <Gear className="h-4 w-4" /> Admin
                        </Link>
                      </DropdownMenu.Item>
                    </>
                  )}

                  <DropdownMenu.Separator className="bg-gold/20 my-1 h-px" />
                  <DropdownMenu.Item
                    className="cursor-pointer px-2 py-1 text-sm flex text-destructive hover:bg-destructive/10 hover:bg-gold/10"
                    onClick={logoutAccount}
                  >
                    <BoxArrowRight className="mr-2 h-4 w-4" /> Esci
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <List className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 py-3 bg-second-bg">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block py-2 text-base font-medium ${
                  isActive(item.href)
                    ? "text-gold"
                    : "text-gray-400 hover:text-gold"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {!profile ? (
              <Button
                variant="outline"
                className="w-full mt-3 border-gold/30 text-gold hover:bg-gold/10 hover:text-gold"
              >
                ACCEDI
              </Button>
            ) : (
              <>
                <Link
                  to="/profilo"
                  className="block py-2 text-base font-medium text-gray-400 hover:text-gold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profilo
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="block py-2 text-base font-medium text-gray-400 hover:text-gold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <Button
                  variant="outline"
                  onClick={logoutAccount}
                  className="w-full mt-3 border-gold/30 text-gold hover:bg-gold/10 hover:text-gold"
                >
                  Esci
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default OniriumNavbar;
