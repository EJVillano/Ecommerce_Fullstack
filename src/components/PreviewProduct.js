import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PreviewProduct(props) {
  const { breakPoint, data } = props;
  const { _id, name, description, price } = data;

  const imageSrc = `./images/${name}.jpg`;
  

  return (
    <Col xs={12} md={breakPoint}>
      <Card className="cardHighlight">
        <Card.Img variant="top" src={imageSrc} alt="" />
        <Card.Body>
          <Card.Title className="text-center">
            <Link to={`/products/${_id}`}>{name}</Link>
          </Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <h5 className="text-center">₱{price}</h5>
          <Link className="btn btn-dark d-block" to={`/products/${_id}`}>
            Details
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
}