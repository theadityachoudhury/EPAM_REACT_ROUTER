import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import "./CreateCourse.css";
import { mockedAuthorsList, mockedAuthorsListType, mockedCoursesList, mockedCoursesListType } from "../../constants";
import AuthorItem from "./components/AuthorItem/AuthorItem";
import { useState } from "react";
import { v4 } from "uuid";
import { getCourseDuration } from "../../helpers/getCourseDuration";
import { useNavigate } from "react-router";

const CreateCourse = () => {
    const navigate = useNavigate();

    const [AuthorsList, setAuthorsList] = useState<mockedAuthorsListType[]>(mockedAuthorsList);
    const [CourseAuthors, setCourseAuthors] = useState<mockedAuthorsListType[]>([]);
    const [newAuthor, setNewAuthor] = useState<mockedAuthorsListType>();
    const [courseData, setCourseData] = useState<mockedCoursesListType>({ id: v4(), title: "", description: "This is demo content\n Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", creationDate: new Date().toLocaleDateString(), duration: 0, authors: [] });
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        duration: "",
        authors: ""
    });

    const handleAddAuthor = (author: mockedAuthorsListType) => {
        //remove author from AuthorsList
        setAuthorsList(AuthorsList.filter((item) => item.id !== author.id));
        //add author to CourseAuthors
        CourseAuthors.push(author);
        setCourseData({ ...courseData, authors: [...courseData.authors, author.id] });
    }

    const handleRemoveAuthor = (author: mockedAuthorsListType) => {
        //remove author from CourseAuthors
        setCourseAuthors(CourseAuthors.filter((item) => item.id !== author.id));
        //add author to AuthorsList
        AuthorsList.push(author);
    }

    const handleAddNewAuthor = () => {
        if (newAuthor) {
            console.log(newAuthor);
            setAuthorsList([...AuthorsList, newAuthor]);
            setNewAuthor(undefined);
            mockedAuthorsList.push(newAuthor);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "authors") {
            setNewAuthor({ id: v4(), name: value });
        } else {
            if (name === "duration") {
                if (parseInt(value) <= 0) {
                    setErrors({ ...errors, duration: "Duration must be greater than 0" });
                    return
                } else {
                    setErrors({ ...errors, duration: "" });
                }
            }
            setCourseData({ ...courseData, [name]: value });
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formIsValid = true;
        const newErrors = { title: "", description: "", duration: "", authors: "" };

        if (!courseData.title || courseData.title.trim() === "" || courseData.title.trim().length < 2) {
            newErrors.title = "Title is required";
            formIsValid = false;
        }
        if (!courseData.description || courseData.description.trim() === "" || courseData.description.trim().length < 2) {
            newErrors.description = "Description is required";
            formIsValid = false;
        }
        if (courseData.duration <= 0) {
            newErrors.duration = "Duration must be a positive number";
            formIsValid = false;
        }
        if (CourseAuthors.length === 0) {
            newErrors.authors = "At least one author is required";
            formIsValid = false;
        }

        setErrors(newErrors);

        if (formIsValid) {
            mockedCoursesList.push(courseData);
            console.log("Course Data Submitted:", courseData);
            alert("Course Created Successfully");
            //reset the form
            setCourseData({ id: v4(), title: "", description: "", creationDate: new Date().toLocaleDateString(), duration: 0, authors: [] });
            navigate("/courses");
        } else {
            console.log("Form validation failed");
        }
    }

    return (
        <div className="courseForm__container">
            <h1 className="container">
                Course Edit/Create page
            </h1>

            <form className="container space-y-2" onSubmit={handleSubmit}>
                <div className="courseForm">
                    <h2>Main Info</h2>
                    <div className="CourseForm__mainInfo">
                        <Input label={
                            {
                                show: true,
                                text: "Title"
                            }
                        } type="text" onChange={handleChange}
                            metaData={
                                {
                                    placeholder: "Enter Title",
                                    name: "title",
                                    error: errors.title,
                                    value: courseData.title
                                }
                            } />

                        <Input label={
                            {
                                show: true,
                                text: "Description"
                            }
                        } type="textarea" onChange={handleChange}
                            metaData={
                                {
                                    placeholder: "Enter Description",
                                    name: "description",
                                    error: errors.description,
                                    value: courseData.description
                                }
                            } />


                        <h2>Duration</h2>
                        <div className="courseForm__duration">

                            <div>
                                <Input label={
                                    {
                                        show: true,
                                        text: "Duration"
                                    }
                                } type="number" onChange={handleChange}
                                    metaData={
                                        {
                                            placeholder: "Enter Duration",
                                            name: "duration",
                                            error: errors.duration,
                                            value: courseData.duration.toString()
                                        }
                                    } />
                            </div>
                            <p><strong>{getCourseDuration(courseData?.duration)}</strong> hours</p>


                        </div>

                        <div>
                            <div className="flex">
                                <div className="min-w-50 flex-grow">
                                    <h2>Authors</h2>
                                    <div className="flex space-x-3">
                                        <Input label={
                                            {
                                                show: true,
                                                text: "Authors"
                                            }
                                        } type="text" onChange={handleChange}
                                            metaData={
                                                {
                                                    placeholder: "Enter Authors",
                                                    name: "authors",
                                                    error: errors.authors,
                                                }
                                            } />
                                        <div className="w-full py-7">
                                            <Button title="Create Author" onClick={handleAddNewAuthor} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-2xl font-semibold">Course Authors</h3>
                                    <div>
                                        {CourseAuthors.length > 0 ? CourseAuthors.map((author) => <AuthorItem key={author.id} authorName={author.name} onDeleteClick={() => handleRemoveAuthor(author)} />) : <p>Author's list is empty</p>}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2>Author's List</h2>
                                {AuthorsList.map((author) => (
                                    <AuthorItem
                                        key={author.id}
                                        authorName={author.name}
                                        onAddClick={() => handleAddAuthor(author)} // Pass the author object here
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end space-x-2">
                    <Button title="Cancel" onClick={() => { }} />
                    <Button title="Create Course" type="submit" />
                </div>
            </form>
        </div>
    )
}

export default CreateCourse