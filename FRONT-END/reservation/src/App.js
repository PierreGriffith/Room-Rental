import React, { Component } from 'react';
import axios from 'axios'
import './index.css';
import { Container, Section, Button, Hero, Footer, Box, Image, Card, Media, Content, Heading } from 'react-bulma-components/full';

class App extends Component {
    constructor(props) {
        super(props);
    
    this.state = {
      rooms: [],
      order: 2,
      json: [],
    };
  }
    
Capacity()
 {
 
    console.log(this.state.rooms)
     if (this.state.order / 2 === 0) {
     let  rooms = this.state.rooms.sort((a, b) => a.capacity > b.capacity)
     this.setState({ rooms });
     this.setState({ order: this.state.order + 1 })

         
     }
     else {
     let  rooms = this.state.rooms.sort((a, b) => a.capacity < b.capacity)
      this.setState({ rooms });
      this.setState({ order: this.state.order - 1 })
         
     }
 
 }
   
RoomTaken(id, index){
  
    let rooms = this.state.rooms
    
    rooms[index].open = false;
    this.setState({ rooms });
    
    
    axios.post(`http://localhost:3003/room`, {id: id})
        .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
    
Reset()
 {
       axios.post(`http://localhost:3003/reset`)
        .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
} 
    
    
 
GetJson()
 { 
     
      axios.get(`http://localhost:3003/json`)
      .then(res => 
        {     
        const json = res.data
        console.log(json)
        this.setState({ json });
      });   
}
    
    
    
componentDidMount() 
{ 
    axios.get(`http://localhost:3003`)
      .then(res => 
        {       
         const rooms = res.data
         
         this.setState({ rooms });
      });

}
    
    render() {
    return (

    <div>    
        <div> 
        <Box>
            <Heading color="black">
           <strong> Station F </strong>   

        </Heading>
            <Heading subtitle size={6}>
                Room Rental
            </Heading>
        </Box>  
        </div>
        
        <br />

      
       <div class="container">
        
        <Section>
        <Box>
        <Button onClick={this.Capacity.bind(this)} color="primary">
        Capacity
        </Button>
        
        <Button onClick={this.GetJson.bind(this)} color="info">
        JSON
        </Button>

        <Button  onClick={this.Reset.bind(this)} color="danger" href='' >
        <a href="">     Reset</a>
        </Button>
        </Box>
        </Section>

        <Content size="small">
      
             {this.state.json.map((json) =>  
              
              <div>
            <a> 'name:' {json.name} </a>
            <a> '_id' {json._id} </a>  
            <a> 'description' {json.description} </a>  
            <a> 'capacity' {json.capacity} </a>  
    
             </div> 
            )}
            
        </Content>






       <div class="columns is-multiline">
       
          <br />
   
         { this.state.rooms.map((room, index) =>
        
    
                    
        <div class="column is-half">
        <Card>
            
            
        <div class="title-cardz" >
            <Card.Header>
                <Card.Header.Title>
                         {room.name}  
                </Card.Header.Title>
            </Card.Header>
        </div>
            
            <Card.Content>

            <Media>
            <Media.Item renderAs="figure" position="left">
                <Image
                  renderAs="p"
                  size={64}
                  alt="64x64"
                  src="https://i.imgur.com/Xpy7XGI.png"/>
            </Media.Item>
            <Media.Item>
            <Heading size={4}>
            Room for {room.capacity} people
            </Heading>
            <Heading subtitle size={6}>
             <code>equipements :</code>
            { room.equipements.map((furni) =>  
                               
                    " " +   furni.name + ", "      )}
            
            
            </Heading>
            </Media.Item>
            </Media>

            <Content>
                 {room.description}
            </Content>
            </Card.Content>


            <div className={room.open ? 'is-close' : 'is-open'} >
            <Card.Footer >           
                <Card.Footer.Item onClick={() => {
                        
                    this.RoomTaken(room._id, index) }} >
                  {room.open ? 'Take it' : 'Not Available'}
                </Card.Footer.Item>
            </Card.Footer>
            </div>

        </Card>
        
        </div>
   
                )}
  
       
            
            
            
        </div>
        </div>
        <br />
        <br />
        
        <Hero>
        <Hero.Head renderAs="header" />
      
        
        <Hero.Footer>
            <Footer>
                <Container>
                    <Content style={{textAlign: "center"}}>
                        <p> <strong> Station F © </strong> </p>
                    </Content>
                </Container>
            </Footer>
          </Hero.Footer>
        </Hero>
        
        
        
        
    </div>
    
    );
  }
}

export default App;
