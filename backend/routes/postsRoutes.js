const express = require ('express')
const router = express.Router()
const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null,'uploads/')
//     },
//     filename: (req,file,cb) =>{
//         const suffix =Date.now()
//         cb(null,suffix+'-'+file.originalname)
//     }
// })
const storage = multer.memoryStorage()
const upload = multer({storage})

const { getPosts,setPost,updatePost,deletePost} = require ('../controllers/postController')
const {protect} = require('../middleware/authMiddleware')
router.post('/', upload.single('image'), protect, setPost)

router.route('/').get(protect,getPosts)
router.route('/:id').put(protect,updatePost).delete(protect,deletePost)



module.exports = router