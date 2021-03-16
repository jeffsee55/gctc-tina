import React from "react";
import { Container } from "../../components/dashboard/container";
import { Article } from "../../components/dashboard/article";
import { SimpleList, DataT } from "../../components/dashboard/simple-list";

import jsonData from "../../data/5k-silver-24.json";

const data: DataT[] = jsonData;

export default function Dashboard() {
  return (
    <Container aside={<SimpleList data={data} />}>
      <Article {...data[0]} />
    </Container>
  );
}
