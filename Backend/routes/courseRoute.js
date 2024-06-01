const router = require('express').Router();
const courseController = require('../controllers/coursesController');
const { authCheck, authInsturctor, authSubscriber } = require('../middlewares/authMiddleware');
const sigleUpload = require('../middlewares/multer');

router.route('/courses/studentInfo').get(courseController.getStudentsInfo)
router.route('/update-course/:id').put(authCheck, authInsturctor, courseController.updateCourseDetails)
router.route('/new').post( authCheck, authInsturctor, sigleUpload, courseController.createNewCourse);
router.route('/all').get(courseController.getAllCourses);
router.route('/add-to-cart').patch(courseController.addCourseToCart);
router.route('/instructor-courses').get( courseController.getInstructorsCourse)
router.route('/enrolled-courses').get( courseController.getStudentsEnrolledCourses)
router.route('/all-categories').get( courseController.allCategories)
router.route('/courses-by-category').get( courseController.getCoursesByCategory)

router.route('/addNewLecture/:id').post( authCheck, authInsturctor,sigleUpload, courseController.addLecture);
router.route('/:id')
    .get(courseController.getCourse)
    .delete( authCheck, authInsturctor, courseController.deltedCourse)
router.route('/lecture/:id')
    .get(authCheck, authSubscriber, courseController.getCourseLecture)
    .put(authCheck, authInsturctor, courseController.updateLectureDetails)
    .delete( authCheck, authInsturctor, courseController.deleteLecture)

module.exports = router;