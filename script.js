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
})

function SGT() {
    var name = '';
    var student_course = '';
    var student_grade = null;
    var self = this
    this.student_id = null;
    this.student_list = [];
    $('.btn-success').on('click', ()=>{
        name = $('#studentName').val()
        student_course =$('#course').val();
        student_grade = $('#studentGrade').val();
        this.add_student();
        $('.avgGrade').text(this.update_list_average());
        this.add_student_dom();
    });

    $('.cancel').on('click', function() {
        $('#studentName').val('');
        $('#course').val('');
        $('#studentGrade').val('');
    });

    $('.server').on('click', function(){
        var key = 'api_key: 5ukJMiUivX'
        $.ajax({
            url: 'http://s-apis.learningfuze.com/sgt/get',
            data: {
                api_key: '5ukJMiUivX'
            },
            method: 'post',
            dataType: 'json',
            success: function(response) {
                debugger;
                for (var i = 0; i < response.data.length; i++) {
                    self.student_list.push(response.data[i]);
                    self.add_student_dom();
                }
            }
        })
    })

    this.add_student = ()=>{
        this.student = {
            id: this.student_id,
            name: name,
            course: student_course,
            grade: student_grade
        };
        this.student_list.push(this.student);
    };

    this.update_list_average = function() {
        this.average = null;
        for(var i = 0; i < this.student_list.length; i++) {
            this.average += parseInt(this.student_list[i].grade)
        }
        return parseInt(this.average/this.student_list.length);
    };

    this.add_student_dom = function() {
        for(var i = this.student_list.length - 1; i <  this.student_list.length; i++) {
            var table_row = $('<tr>', {
                id: this.student_id++
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
            // var vJSbutton = document.createElement('BUTTON');
            // vJSbutton.classList.add('btn');
            // vJSbutton.classList.add('btn-danger');
            // vJSbutton.innerText = 'Delete';
            var jQueryButton = $('<button>', {
                class: "btn btn-danger",
                text: 'Delete'
            });
            var delete_info = jQueryButton[0];
            delete_info.student = this.student_list[i];
            // var vanillaJSButton = jQueryButton[0];
            // vanillaJSButton.student = this.student_list[i];
            // table_delete.append(vanillaJSButton);
            table_row.append(table_name);
            table_row.append(table_course);
            table_row.append(table_grade);
            table_row.append(table_delete);
            table_delete.append(jQueryButton);
            $('.student-list').append(table_row);
        }
        $('tr').on('click','.btn-danger',function() {
            debugger
            // console.log($(this).parent('tr').attr('id'))
            // console.log(this.student);
            self.student_list.splice(self.student_list.indexOf($(this.student),1));
            $(this).parents('tr').remove();

        });
    }
}

var sgt = null;