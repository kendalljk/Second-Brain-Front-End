import React from 'react'
import {Container, Row, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image"

const About = () => {
  return (
    <Container className='about-display'>
      <Image fluid={true} roundedCircle={true} id='photographer-photo' src='https://scontent.fhio3-1.fna.fbcdn.net/v/t31.18172-8/30171013_1894271660593510_4070662013302374982_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=VDdKi-ZT0ZUAX9AugcY&_nc_ht=scontent.fhio3-1.fna&oh=00_AfC51zvGh38ShlOnATgmyOR78rnTHsVn5eiicchmeMtiew&oe=649DD939'
        alt='fictional pet photographer'/>
      <h2 className='text-center'>Brian Koch</h2>
      <Row className='col-md-8'>
        <p>Brian Koch is a professional photographer known for his captivating images of landscapes and wildlife spanning across America, Africa, Asia, and Europe. His photography transports viewers to stunning locations and allows them to connect with the natural world.</p>
      </Row>
      <Row className='col-md-8'>
        <p>With a keen eye for composition and a deep appreciation for nature, Brian captures the beauty and diversity of settings across continents. From the vast plains of Africa to the mystical temples of Asia and the charming villages of Europe, his photographs showcase the unique character of each place. Through his travels, Brian has immersed himself in different cultures, gaining insights and documenting the rich tapestry of our world. His photographs serve as a visual exploration of our planet's rich natural and cultural heritage.</p>
      </Row>
      <Row className='col-md-8'>
        <p>Brian's love for wildlife is evident in his images, which depict animals in their natural habitats. Whether it's the majestic elephants of Africa, the elusive tigers of Asia, or the graceful deer of Europe, he captures their essence and reveals the wonders of the animal kingdom. With a passion for photography and a commitment to capturing the essence of landscapes and wildlife, Brian Koch continues to inspire viewers with his evocative images. His work invites us to appreciate the beauty and interconnectedness of our global environment.</p>
      </Row>
    </Container>
  )
}

export default About