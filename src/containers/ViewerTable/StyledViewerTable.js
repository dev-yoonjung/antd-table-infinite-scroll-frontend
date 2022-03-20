import styled from "styled-components";

const StyledViewerTable = styled.div`
  &.viewer-table-container {
    position: relative;

    .viewer-table {
      position: absolute;
      left: 50%;
      top: 50%;
    }
  }
`;

export default StyledViewerTable;
