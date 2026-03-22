const express = require("express");
const app = express()
const imgSize = require("image-size")
const fs = require("fs")

//---- mongoDB connection -----
const MongoPw = process.env['mongopw']
const mongo= require("mongoose")

const url = `mongodb+srv://adrian:${MongoPw}@rockpaperscissors.q1iotus.mongodb.net/photo`
mongo.connect(url).then((err)=>{
	console.log("connected to mongo")
});

//----- multer library and storage setup-----
const multer = require("multer")
	
const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,'./uploads')
  },
  filename: (req,file,cb)=>{
    const uniqueSuffix = Date.now() + "--" + file.originalname.replace(/\s/g, '')
    cb(null, uniqueSuffix)
  }
})
const upload = multer({ storage: storage})

//---mongoose schemas and model ----
const photoSchema = new mongo.Schema({
  name: String,
  description: String,
  location: String,
  fileName: String,
  height: Number,
	width: Number,
  date: {type:Date, default: Date.now}
})
const photoModel = new mongo.model("images", photoSchema, "images")


// ----- global middlewares-----
app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/uploads"))

app.use(express.urlencoded({extended: false}))
app.use(express.json()) // used to parse json data in req.body
app.set("view engine", "ejs")



// ----- Routes ------
app.get("/", async (req,res)=>{
	console.log("--------")
	//Step1: retrieve all the photo documents from mongodb (verify datatype)
	//Step2: pass the photo data into the render function
	//Step3: use the forloop in ejs to render a bunch of <img> tags
						
  var photos = await photoModel.find({})

  if (photos.length != 0){
		var fileName = photos[0].fileName

	}

  res.render("index", {photos: photos, file:fileName } )
	
})

app.post("/upload", upload.single('ImgFile'), (req,res)=>{
	var dimensions = imgSize(req.file.path)

	/* if the user left out the height & width in the form
 			we can default the display size of the image to 
			a factor of the orginal size.
 	*/
	console.log(req.body)
  var myImgWidth = req.body.ImgWidth
  var myImgHeight = req.body.ImgHeight
	console.log("-----")
	console.log(req.body.ImgWidth)
	console.log(req.body.ImgHeight)
	
	console.log("Orginal desired size:", myImgWidth, myImgHeight )

	if (req.body.ImgHeight == null && req.body.ImgWidth == null ) {
		myImgWidth = dimensions.height 		
    myImgHeight = dimensions.width  
  }
  //if user puts 1 value, scale image down/up based on ratio of original image
  else if (req.body.ImgHeight != null && req.body.ImgWidth == null) {
    var scale = dimensions.height / dimensions.width
    myImgWidth = Math.round(req.body.ImgHeight * scale)
		
  }else if (req.body.ImgWidth != null && req.body.ImgHeight == null){
		var scale = dimensions.width/ dimensions.height
    myImgHeight = Math.round(req.body.ImgWidth * scale)
	}

	console.log("UPDATED desired size:", myImgWidth, myImgHeight )

	var image = new photoModel({
	  name: req.body.ImgName,
	  description: req.body.ImgDesc,
	  location: req.body.ImgLoc,
	  fileName: req.file.filename,		
    height: myImgHeight,
    width: myImgWidth
	})
  image.save()

  res.redirect("/") //reload page after upload
})

app.get("/delete/:id", (req, res)=>{
  let id = req.params.id
  photoModel.findByIdAndRemove(id).then((result)=>{
    if (result.fileName != ""){
      try{
        fs.unlinkSync("./uploads/"+result.fileName)
        res.redirect("/") //send user back home
      }catch(error){
        console.log("ERROR: ",error," while attempting to remove image")
        res.redirect("/") //send user back home
      }
    }
  }).catch((err)=>{
    console.log("internal error:",err)
    res.json({"message":"Got an internal error while removing an image"})
    
  })
})

app.patch("/update/:id", (req, res)=>{
  let id = req.params.id
	console.log(req.body)
	console.log(id)
  photoModel.findOneAndUpdate({_id:id}, req.body).then()
	res.end()
})

app.listen()