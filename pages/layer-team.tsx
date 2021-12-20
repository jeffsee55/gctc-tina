import React from "react";
import ReactDOM from "react-dom";
import * as yup from "yup";
import { Markdown } from "../components/markdown";
import { Form2, Toggle, Text } from "../components/form";
import { Header2 } from "../components/header";
import { Footer } from "../components/footer";
import { tenK, fiveK, halfMarathon, marathon } from "../data/paces";

import { Static, getStaticPropsForPage } from "../components/page";

export const getStaticProps = (params) => {
  return getStaticPropsForPage({ relativePath: "layer-team.md" });
};

export default Static;
