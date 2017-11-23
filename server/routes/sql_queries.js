
/**
 * @module get_grades
 * @function
 * @param {string} fb_id user requested id for sql query
 * @returns {string} raw sql query for grades display table
 */
exports.get_grades = (fb_id) => {
    return `SELECT students.first_name, students.last_name, grades.grade, courses.course_name, assignments.assignment_name, grades.id, grades.student_id, grades.course_id, grades.assignment_id FROM students JOIN grades ON students.id = grades.student_id JOIN courses ON courses.id = grades.course_id JOIN assignments ON assignments.id = grades.assignment_id WHERE students.fb_id = ${fb_id}`
}

/**
 * @module get_assignments
 * @function
 * @param {string} fb_id user requested id for sql query
 * @returns {string} raw sql query for assignment name and course name 
 *   record creation, used in modal confirmation
 */
exports.get_assignments = (fb_id) => {
    return `SELECT assignments.id, assignments.assignment_name, courses.course_name, assignments.course_id FROM assignments JOIN courses ON courses.id= assignments.course_id WHERE courses.fb_id=${fb_id}`
}

/**
 * @module get_grades
 * @function
 * @param {string} fb_id user requested id for sql query
 * @returns {string} raw sql query for assignment name, course name, and assignment name for
 *  grades record creation, used in modal confirmation
 */
exports.grade_statement = (student_id, course_id, assignment_id) => {
    return `SELECT students.first_name, students.last_name, assignments.assignment_name, courses.course_name FROM students, courses, assignments WHERE students.id=${student_id}
    AND courses.id=${course_id} AND assignments.id=${assignment_id}`
}