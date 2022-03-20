import { useState, useEffect, useCallback, useMemo } from "react";
import InfiniteTable from "components/InfiniteTable";
import { defaultAxios } from "utils/AxiosFunc";
import StyledViewerTable from "./StyledViewerTable";

function ViewerTable() {
  const [dataSource, setDataSource] = useState([]);
  const [infinity, setInfinity] = useState(false);

  const onFetch = (pageNum) => {
    defaultAxios
      .get({
        url: `/user?page=${pageNum}`,
      })
      .then(({ data }) => {
        if (data || data.length > 0) {
          const newDataSource = data.map((user) => ({
            key: user.id,
            name: user.name,
            dept: user.dept,
            position: user.position,
          }));
          setDataSource(dataSource.concat(newDataSource));
          setInfinity(true);
        } else {
          setInfinity(false);
        }
      });
  };

  const columns = useMemo(() => [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "부서",
      dataIndex: "dept",
      key: "dept",
    },
    {
      title: "직급",
      dataIndex: "position",
      key: "position",
    },
  ]);

  useEffect(() => onFetch(1), []);

  return (
    <StyledViewerTable className="viewer-table-container">
      <div className="viewer-table">
        <InfiniteTable
          onFetch={onFetch}
          infinity={infinity}
          columns={columns}
          dataSource={dataSource}
        />
      </div>
    </StyledViewerTable>
  );
}

export default ViewerTable;
