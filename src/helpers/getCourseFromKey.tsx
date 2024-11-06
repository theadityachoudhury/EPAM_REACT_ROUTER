import { mockedCoursesList } from "../constants"

export const getCourseFromKey = (courseKey: string) => { 
    const course = mockedCoursesList.find(course => course.id === courseKey);
    return course;
}