import { Navigate } from "react-router";
import Button from "../../../../common/Button/Button";
import "./CourseCard.css"
import { useState } from "react";
import { MdOutlineModeEdit, MdDelete } from "react-icons/md";

type CourseCardProps = {
    id: string,
    title: string,
    description: string,
    creationDate: string,
    duration: string,
    authors: string
};
const CourseCard = (courseInfo: CourseCardProps) => {
    const [isNavigate, setIsNavigate] = useState(false);

    const handleCourseClick = () => {
        setIsNavigate(true);
    }

    if (isNavigate) {
        return <Navigate to={`/course/${courseInfo.id}`} />
    }
    return (
        <div className="card__container" id={courseInfo.id} key={courseInfo.id}>
            <h1 className="card__heading">{courseInfo.title}</h1>
            <div className="card__body__container">
                <div className="card__description">
                    <p>{courseInfo.description}</p>
                </div>
                <div className="card__metadata">
                    <div>
                        <div className="card__metadata__item">
                            <span>Authors</span>
                            <span>{courseInfo.authors}</span>
                        </div>

                        <div className="card__metadata__item">
                            <span>Duration</span>
                            <span>{courseInfo.duration}</span>
                        </div>

                        <div className="card__metadata__item">
                            <span>Created</span>
                            <span>{courseInfo.creationDate}</span>
                        </div>
                    </div>

                    <div className="courseCard__button">
                        <Button title="Show Course" onClick={handleCourseClick} />
                        <Button isIconOnly icon={<MdDelete size={20} />} onClick={() => { }} />
                        <Button isIconOnly icon={<MdOutlineModeEdit size={20} />} onClick={() => { }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard