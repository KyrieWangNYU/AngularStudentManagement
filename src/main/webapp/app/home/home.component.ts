import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, Principal, Account } from 'app/core';
import { CourseService } from 'app/shared/service/CourseService';
import { CourseDto } from 'app/shared/model/course-dto.model';
import { CourseWithTNDto } from 'app/shared/model/courseWithTN-dto.model';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    classeNameNeedToReg: string;
    courseName: string;
    courseLocation: string;
    courseContent: string;
    teacherId: number;
    course: CourseDto = {
        courseName: '',
        courseLocation: '',
        courseContent: '',
        teacherId: null
    };

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private courseService: CourseService
    ) {}

    courses: CourseDto[] = [];

    coursesWithTN: CourseWithTNDto[] = [];

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    getAllCourses() {
        debugger;
        this.courseService.getCourseInfo().subscribe(curDto => {
            if (!curDto) {
                this.courses = [];
            } else {
                this.courses = curDto;
            }
        });
    }

    getAllCoursesWithTN() {
        this.courseService.getCourseInfoWithTN().subscribe(curDto => {
            if (!curDto) {
                this.coursesWithTN = [];
            } else {
                this.coursesWithTN = curDto;
            }
        });
    }

    // registerCourse(courseName) {
    //
    // }

    clearAllCourses() {
        this.courses = [];
    }

    clearAllCoursesWithTN() {
        this.coursesWithTN = [];
    }

    addCourseToStudent() {
        const courseName = 'temp';
        this.courseService.addCourseToStudent(courseName, currentUserCredential);
    }

    addCourse() {
        this.course.courseName = this.courseName;
        this.course.courseContent = this.courseContent;
        this.course.courseLocation = this.courseLocation;
        this.course.teacherId = this.teacherId;
        this.courseService.add(this.course).subscribe();
    }

    deleteCourse(courseName: string) {
        this.courseService.delete(courseName).subscribe();
    }
}
