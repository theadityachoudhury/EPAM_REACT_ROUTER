import { useState } from "react";
import { Navigate, useParams } from "react-router";
import Button from "../../common/Button/Button";
import { getCourseFromKey } from "../../helpers/getCourseFromKey";
import "./CourseInfo.css";
import { getAuthorsname } from "../../helpers/getAuthorsname";
import { formatCreationDate } from "../../helpers/formatCreationDate";
import { getCourseDuration } from "../../helpers/getCourseDuration";

const CourseInfo = () => {
    const { courseId } = useParams();

    const [isNavigate, setIsNavigate] = useState(false);

    const courseInfo = getCourseFromKey(courseId as string);

    if (!courseInfo) {
        return <Navigate to={`/`} />
    }

    const handleBacktoCourses = () => {
        setIsNavigate(true);
    }

    if (isNavigate) {
        return <Navigate to={`/`} />
    }

    return (
        <div className="container">

            <div className="courseInfo__container">
                <h1 key={courseInfo.id}>{courseInfo.title}</h1>
                <div className="courseInfo">
                    <h2>Description</h2>
                    <div className="courseInfo__body">
                        <p className="courseInfo__desc">{courseInfo.description}</p>
                        <div>
                            {/* vertical line here */}
                            <div className="courseInfo__verticalLine">
                            </div>
                        </div>

                        <div className="courseInfo__metadata">
                            <p><strong>Id :</strong> {courseInfo.id}</p>
                            <p><strong>Duration :</strong> {getCourseDuration(courseInfo.duration)}</p>
                            <p><strong>Created :</strong> {formatCreationDate(courseInfo.creationDate)}</p>
                            <p><strong>Authors :</strong> {getAuthorsname(courseInfo.authors)}</p>
                        </div>


                    </div>
                </div>
                <div className="courseInfo__back">
                    <Button title="Back" onClick={handleBacktoCourses} />
                </div>
            </div>


        </div>
    )
}

export default CourseInfo



