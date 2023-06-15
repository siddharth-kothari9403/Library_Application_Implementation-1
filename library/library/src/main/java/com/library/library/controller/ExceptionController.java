package com.library.library.controller;

import com.library.library.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionController {
    @ExceptionHandler(value = UnavailableForGivenDatesException.class)
    public ResponseEntity<Object> unavailableForGivenDates(UnavailableForGivenDatesException unavailableForGivenDatesException){
        return new ResponseEntity<>("Request for this book has already been accepted for some other student for the given dates, hence this request has been deleted.", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = BookNotFoundException.class)
    public ResponseEntity<Object> bookNotFound(BookNotFoundException bookNotFoundException){
        return new ResponseEntity<>("Book does not exist with given id",HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = StudentNotFoundException.class)
    public ResponseEntity<Object> studentNotFound(StudentNotFoundException studentNotFoundException)
    {
        return new ResponseEntity<>("No Student exists with the given ID",HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = BookStudentNotFound.class)
    public ResponseEntity<Object> bookStudentPairNotFound(BookStudentNotFound bookStudentNotFound){
        return new ResponseEntity<>("No Student book pair found having given id", HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = RequestNotFoundException.class)
    public ResponseEntity<Object> requestNotFound(RequestNotFoundException requestNotFoundException){
        return new ResponseEntity<>("No request exists with the given id", HttpStatus.NOT_FOUND);
    }
}