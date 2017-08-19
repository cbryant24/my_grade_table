/**
 * Define all global variables here
 */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
// var student_array = [];

/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */


// var id_array = [student_name, student_course, student_grade];
/**
 * addClicked - Event Handler when user clicks the add button
 */
// function addClicked() {
//     addStudent();
// }
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
// function cancelClicked() {
//
// }
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
// function addStudent() {
//     debugger;
//     var student = {
//         studentName: id_array[0],
//         studentCourse: id_array[1],
//         studentGrade: id_array[2]
//     };
//     student_array.push(student);
//     console.log(student);
// }
/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */

/**
 * updateData - centralized function to update the average and call student list update
 */

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */

/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */


/**
 * Listen for the document to load and reset the data to the initial state
 */

$(document).ready(function(){
    sgt = new SGT();
    $('#studentGrade').val('90');
    $('#studentName').val('chris');
    $('#course').val('math');
    sgt.load_students();
})

function SGT() {
    var name = '';
    var student_course = '';
    var student_grade = null;
    this.student_name = '';
    this.student_grade = null;
    this.student_course = '';
    this.student_id = null;
    this.student_list = [];
    $('.btn-success').on('click', (function(sgt){
        return function(){
            sgt.student_name = $('#studentName').val();
            sgt.student_course =$('#course').val();
            sgt.student_grade = $('#studentGrade').val();
            sgt.add_student();
            $('.avgGrade').text(sgt.update_average());
            sgt.add_student_dom();
            sgt.send_student();
        }
    })(this));

    $('.cancel').on('click', function() {
        $('#studentName').val('');
        $('#course').val('');
        $('#studentGrade').val('');
    });

    $('.server').on('click', (function(sgt){
        $('tbody').empty();
        return function(){return sgt.load_students()}
    })(this));

    $('.modal-footer').on('click', 'button',function(){
        $('#myModal .modal-body').empty();
        debugger
        $('.btn-danger span').removeClass('fa fa-circle-o-notch fa-spin');
    });
    this.add_student = ()=>{
        this.student = {
            id: this.student_list.length <= 0 ? 0:this.student_list[this.student_list.length - 1].id + 1,
            name: this.student_name,
            grade: parseInt(this.student_grade),
            course: this.student_course
        };
        this.student_list.push(this.student);
    };

    this.update_average = function() {
        this.average = null;
        for(var i = 0; i < this.student_list.length; i++) {
            this.average += parseInt(this.student_list[i].grade)
        }
        return parseInt(this.average/this.student_list.length);
    };

    this.add_student_dom = function() {
        $('tbody').empty();
        for(var i = 0; i <  this.student_list.length; i++) {
            var table_row = $('<tr>', {
                id: this.student_list[i].student_id
            });
            var table_name = $('<td>', {
                text: this.student_list[i].name
            });
            var table_course = $('<td>', {
                text: this.student_list[i].course
            });
            var table_grade = $('<td>', {
                text: this.student_list[i].grade
            });
            var table_delete = $('<td>',{

            });
            var delete_button = $('<button>', {
                class: "btn btn-danger",
                text: 'Delete  '
            });
            var delete_info = delete_button[0];
            delete_info.student = this.student_list[i];
            table_row.append(table_name);
            table_row.append(table_course);
            table_row.append(table_grade);
            table_row.append(table_delete);
            table_delete.append(delete_button);
            $('.student-list').append(table_row);
            this.handle_delete(delete_button);
        }
    };

    this.handle_delete = function(element) {
        $(element).on('click',(function(sgt){return function() {
            $(this).off('click');
            var $span_add = $('<span>', {
                class: "fa fa-circle-o-notch fa-spin",
            });
            debugger;
            $(this).append($span_add);
            var the_data = {
                api_key: '5ukJMiUivX',
                student_id: this.student.id
            };
            $.ajax({
                method: 'post',
                url: 'http://s-apis.learningfuze.com/sgt/delete',
                data: the_data,
                dataType: 'json',
                success: (function(btn){return function(response) {
                    if(response.success === true) {
                        console.log('success!');
                        sgt.student_list.splice(sgt.student_list.indexOf($(sgt.student),1));
                        $(btn).parents('tr').remove();
                    } else {
                        for(var i = 0; i < response.errors.length; i++) {
                            var $error_message = $('<p>',{
                                text: response.errors[i]
                            });
                            $('#myModal .modal-body').append($error_message);

                        }
                        $(btn).on('click', sgt.handle_delete(btn));
                        $("#myModal").modal();
                    }
                }})(this),
                error: function(response){
                    console.log(response)
                }
            })
        }}(this)));
    }

    this.load_students = (function(sgt){return function() {
        $.ajax({
            url: 'http://s-apis.learningfuze.com/sgt/get',
            data: {
                api_key: '5ukJMiUivX'
            },
            method: 'post',
            dataType: 'json',
            success: function(response) {
                if (response.success === true) {
                    for (var i = 0; i < response.data.length; i++) {
                        sgt.student_list.push(response.data[i]);
                        sgt.add_student_dom();
                        $('.avgGrade').text(sgt.update_average());
                    }
                } else {
                    var $error_message = $('<p>',{
                        text: response.errors
                    });
                    $('#myModal .modal-body').append($error_message);

                    $("#myModal").modal();
                    console.log(response.errors[0])
                }
            }, error: function(response) {
                console.log(response)
            }
        })
    }})(this);

    this.send_student = function() {
        var the_data = {
            api_key: '5ukJMiUivX',
            id: null,
            name: this.student_name,
            course: this.student_course,
            grade: this.student_grade
        };
        the_data.id = this.student.id;
        $.ajax({
            url: 'http://s-apis.learningfuze.com/sgt/create',
            method: 'post',
            data: the_data,
            dataType: 'json',
            success: function(response) {
                if(response.success === true) {
                    console.log('the push worked, ', response.success);
                    console.log('the new id number is ', response.new_id)
                } else {
                    for(var i = 0; i < response.errors.length; i++) {
                        var $error_message = $('<p>',{
                            text: response.errors[i]
                        });
                        $('#myModal .modal-body').append($error_message);

                    }
                    $("#myModal").modal();
                    console.log(response.errors[0])
                }
            }, error: function(response) {
                console.log(response)
            }
        })
    }
}

var sgt = null;