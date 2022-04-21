import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// component
import DocProps from "components/DocProps";
import InfiniteTable from "components/InfiniteTable";

// style
import ContainerStyle from "styles/ContainerStyle";

// constants
import { columns, size } from "constants";

const Container = () => {
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getTotal()
      .then((total) => setTotal(total))
      .then(() => getData({ lastIndex: 0, size }).then((data) => setData(data)))
      .then(() => setLoaded(true));
  }, []);

  const onScroll = (record) => {
    setLoaded(false);
    const nextLastIndex = record[record.length - 1].rank;
    getData({ lastIndex: nextLastIndex, size })
      .then((nextData) => setData((prevData) => [...prevData, ...nextData]))
      .then(() => setLoaded(true));
  };

  const getTotal = useCallback(async () => {
    const { data } = await axios.get(
      "http://localhost:8080/api/music/rank/count"
    );

    return data;
  }, []);

  const getData = useCallback(async (payload) => {
    const { data } = await axios.get(
      "http://localhost:8080/api/music/rank",
      { params: payload },
      {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return data;
  }, []);

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
          total={total}
          onScroll={onScroll}
          scroll={{ y: 300 }}
          loading={!loaded}
          rowKey="id"
        />
      </section>
    </ContainerStyle>
  );
};

export default Container;
