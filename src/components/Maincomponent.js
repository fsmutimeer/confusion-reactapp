import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Menu from '../components/Menu';
import ContactComponent from './ContactComponent';


import DishDetail from './DishdetailComponent';

import Footer from './FooterComponent';
import {Switch, Route, Redirect,withRouter} from 'react-router-dom';
import About from './AboutComponent';
import {connect} from 'react-redux';

const mapStattoProps = state=>{
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {
  constructor(props){
    super(props);  
  }

  render(){
    const HomePage =()=> {
      return(
        <div>
          <Home 
            dish={this.props.dishes.filter((dish)=>dish.featured)[0]}
            promotion={this.props.promotions.filter((promo) => promo.featured) [0]}
            leader={this.props.leaders.filter((lead)=>lead.featured)[0]} />
        </div>
      )
    }
const DishWithId = ({match}) => {
  return (
    <DishDetail
    dish={this.props.dishes.filter((dish)=>dish.id ===parseInt(match.params.dishId,10))[0]}
    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
    />
  );

}

  return (
    <div>
      <Header/>
      <Switch>
        <Route path='/home' component={HomePage}/>
        <Route exact path='/menu' component={()=> <Menu dishes={this.props.dishes}/>}/>
        <Route path='/menu/:dishId' component={DishWithId} />
        <Route exact path='/contactus' component={ContactComponent}/>
        <Route exact path='/aboutus' component={()=><About leaders={this.props.leaders}/>} />
       <Redirect to='/home'/>
      
      <DishDetail dish={this.props.dishes.filter((dish)=>dish.id === this.props.selectedDish)[0]}/>
      </Switch>
      <Footer/>
    </div>
  );
}
}

export default withRouter(connect(mapStattoProps)(Main));
