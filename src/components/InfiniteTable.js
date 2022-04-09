import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// components
import { Table } from "antd";

// style
import TableStyle from "styles/TableStyle";

// hook
import { useVT } from "virtualizedtableforantd4";

function InfiniteTable({
  columns,
  dataSource,
  total,
  rowKey,
  onScroll,
  scroll,
  loading,
}) {
  const [isContinue, setIsContinue] = useState(false);

  useEffect(() => {
    if (dataSource.length > 0) {
      setIsContinue(dataSource.length < total);
    }
  }, [dataSource.length]);

  const [vt] = useVT(
    () => ({
      onScroll: ({ isEnd }) => {
        console.debug({ isContinue, isEnd });
        if (isEnd && isContinue) {
          onScroll(dataSource);
        }
      },
      scroll,
    }),
    [dataSource, isContinue]
  );

  return (
    <TableStyle>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={rowKey}
        components={vt}
        loading={loading}
        pagination={false}
        scroll={scroll}
        size="small"
      />
    </TableStyle>
  );
}

InfiniteTable.defaultProps = {
  dataSource: [],
  rowKey: "key",
  onScroll: (record) => {},
  loading: false,
};

InfiniteTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataSource: PropTypes.array,
  total: PropTypes.number.isRequired,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onScroll: PropTypes.func,
  loading: PropTypes.bool,
  scroll: PropTypes.object,
};

export default InfiniteTable;
