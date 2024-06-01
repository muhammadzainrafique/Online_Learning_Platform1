import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetStudnetInfoQuery } from '../features/courses/courseApiSlice';
export default function StudentsList() {
  const { id: courseId} = useParams(); 
  const { isLoading, isError, error, isSuccess, data} = useGetStudnetInfoQuery(courseId);
  let content;
  if(isLoading) content = <p>Loading...</p>
  if(isError) content = <p>{error?.data || "something went wrong"}</p>
  if(isSuccess) {
    content = <div>
        <p className="text-md">Students Info</p>
        <table>
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>Student Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.Message.length?data?.Message.map((student, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{student.name}</td>
                            </tr>
                        )): <p>No Student Found Yet</p>}
                    </tbody>
                </table>
    </div>
  }
  return content;
}
