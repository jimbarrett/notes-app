import Link from "next/link";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div
      className={`w-full flex justify-between p-4 mb-12 ${styles.mainHeader}`}
    >
      <div>
        <Link href="/">Advocate Notes Tracker</Link>
      </div>
    </div>
  );
};

export default Header;
