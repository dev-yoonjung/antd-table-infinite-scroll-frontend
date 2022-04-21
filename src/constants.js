import { Typography } from "antd";
import { HeartOutlined } from "@ant-design/icons";

export const size = 10;

export const columns = [
  {
    title: "Rank",
    dataIndex: "rank",
    key: "rank",
    width: 80,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Artist",
    dataIndex: "artist",
    key: "artist",
  },
  {
    title: "Album",
    dataIndex: "album",
    key: "album",
  },
  {
    title: "Like",
    dataIndex: "likeCount",
    key: "likeCount",
    width: 100,
    render: (text) => (
      <span>
        <Typography.Text style={{ marginRight: "5px" }}>
          <HeartOutlined />
        </Typography.Text>
        <Typography.Text>
          {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Typography.Text>
      </span>
    ),
  },
];
