const mongoose = require("mongoose");
// const connection = mongoose.connect('mongodb://localhost/myintern', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('Connected to MongoDB ...'))
// .catch(err => console.error('Could not connect to MongoDB:27017', err));
const connection =  mongoose.connect("mongodb+srv://WeFive:koolwal@wefive.e2tcv.mongodb.net/WeFive?retryWrites=true&w=majority",
{ useNewUrlParser: true, useCreateIndex:true}).then(()=>{
    console.log("DB Connected")
}).catch(err => {
    console.log(err);
})
mongoose.set('useCreateIndex', true);

module.exports = [].concat(connection);
