import { apiSlice } from "../../app/api/apiSlice";


const courseApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        allCourses:builder.query({
            query:()=>"/course/all",
            providesTags:['Course']
        }),
        newCourse:builder.mutation({
            query:({data, instructorId})=>({
                url:`/course/new?id=${instructorId}`,
                method:'POST',
                body:data,
            }),
            invalidatesTags:['Course']
        }),
        addToCart:builder.mutation({
            query:(data)=>({
                url:'/course/add-to-cart',
                body:data,
                method:'PATCH',
            }),
            invalidatesTags:['Course']
        }),
        getCourse:builder.query({
            query:(courseId)=>`/course/${courseId}`,
            providesTags:['Course']
        }),
        deleteCourse:builder.mutation({
            query:(courseId)=>({
                url:`course/${courseId}`,
                method:'DELETE'
            }),
            invalidatesTags:['Course']
        }),
        addLecture:builder.mutation({
            query:({data, courseId, instructorId})=>({
                url:`/course/addNewLecture/${courseId}?id=${instructorId}`,
                method:'POST',
                body:data
            }),
            invalidatesTags:['Course']
        }),
        getLecture:builder.query({
            query:({lectureId, courseId})=> `/course/lecture/${lectureId}?id=${courseId}`,
            providesTags:['Course']
        }),
        deleteLecture:builder.mutation({
            query:({lectureId, courseId})=>({
                url:`/course/lecture/${lectureId}?id=${courseId}`,
                method:'DELETE'
            }),
            invalidatesTags:['Course']
        }),
        getInstructorCourses:builder.query({
            query:(id)=>`/course/instructor-courses?id=${id}`,
            providesTags:['Course']
        }),
        getEnrolledCourse:builder.query({
            query:(studentId)=> `course/enrolled-courses?id=${studentId}`,
            providesTags:['Course']
        }),
        getAllCategories:builder.query({
            query:()=>"/course/all-categories",
            providesTags:['Course']
        }),
        getCoursesByCategory:builder.query({
            query : (category)=> `/course/courses-by-category?category=${category}`,
            providesTags:['Course']
        }),
        getStudnetInfo:builder.query({
            query:(courseId)=>`/course/courses/studentInfo?courseId=${courseId}`
        }),
        updateCourse:builder.mutation({
            query:({courseId, data})=>({
                url:`/course/update-course/${courseId}`,
                method:'PUT',
                body:data
            }),
            invalidatesTags:['Course']
        }),
        updateLecture:builder.mutation({
            query:({lectureId, data})=>({
                url:`course/lecture/${lectureId}`,
                method:'PUT',
                body:data
            }),
            invalidatesTags:['Course']
        })

    })
})

export const {
    useAddLectureMutation,
    useAllCoursesQuery,
    useDeleteCourseMutation,
    useDeleteLectureMutation,
    useGetCourseQuery,
    useGetLectureQuery,
    useNewCourseMutation,
    useGetInstructorCoursesQuery,
    useAddToCartMutation,
    useGetEnrolledCourseQuery,
    useGetAllCategoriesQuery,
    useGetCoursesByCategoryQuery,
    useGetStudnetInfoQuery,
    useUpdateCourseMutation,
    useUpdateLectureMutation
} = courseApiSlice;