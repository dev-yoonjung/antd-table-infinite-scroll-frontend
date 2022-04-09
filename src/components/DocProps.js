// components
import { Table, Typography } from "antd";

// style
import TableStyle from "styles/TableStyle";

const DocProps = () => {
  const columns = [
    {
      title: "Property",
      dataIndex: "property",
      key: "property",
      render: (value, row) => {
        const isRequired = row.required;
        return (
          <>
            <Typography.Text strong>{value}</Typography.Text>
            {isRequired && (
              <Typography.Text type="danger">{` *`}</Typography.Text>
            )}
          </>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (value) => {
        if (Array.isArray(value)) {
          return (
            <>
              {value
                .map((item, idx) => (
                  <Typography.Text key={idx} code>
                    {item}
                  </Typography.Text>
                ))
                .reduce((prev, curr) => [prev, " | ", curr])}
            </>
          );
        }

        return <Typography.Text code>{value}</Typography.Text>;
      },
    },
    {
      title: "Default",
      dataIndex: "default",
      key: "default",
      render: (value) =>
        value === "-" ? "" : <Typography.Text code>{value}</Typography.Text>,
    },
  ];

  const data = [
    {
      key: "1",
      required: true,
      property: "columns",
      description: "Columns of table",
      type: "array",
      default: "-",
    },
    {
      key: "2",
      property: "dataSource",
      description: "Data record array to be displayed",
      type: "array",
      default: "[ ]",
    },
    {
      key: "3",
      required: true,
      property: "total",
      description: "Total number of data",
      type: "number",
      default: "-",
    },
    {
      key: "4",
      property: "rowKey",
      description:
        "Row's unique key, could be a string or function that returns a string",
      type: ["string", "function(record): string"],
      default: "key",
    },
    {
      key: "5",
      property: "onScroll",
      description:
        "Function that excute when the next data exist and scrolls touch the bottom of the table",
      type: "function",
      default: "(record) => { }",
    },
    {
      key: "6",
      property: "loading",
      description: "Loading status of table",
      type: "bool",
      default: "false",
    },
    {
      key: "7",
      property: "scroll",
      description: "Whether the table can be scrollable",
      type: "object",
      default: "-",
    },
  ];

  return (
    <>
      {data.findIndex((item) => item.required) > -1 && (
        <Typography.Text
          type="danger"
          style={{ marginBottom: 10, fontSize: "12px" }}
        >
          * 표시는 필수 항목
        </Typography.Text>
      )}
      <TableStyle>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ position: ["none", "none"] }}
          size="small"
        />
      </TableStyle>
    </>
  );
};

export default DocProps;
