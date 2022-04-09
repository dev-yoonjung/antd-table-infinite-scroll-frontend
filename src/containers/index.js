import { useState, useEffect } from "react";

// component
import DocProps from "components/DocProps";
import InfiniteTable from "components/InfiniteTable";

// style
import ContainerStyle from "styles/ContainerStyle";

// constants
import { columns, dataSource } from "constants";
const COUNT = 10;

const Container = () => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setData(dataSource.slice(0, COUNT));
    setTimeout(() => setLoaded(true), 1000);
  }, []);

  const onScroll = (record) => {
    setLoaded(false);
    const nextLastIndex = record.length + COUNT;
    setData(dataSource.slice(0, nextLastIndex));
    setTimeout(() => setLoaded(true), 1000);
  };

  return (
    <ContainerStyle>
      <h1>ANT-DESIGN TABLE WITH INIFINITE SCROLL</h1>
      <section>
        <DocProps />
      </section>
      <section>
        <InfiniteTable
          columns={columns}
          dataSource={data}
          total={dataSource.length}
          onScroll={onScroll}
          scroll={{ y: 300 }}
          loading={!loaded}
        />
      </section>
    </ContainerStyle>
  );
};

export default Container;
