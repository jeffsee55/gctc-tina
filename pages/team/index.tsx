import { Static, getStaticPropsForPage } from "../../components/page";

export const getStaticProps = (params) => {
  return getStaticPropsForPage({ relativePath: "our-team.md" });
};

export default Static;
