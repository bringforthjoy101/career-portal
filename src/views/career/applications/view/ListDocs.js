import { ListGroup, ListGroupItem, Card, CardBody, CardHeader } from 'reactstrap'
import { FileText } from 'react-feather'

const ListDocuments = ({ candidate, documents }) => {
	const docs = documents.map((doc) => {
		return (
			<ListGroupItem className="d-flex" key={doc.id}>
				<span className="me-1">
					<FileText size={16} />
				</span>
				<span>{doc.name}</span>
			</ListGroupItem>
		)
	})
	return (
		<Card>
			<CardHeader>{candidate.names.split(' ')[0]}'s Credentials</CardHeader>
			<CardBody>
				<ListGroup>{docs}</ListGroup>
			</CardBody>
		</Card>
	)
}
export default ListDocuments
