var express    = require('express');      
var app        = express();                  
var bodyParser = require('body-parser');
var axios = require('axios');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3003;         
var router = express.Router();               


const mongoose = require('mongoose');
var db = mongoose.connect('mongodb://root:root@ds145283.mlab.com:45283/pcmongallet');
var Room_mongo = require("./models/room");



/*       GLOBAL DES ROOMS                  */
let rooms = {
    all_rooms : [],
    json_rooms: '',
    
    set_room : function (e)
    {
        this.json_rooms = e
        this.update_room(this.json_rooms.rooms)
        
        
    },
    
    update_room : function (rooms) 
    { 
       rooms.forEach(function(curr_room) 
       {     
           Room_mongo.find({name : curr_room.name}, function(err, res) {         
               if (res.length == 0) 
                   {
                   var tmp_room = new Room_mongo({
                         name:  curr_room.name,
                         open:  true,
                         description: curr_room.description,
                         capacity: curr_room.capacity,
                         equipements: curr_room.equipements,
                         createdAt: curr_room.createdAt ,
                         updatedAt: curr_room.updatedAt, 
                        })
                     tmp_room.save(function (err, data) {
                            if (err) console.log("echec de la sauvegarde" + err);
                                else console.log('Sauvegardé ', data ); 
                     });
             
                   
                   
                   }
            })
        })
    } 
}


async function getRooms() 
{
  try {
    const response = await axios.get('http://online.stationf.co/tests/rooms.json');
        rooms.set_room(response.data)
  } catch (error) {
    console.error(error);
  }
}

getRooms();











router.get('/', function(req, res) {
      Room_mongo.find({}, function(err, room) {
    res.json(room);
  });
});


router.post('/room', function(req, res) {
    var id = req.body.id
    Room_mongo.findOneAndUpdate({ _id: id }, {$set:{open:false}},function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
    });
});

router.post('/reset', function(req, res) {
    Room_mongo.find({}, function(err, room) {
        for (var i = 0; i < room.length; i++)
        {
            Room_mongo.findOneAndUpdate({_id : room[i]._id }, {$set: {open: true}}, function (err, doc) {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
            });
        }
    });
});

router.get('/json', function(req, res) {
    Room_mongo.find({open: false}, function(err, room) {
        res.json(room)
    });
});




app.use(router);
app.listen(port);
console.log('Magic happens on port ' + port);
