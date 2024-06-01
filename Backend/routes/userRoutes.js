const router = require('express').Router();
const userController = require('../controllers/userController');
const { authCheck, adminAuth, authSubscriber } = require('../middlewares/authMiddleware');

router.route('/getAll').get(authCheck,adminAuth, userController.allUsers);
router.route('/updateRole/:id').patch(authCheck,adminAuth,userController.updateUserRole)
router.route('/changePassword/:id').patch(authCheck,userController.changePassword);
router.route('/cahngeProfilePhoto/:id').patch(authCheck,userController.changeProfilePhoto);
router.route('/addToPlaylist/:id').patch(authCheck, authSubscriber, userController.addToPlaylist);
router.route('/removeFromPlaylist/:id').patch( authCheck, authSubscriber,userController.removeFromPlaylist);
router.route('/forgetPassowrd').patch(userController.forgetPassowrd);
router.route('/resetPassword').patch(userController.resetPassword);

router.use(authCheck)
router.
    route('/:id')
    .get( userController.getUser)
    .patch(userController.updateProfile)

module.exports = router;