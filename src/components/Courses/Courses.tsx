import Button from "../../common/Button/Button"
import "./Courses.css"
import { mockedCoursesList } from "../../constants"
import { formatCreationDate } from "../../helpers/formatCreationDate"
import { getCourseDuration } from "../../helpers/getCourseDuration"
import EmptyCourseList from "../EmptyCourseList/EmptyCourseList"
import CourseCard from "./components/CourseCard/CourseCard"
import SearchBar from "./components/SearchBar/SearchBar"
import { Link } from "react-router-dom"
import { useState } from "react"
import { getAuthorsname } from "../../helpers/getAuthorsname"

const Courses = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCourses, setFilteredCourses] = useState(mockedCoursesList);
    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            setFilteredCourses(mockedCoursesList); // Reset to all courses if search query is empty
        } else {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = mockedCoursesList.filter(course =>
                course.title.toLowerCase().includes(lowercasedQuery) ||
                course.id.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredCourses(filtered);
        }
    };
    const handleSearchInputChange = (query: string) => {
        setSearchQuery(query); // Update search query as the user types
    };
    if (filteredCourses.length === 0) {
        return <EmptyCourseList />
    }
    return (
        <div className="container coursePage__container">
            <div className="coursePage__header">
                <div className="coursePage__searchBar__container">
                    <SearchBar onChange={handleSearchInputChange} onSearch={handleSearch} />
                </div>
                <Link to="/course/add">
                    <Button title="Add New Course" onClick={() => { }} />
                </Link>
            </div>
            <div className="">
                {filteredCourses.map((course) => {
                    return <CourseCard key={course.id} id={course.id} title={course.title} description={course.description} creationDate={formatCreationDate(course.creationDate)} duration={getCourseDuration(course.duration)} authors={getAuthorsname(course.authors)} />
                })}
            </div>
        </div>
    )
}

export default Courses