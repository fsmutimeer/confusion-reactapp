import React,{Component} from "react";
import { Card, CardImg,CardText, CardBody, CardTitle,Button,Modal,ModalHeader,ModalBody } from "reactstrap";
import {Breadcrumb,Row,Col,Label, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import { LocalForm,Control,Errors } from "react-redux-form";
import { Loading } from './LoadingComponent';

// Comment Form
const required = (value)=>value && value.length;
const maxLength = (len)=>(value)=> !(value) || (value.length <= len);
const minLength = (len)=>(value)=>value && (value.length >=len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModelOpen:false
        }

        this.toggleModel = this.toggleModel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
toggleModel(){
    this.setState({
        isModelOpen:!this.state.isModelOpen
    })
}

handleSubmit(values){
    this.toggleModel();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
}

    render(){
        return(
            <div>
            <Button outline onClick={this.toggleModel}><span className='fa fa-pencil' />Submit Comment</Button>
            <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModel}>
                <ModalHeader toggle={this.toggleModel}>Submit Comment</ModalHeader>
                <ModalBody>

                           <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                              <Row className='form-group'>
                                  <Label htmlFor='rating' md={12}>
                                    Rating
                                  </Label>
                                  <Col md={12}>
                                  <Control.select 
                                  model='.rating' 
                                  name='rating'
                                  className='form-control' >

                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>

                                  </Control.select>
                                  </Col>
    

                              </Row>
                              <Row className='form-group'>
                                  <Label htmlFor='author' md={12}>
                                      Your Name
                                  </Label>
                                  <Col md={12}>
                                  <Control.text 
                                     model='.author'
                                    id='author' 
                                    name='author'
                                    className='form-control'
                                    placeholder='Your Name'
                                    validators={{
                                        required,
                                        minLength:minLength(3),
                                        maxLength:maxLength(15)

                                    }}
                                    />
                                    <Errors 
                                    model='.author'
                                    className='text-danger'
                                    show='touched'
                                    messages={{
            
                                        require:'This field is Required',
                                        minLength:'Must be greater than 2 characters',
                                        maxLength:'Must be 15 characters or less'
                                    }}
                                    />
                                    </Col>
                              </Row>
                              <Row className='form-group'>
                                  <Label htmlFor='comment' md={12}>
                                      Comment
                                  </Label>
                                  <Col md={12}>
                                  <Control.textarea model='.comment' 
                                  id='comment' 
                                  name='comment'
                                  rows='8'
                                  className='form-control'
                                  placeholder='Write a comment here...'/>
                                  </Col>
                              </Row>
                              <Row className='from-group'>
                                  <Col md={12}>
                                    <Button type='submit' color='primary'>Submit</Button>
                                    </Col>
                              </Row>
                           </LocalForm>
                     
                </ModalBody>
            </Modal>
            </div>
        );
    }
}

function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg top width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle> {dish.name}</CardTitle>
                            <CardText> {dish.description} </CardText>
                        </CardBody>
                    </Card>
                </div>   
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    function RenderComments({comments, addComment, dishId}) {
        if (comments == null) {
            return (<div></div>)
        }
        const cmnts = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(Date.parse(comment.date)))}
                    </p>
                </li>
            )
        })
        return (
            
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                    <CommentForm dishId={dishId} addComment={addComment} />
                </ul>
            </div>
         
        )
    }

const DishDetail = (props)=> {
            
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) 
            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}
                        />
                </div>
                </div>
            );
        else
        return (<div></div>);
         
        }
    
       
  
export default DishDetail;