import { Container } from "reactstrap";

const PageHeader = () => {
    return (
      <div className="page-header header-filter">
        <div className="squares square1"/>
        <div className="squares square3"/>
        <div className="squares square7"/>
         <Container>
         <div className="content-center brand">
           <h1 className="h1-seo" data-aos="fade-up" data-aos-offset="0" data-aos-once="true">MILOS</h1>
           <h3 className="d-sm-block" data-aos="fade-up" data-aos-offset="0" data-aos-once="true">
           Create AI Generated Blog Posts From Videos!
           </h3>
         </div>
       </Container>
     </div>
    );
};

export default PageHeader;