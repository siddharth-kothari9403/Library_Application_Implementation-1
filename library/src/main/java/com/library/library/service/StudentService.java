package com.library.library.service;

import com.library.library.dao.StudentDAO;
import com.library.library.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
public class StudentService {
    private StudentDAO studentDAO;

    @Autowired
    public StudentService(StudentDAO studentDAO) {
        this.studentDAO = studentDAO;
    }

    public Student findStudentById(Integer id){
        return studentDAO.getStudentById(id);
    }

    public List<Student> findAll(){
        return studentDAO.findAllStudents();
    }

    public void saveStudent(Student student){
        studentDAO.saveStudent(student);
    }

    public void deleteStudent(Integer id){
        studentDAO.deleteStudentById(id);
    }

    public Student updateStudent(Student student){
        return studentDAO.updateStudent(student);
    }
}
