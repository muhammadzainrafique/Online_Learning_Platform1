const asyncHandler = require('express-async-handler');
const Course = require('../models/course');
const User = require('../models/user');
const createResponse = require('../utils/createRespones');
const getDataUri = require('../utils/dataUri');
const cloudinary = require('cloudinary')
const ObjectId = require('mongoose').Types.ObjectId;
const createNewCourse = asyncHandler ( async (req, res) => {
    const { title, description, category, price } = req.body;
    const { id:instructor } = req.query;
    const file = req.file;
    console.log(file);
    // console.log({ title, description, category });
    if(!instructor) return createResponse(res, false, 'Instructor id is required', 400);
    if(!title || !description || !category || !price) 
        return createResponse(res, false, "All fields are required", 400);
    // verify Instructor
    const user = await User.findById(instructor).lean();
    if(!user || user?.role !== 'instructor')
        return createResponse(res, false, "Instructor not Found", 400);
    // const fileUri = getDataUri(file);
    // const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    // const poster = {
    //     id:myCloud.public_id,
    //     url:myCloud.url
    // }
    
    // creating new course
    const course = await Course.create(
        { title, description, instructor,  category, price}
    ) 
    if(!course) return createResponse(res, false, "Invlaid Data", 400);

    createResponse(res, true, `New Course with title : ${course.title} is created`);
})
const getAllCourses = asyncHandler ( async (req, res) => {
    const courses = await Course.find().select("title description poster instructor price").populate("instructor", "name").lean();
    if(!courses?.length) return createResponse(res, false, "NO Course found", 400);

    createResponse(res, true, courses);
})
const getCourse = asyncHandler ( async (req, res) => {
    const { id } = req.params;
    if( !id ) return createResponse(res, false, "ID is required", 400)
    const course = await Course.findById(id).populate("instructor", "name -_id").lean();
    if(!course ) return createResponse(res, false, "Course Not Found", 400);
    
    createResponse(res, true, course);
})
const addLecture = asyncHandler ( async (req, res) => {
    const { id:instructor } = req.query; //insturctor id
    const { id } = req.params;   //course id
    const { title, description, videoLink } = req.body;
    // const file = req.file;
    if(!title || !description ||  !id || !instructor)
        return createResponse(res, false, "All fields are required");
    // checking for course whether it is found or not
    const course = await Course.findById(id);
    if(!course) return createResponse(res, false, "Course not Found", 400);
    if(course?.instructor.toString() !== instructor ) 
        return createResponse(res, false, "Course not belong to you")
        // const fileUri = getDataUri(file);
        // const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
        // const videoLink = {
        //     id:myCloud.public_id,
        //     url:myCloud.url
        // }
    // const lessons = [...course?.lessons, {title, description, videoLink}];
    
    course.lessons.push({title, description, videoLink});
    await course.save();
    createResponse(res, true, `Lesson with name : ${title} is added`);
})
const getCourseLecture = asyncHandler ( async (req, res) => {
    const { id } = req.params;  //lecture id
    const { id:courseId } = req.query;
    if(!id) return createResponse(res, false, "Lesson ID is required", 400)
    if(!courseId) return createResponse(res, false, "Course Id is required", 400);
    const course = await Course.findById(courseId).lean();
    if(!course ) return createResponse(res, false, "Course Not Found", 400);
    const lecture = course.lessons.length && course?.lessons.filter(lesson => lesson._id.toString() === id);
    if(!lecture?.length) return createResponse(res, false, "Lecture Not Found", 400)
    createResponse(res, true, lecture);
})
const deleteLecture = asyncHandler ( async (req, res) => {
    const { id } = req.params; //lecture id
    const { id:courseId } = req.query;
    if(!id) return createResponse(res, false, "Lesson ID is required", 400)
    if(!courseId) return createResponse(res, false, "Course Id is required", 400);
    const course = await Course.findById(courseId);
    if(!course ) return createResponse(res, false, "Course Not Found", 400);
    // check whether lecture found or not 
    const isLectureFound = course.lessons.findIndex(lesson => lesson._id.toString() === id);
    if(isLectureFound === -1) return createResponse(res, false, " Lecture Not Found", 400);
    // removing lecture form array
    course.lessons.splice(isLectureFound, 1);
    await course.save();
    createResponse(res, true, "Lecture deleted successfully");
})

const deltedCourse = asyncHandler ( async (req, res) => {
    const { id } = req.params;  // Course id 
    if(!id) return createResponse(res, false, "IDs required", 400);
    const course = await Course.findById( id );
    if(!course) return createResponse(res, false, "Course Not Found", 400);
    if(course?.students.length)
        return createResponse(res, false, "Students are enrolled, you can't delete course", 400)
    await Course.deleteOne({_id:id});
    createResponse(res, true, "Course is deleted");
})
const getInstructorsCourse = asyncHandler ( async (req, res) => {
    const {id:instructorId} = req.query;
    if( !instructorId ) return createResponse(res, false, "Insturctor Id is required", 400)
    const instrucotr = await User.findById(instructorId).lean();
    if(!instrucotr) return createResponse(res, false, "Instructor Not Found", 400)
    const instructorObjectId = new ObjectId(instructorId);

    const courses = await Course.aggregate([
        {
            $match: { instructor: instructorObjectId }
        },
        {
            $project: {
                _id: 1,
                title: 1,
                description: 1,
                price: 1,
                studentsCount: { $size: "$students" }, // Get the size of the students 
                numberOfLessons: { $size: "$lessons" }, // Get the size of the lectures array
            }
        }
    ]);
    if(!courses?.length) return createResponse(res, false, { courses:[] })
    createResponse(res, true, {courses} )
})

