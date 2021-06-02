import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Menu from '../components/Menu';

import DishDetail from './DishdetailComponent';
import {DISHES} from '../shared/dishes'
import Footer from './FooterComponent';
import {Switch, Route, Redirect} from 'react-router-dom';


class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      dishes:DISHES,
      selectedDish : null
    }
    
  }
  
  onDishSelect(dishId){

    this.setState({
        selectedDish: dishId
    });

}


  render(){
    function HomePage() {
      return(
        <div>
          <h1>Home page</h1>
        </div>
      )
      
    }
  return (
    <div>
      <Header/>
      <Switch>
        <Route path='/home' component={HomePage}/>
        <Route exact path='/menu' component={()=> <Menu dishes={this.state.dishes}/>}/>
       <Redirect to='/home'/>
      
      <DishDetail dish={this.state.dishes.filter((dish)=>dish.id === this.state.selectedDish)[0]}/>
      </Switch>
      <Footer/>
    </div>
  );
}
}

export default Main;
