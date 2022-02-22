import { ListGroup, ListGroupItem, Card, CardBody, CardHeader, Row, Col } from 'reactstrap'
import { FileText } from 'react-feather'

const ListDocuments = ({ candidate, documents }) => {
	const docs = documents.map((doc) => {
		return (
			<Col md={4} key={doc.id}>
				<ListGroupItem className="d-flex" tag="a" href={doc.file}>
					<span className="me-1">
						<FileText size={16} />
					</span>
					<span>{doc.name}</span>
				</ListGroupItem>
			</Col>
		)
	})
	return (
		<Card>
			<CardHeader>{candidate.names.split(' ')[0]}'s Credentials</CardHeader>
			<CardBody>
				<Row>{docs}</Row>
			</CardBody>
		</Card>
	)
}
export default ListDocuments