const addCourseToCart = asyncHandler (async (req, res) => {
    const { courseId, studentId } = req.body;
    if(!courseId || !studentId)
        return createResponse(res, false, "Both course and student id is required", 400)
    const course = await Course.findById(courseId);
    if(!course) return createResponse(res, false, "Course Not Found", 400);
    const student = await User.findById(studentId);
    if(!student)
     return createResponse(res, false, "Student not found", 400)
    if(student.subscription !== 'enrolled')
        return createResponse(res, false, "Subscribe please", 400) 
    // checking wheter course is already in playlist or not
    const isCourseFound = student.playlist.findIndex(course => course.courseId.toString() === courseId);
    if(isCourseFound !== -1) return createResponse(res, false, "Course Already in playlist", 400);
    student.playlist.push({courseId})
    course.students.push(studentId)
    course.save()
    const updatedStudent = student.save();
    if(!updatedStudent)
        return createResponse(res, false, "Something went wrong", 400)
    createResponse(res, true, "Course Added to playlist", 201)
})
const getStudentsEnrolledCourses = asyncHandler(async (req, res) => {
    const { id: studentId } = req.query;
    if (!studentId) 
        return createResponse(res, false, "Student id is required", 400);

    const studentPlaylist = await User.findById(studentId).select("playlist -_id");
    if (!studentPlaylist) 
        return createResponse(res, false, "Student Not found", 400);
    let courses;
    if(studentPlaylist?.playlist.length){
        courses = await Promise.all(studentPlaylist?.playlist?.map(async (course, index) => {
            const courseInfo = await Course.findById(course.courseId).select("title description instructor").populate("instructor", "name -_id");
            // Convert courseInfo to plain JavaScript object
            const courseInfoObject = courseInfo.toObject();
            // Add enrollmentDate to courseInfoObject
            courseInfoObject.enrollmentDate = course.enrollmentDate;
            return courseInfoObject;
        }));
    }
        
    if(!courses?.length) return createResponse(res, true, [], 200)

    createResponse(res, true, courses, 200);
});

const allCategories = asyncHandler( async (req, res) => {
    const categories = await Course.distinct("category");
    createResponse(res, true, categories, 200)
})
const getCoursesByCategory = asyncHandler ( async (req, res) => {
    const {category} = req.query;
    console.log(category);
    if(!category) return createResponse(res, false, "Category is required", 400)
    const courses = await Course.find({category}).populate("instructor", "name -_id").lean();
    if(!courses) return createResponse(res, false, [], 400)
    createResponse(res, true, courses, 200)
})

const getStudentsInfo = asyncHandler ( async (req, res)=>{
    const { courseId } = req.query;
    if(!courseId)
        return createResponse(res, false, "Course Id is required", 400);
    const course = await Course.findById(courseId)
    if(!course)
        return createResponse(res, false, "Course Not Found", 400)
    let studentsIds = course.students;
    const students = await User.find({ _id: { $in: studentsIds } }, 'name -_id');
    if(!students.length)
        return createResponse(res, true, [], 200)
    
    return createResponse(res, true, students, 200);

})

const updateCourseDetails = asyncHandler( async (req, res)=>{
    const { id:courseId} = req.params;
    const { title, description, price, category } = req.body;
    if(!courseId || !title || !description || ! category ||!price)
        return createResponse(res, false, "Course Id and Details are required", 400)
    const course = await Course.findById(courseId);
    if(!course)
        return createResponse(res, false, "Course Not Found", 400)
    course.title = title || course.title
    course.description = description || course.description
    course.price = price || course.price
    course.category = category || course.category
    await course.save();
    createResponse(res, true, "Course Updated Successfully", 200)
})
const updateLectureDetails = asyncHandler( async (req, res)=>{
    const {id:lectureId} = req.params;
    const { title, description, videoLink, courseId } = req.body;
    if(!lectureId || !courseId)
        return createResponse(res, false, "Ids requried", 400)
    if( !title || !description || !videoLink )
        return createResponse(res, false, "All fields are required", 400);
    const course = await Course.findById(courseId);
    if(!course)
        return createResponse(res, false, "Course Not Found", 400);
    if(!course.lessons?.length)
        return createResponse(res, false, "Lecture Not Found", 400);
    const lectureIndex = course.lessons.findIndex(lecture=>lecture._id.toString() === lectureId);
    if(lectureIndex === -1)
        return createResponse(res, false, "Lecture not Found", 400);
    course.lessons[lectureIndex].title = title || course.lessons[lectureIndex].title;
    course.lessons[lectureIndex].description = description || course.lessons[lectureIndex].description;
    course.lessons[lectureIndex].videoLink = videoLink || course.lessons[lectureIndex].videoLink;
    await course.save();
    createResponse(res, true, "Lecture Updated", 200)
})

module.exports = {
    createNewCourse,
    getAllCourses,
    getCourse,
    addLecture,
    deleteLecture,
    deltedCourse,
    getCourseLecture,
    getInstructorsCourse,
    addCourseToCart, 
    getStudentsEnrolledCourses,
    allCategories, 
    getCoursesByCategory,
    getStudentsInfo,
    updateCourseDetails,
    updateLectureDetails
}

