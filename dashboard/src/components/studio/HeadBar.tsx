import { Link } from "react-router-dom";
import { Col, Row,Input, Layout } from 'antd';
const { Search } = Input;
const { Header } = Layout;
const onSearch = (value: string) => console.log(value);

const Widget = () => {
  return (
	<Header className="header">
		<Row>
			<Col flex="100px">
				<Link to="/">studio</Link>
			</Col>
			<Col flex="auto">
				<Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
			</Col>
			<Col flex="200px">登录信息</Col>
		</Row>		
	</Header>

  );
};

export default Widget;
