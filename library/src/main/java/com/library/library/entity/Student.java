package com.library.library.entity;

import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Integer id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "")
    private String studentName;

    @Column(name = "")
    private String email;

    @Column(name = "")
    private String phone;

    public List<Request> getRequests() {
        return requests;
    }

    public void setRequests(List<Request> requests) {
        this.requests = requests;
    }

    public List<BookStudent> getBooks() {
        return books;
    }

    public void setBooks(List<BookStudent> books) {
        this.books = books;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "student", cascade = CascadeType.ALL)
    private List<Request> requests;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "student", cascade = CascadeType.ALL)
    private List<BookStudent> books;

    public Student(String studentName, String email, String phone) {
        this.studentName = studentName;
        this.email = email;
        this.phone = phone;
    }

    public Student (){

    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

}
