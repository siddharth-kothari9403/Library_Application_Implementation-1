import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { getCurrentUser, logout } from './services/auth_services';
import { useEffect, useState } from 'react';
import LoginForm from './components/loginForm';
import Home from './components/home';
import BoardUser from './components/BoardUser';
import BoardAdmin from "./components/BoardAdmin";
import SignupStudent from "./components/SignupStudent";
import SignupAdmin from "./components/SignupAdmin";
import BooksList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import BookSaveForm from "./components/BookSaveForm";
import BookUpdateForm from "./components/BookUpdate";
import UpdateStudent from "./components/StudentUpdateForm";
import StudentList from "./components/StudentList";
import StudentDetails from "./components/StudentDetails";
import RequestList from "./components/RequestList";
import BookStudentList from "./components/BookStudentList";
import BookRequestForm from "./components/BookRequestForm";
import RequestDetails from "./components/RequestDetails";
import BookStudentDetails from "./components/BookStudentDetails"

function App() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [book, setBook] = useState(null);
  const [student, setStudent] = useState(null);
  const [request, setRequest] = useState(null);
  const [bookStudent,setBookStudent] = useState(null);
  const resolveLogin = () => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsAdmin(user.user.roles[0].name === "ADMIN");
      setIsStudent(user.user.roles[0].name === "STUDENT");
    }
  };

  const Applogout = () => {
    logout();
    setCurrentUser(null);
    setIsAdmin(false);
    setIsStudent(false);
  }

  useEffect(() => {
    resolveLogin();
  }, []);
  
  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Library
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {isAdmin && (
              <>
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
              <li className="nav-item">
              <Link to={"/booksSave"} className="nav-link">
                Save a Book
              </Link>
            </li>
            </>
            )}

            {isStudent && (
              <>
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User Board
                  </Link>
                </li>
              </>
            )}

            {currentUser ? (
            <li className="nav-item">
              <Link to={"/books"} className="nav-link">
                Books
              </Link>
            </li>
            
            ): null}

            {isAdmin && (
              <>
                <li className="nav-item">
                  <Link to={"/allRequests"} className="nav-link">
                    Requests
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/students"} className="nav-link">
                    Students
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/bookStudentList"} className="nav-link">BookStudents</Link>
                </li>
              </>

            )}

          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              
              {isAdmin && (
                <li>
                  <a href = "/registerAdmin" className="nav-link">
                    Register New Admin
                  </a>
                </li>
              )}

              {isStudent &&(
                <>
                <li className="nav-item">
                  <Link to={"/requestsForStudent"} className="nav-link">
                    Pending Requests
                  </Link>
                </li>


                <li className="nav-item">
                  <Link to={"/bookStudentByStudent"} className="nav-link">
                    Issued Books
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/studentDetail"} className="nav-link">
                    Profile
                  </Link>
                </li>
                </>   
              )}

              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={Applogout}>
                  Log out
                </a>
              </li>

            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/registerStudent"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginForm setCurrentUser = {setCurrentUser} setIsAdmin = {setIsAdmin} setIsStudent = {setIsStudent} setStudent={setStudent}/>} />
            <Route path="/registerStudent" element={<SignupStudent />} />
            <Route path="/registerAdmin" element={<SignupAdmin />} />
            <Route path="/books" element={<BooksList setBook={setBook}/>}/>
            <Route path="/moreInfo" element={<BookDetails book={book} isStudent={isStudent} isAdmin={isAdmin} setBook={setBook}/>} />
            <Route path="/booksSave" element={<BookSaveForm setBook={setBook}/>}/>
            <Route path="/booksUpdate" element={<BookUpdateForm book={book} setBook={setBook}/>}/>
            <Route path="/students" element={<StudentList setStudent={setStudent}/>}/>
            <Route path="/updateStudent" element={<UpdateStudent student={student} setStudent={setStudent}/>} />
            <Route path="/studentDetail" element={<StudentDetails student={student} isStudent={isStudent} isAdmin={isAdmin} setStudent={setStudent}/>}/>
            <Route path="/bookRequest" element={<BookRequestForm student={student} book={book}/>}/>
            <Route path="/allRequests" element={<RequestList choice={1} request={request} setRequest={setRequest}/>} />
            <Route path="/requestDetails" element={<RequestDetails request={request} isStudent={isStudent} isAdmin={isAdmin} />} />
            <Route path="/requestsForBook" element={<RequestList choice={2} id={book} setRequest={setRequest}/>}/>
            <Route path="/bookStudentDetail" element={<BookStudentDetails bookStudent={bookStudent} isAdmin={isAdmin}/>}/>
            <Route path="/bookStudentList" element={<BookStudentList setBookStudent={setBookStudent} choice={1}/>}/>
            <Route path="/bookStudentByStudent" element={<BookStudentList setBookStudent={setBookStudent} choice={2} id={student}/>}/>
            <Route path="/bookStudentByBook" element={<BookStudentList setBookStudent={setBookStudent} choice={3} id={book}/>}/>
            <Route path="/requestsForStudent" element={<RequestList choice={3} id={student} request={request} setRequest={setRequest}/>}/>
            <Route path="/user" element={<BoardUser />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
