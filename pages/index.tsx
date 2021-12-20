import { Static, getStaticPropsForPage } from "../components/page";

export const getStaticProps = (params) => {
  return getStaticPropsForPage({ relativePath: "home.md" });
};
export default Static;
