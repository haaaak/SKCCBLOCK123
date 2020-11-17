var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countSchema = new Schema({


    name : {
      type : String,
      required : true
    },
    totalCount :{
    type :Number,
    required : true

  }

});


mongoose.model('Counter',countSchema);
