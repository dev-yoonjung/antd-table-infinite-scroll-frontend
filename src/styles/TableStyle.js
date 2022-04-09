import styled from "styled-components";

const TableStyle = styled.div`
  .ant-table {
    margin-top: 8px;

    &.ant-table-small {
      font-size: 12px;
    }

    &-thead > tr > th {
      border-bottom: none;
      color: #000;
      font-weight: 500;
    }
  }
`;

export default TableStyle;
