import User from "./user/user";
import ConditionalSearch from "./search/conditional-search";
import ThemeSwitcher from "./theme-switcher";

export default function Header() {
  return (
    <>
      <div className="fixed z-20 top-5 right-5   w-[calc(100%-40px)] xs:w-auto">
        <div className="flex items-start gap-4   bg-primary xs:bg-transparent p-4 xs:p-0 rounded-4xl">
          <ConditionalSearch />
          <ThemeSwitcher />
          <User />
        </div>
      </div>
    </>
  );
}
