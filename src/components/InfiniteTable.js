import { useState } from "react";
import { Table } from "antd";
import PropTypes from "prop-types";
import { useVT } from "virtualizedtableforantd4";

function InfiniteTable({ onFetch, dataSource, scroll, ...props }) {
  const [page, setPage] = useState(1);

  const [vt] = useVT(
    () => ({
      onScroll: ({ isEnd }) => {
        if (isEnd) {
          console.debug("loadDataByChunk");
          onFetch(page + 1);
          setPage(page + 1);
        }
      },
      scroll: { y: 200 },
    }),
    [dataSource]
  );

  return (
    <Table
      {...props}
      scroll={scroll}
      dataSource={dataSource}
      pagination={false}
      components={vt}
    />
  );
}

InfiniteTable.defaultProps = {
  scroll: { y: 500 },
  onFetch: () => {},
};

InfiniteTable.propTypes = {
  scroll: PropTypes.object,
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFetch: PropTypes.func,
};

export default InfiniteTable;
