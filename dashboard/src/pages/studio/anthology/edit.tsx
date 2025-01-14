import { useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { Layout } from "antd";

import HeadBar from "../../../components/studio/HeadBar";
import LeftSider from "../../../components/studio/LeftSider";
import Footer from "../../../components/studio/Footer";

const {  Content } = Layout;

const Widget = () => {
	const intl = useIntl();
	const { studioname,anthology_id } = useParams();//url 参数
  return (
	<Layout>
		<HeadBar/>
		<Layout>
			<LeftSider selectedKeys="anthology"/>
			<Content>
				<h2>studio/{studioname}/{intl.formatMessage({ id: "columns.studio.anthology.title" })}/anthology/{anthology_id}</h2>
			</Content>
		</Layout>
		<Footer/>
    </Layout>

  );
};

export default Widget;
