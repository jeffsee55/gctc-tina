import { Static, getStaticPropsForPage } from "../components/page";

export const getStaticProps = (params) => {
  return getStaticPropsForPage({ relativePath: "layer-team.md" });
};

export default Static;
