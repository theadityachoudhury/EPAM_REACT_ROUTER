import { useEffect } from "react";
import Button from "../../common/Button/Button"
import "./EmptyCourseList.css"

const EmptyCourseList = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      // Re-enable scrolling when the component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className="emptyCourseList__container">
      <div className="emptyCourseList__body">
        <h1 className="emptyCourseList__heading">Your List Is Empty</h1>
        <p>Please use 'Add New Course' button to add your first course</p>
        <div className="emptyCourseList__body__button">
          <Button title="Add New Course" onClick={() => { }} />
        </div>
      </div>
    </div>
  )
}

export default EmptyCourseList