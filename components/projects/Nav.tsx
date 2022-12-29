import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/theme";
import { signOut } from "next-auth/react";
import Dropdown from "@/components/theme/Dropdown";

const Nav = ({ ...props }) => {
  const { user, currentProject } = props;
  const { name, email, image } = user;
  const initials = name
    ? name
        .split(" ")
        .map((n: String) => n[0])
        .join("")
        .toUpperCase()
    : email.slice(0, 2).toUpperCase();
  const avatar =
    image || `https://avatar.vercel.sh/${initials}.svg?text=${initials}`;

  const menuItems = [
    {
      title: "Profile",
      handleClick: () => console.log("Profile"),
    },
    {
      title: "Billing",
      handleClick: () => console.log("Billing"),
    },
    {
      title: "Documentation",
      handleClick: () => console.log("Docs"),
    },
    {
      title: "Changelog",
      handleClick: () => console.log("Changelog"),
    },
    {
      title: "Sign out",
      handleClick: () => signOut(),
    },
  ];

  return (
    <nav className="mx-auto flex flex-wrap items-center justify-between py-6 lg:justify-between">
      <div className="flex w-auto flex-wrap items-center justify-between">
        <Link href="/projects">
          <Logo />
        </Link>

        {currentProject && (
          <div className="ml-5">
            <h3 className="text-lg">{currentProject.name}</h3>
            <p className="text-xs text-light">Updated 2 days ago</p>
          </div>
        )}
      </div>

      <div className="flex items-center text-center">
        <Dropdown
          button={
            <Image
              className="cursor-pointer rounded-full"
              src={avatar}
              alt="avatar"
              height={40}
              width={40}
            />
          }
          items={menuItems}
        />
      </div>
    </nav>
  );
};

export default Nav;