import styles from "./Header.module.css";

/* 
Definition and Usage
The <header> element represents a container for introductory content or a set of navigational links.

A <header> element typically contains:

one or more heading elements (<h1> - <h6>)
logo or icon
authorship information

https://www.w3schools.com/tags/tag_header.asp
*/

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Header</h1>
    </header>
  );
};

export default Header;
