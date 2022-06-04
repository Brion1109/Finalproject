var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var passport = require("passport");
var localStrategy = require("passport-local");
const expressSession = require('express-session');
var passportLocalMongoose = require("passport-local-mongoose");
var Product = require("./models/product");
var Review = require("./models/review");
var Order = require("./models/order");
var User = require("./models/user");
var OrderCount = require("./models/orderCount");
var flash = require("connect-flash");
const csrf = require('csurf');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const MemoryStore = require('memorystore')(expressSession)

dotenv.config();
 		  
var dbURL = process.env.DATABASEURL || 'mongodb://localhost:27017/ohherbs';
mongoose.connect(dbURL, {useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

app.use(cookieParser('random'));

app.use(expressSession({
    secret: "random",
    resave: true,
    saveUninitialized: true,
    // setting the max age to longer duration
    maxAge: 24 * 60 * 60 * 1000,
    store: new MemoryStore(),
}));

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
	secret: "abd",
	resave: false,
	saveUninitialized: false
}));

app.use(csrf());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});
var pindexRoutes = require('./routes/pindex'); 
var indexRouter = require('./routes/index');  
var productsRouter = require('./routes/product');
var newsRouter = require('./routes/news');
var herbsRouter = require('./routes/herbs');
var dietRouter = require('./routes/diet');
var healtbeutyRouter = require('./routes/healtbeuty');
var allherbsRouter = require('./routes/allherbs');
var alldietRouter = require('./routes/alldiet');
var searchRouter = require('./routes/search');
var contactRouter = require('./routes/contact');
var productRoutes = require("./routes/product");
var reviewRoutes = require("./routes/review");
var cartRoutes = require("./routes/cart");
var checkoutRoutes = require("./routes/checkout");
var orderRoutes = require("./routes/order");
var dashorderRoutes = require("./routes/dashorder");


app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/herbs', herbsRouter);
app.use('/news', newsRouter);
app.use('/diet', dietRouter);
app.use('/healtbeuty', healtbeutyRouter);
app.use('/allherbs', allherbsRouter);
app.use('/allherbs/:id', allherbsRouter);
app.use('/search', allherbsRouter);
app.use('/search/:id', allherbsRouter);
app.use('/alldiet', alldietRouter);
app.use('/alldiet/:id', alldietRouter);
app.use('/contact',contactRouter);




app.use(pindexRoutes);
app.use(productRoutes);
app.use(reviewRoutes);
app.use(cartRoutes)
app.use(checkoutRoutes);
app.use(orderRoutes);
app.use(dashorderRoutes);
app.use(require('./routes/pindex.js'));

OrderCount.find({},function(err,orderCountObjects){
	if(orderCountObjects.length==0) {
		OrderCount.create({count: 0});
	}
});

app.listen(process.env.PORT || 8000, process.env.IP);