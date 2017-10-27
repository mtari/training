var model = {
    attendances: JSON.parse(localStorage.attendance)
}

var octopus = {
    init: function() {
        view.init();
        // var attendances = JSON.stringify({students: [
        //     {name: "Student 1", attendance: [true, false, true, false, true, false, true, false, true, false, true, false]},
        //     {name: "Student 2", attendance: [true, false, true, false, true, false, true, false, true, false, true, false]},
        //     {name: "Student 3", attendance: [true, false, true, false, true, false, true, false, true, false, true, false]},
        //     {name: "Student 4", attendance: [true, false, true, false, true, false, true, false, true, false, true, false]},
        //     {name: "Student 5", attendance: [true, false, true, false, true, false, true, false, true, false, true, false]},
        //     {name: "Student 6", attendance: [true, false, true, false, true, false, true, false, true, false, true, false]},
        //     {name: "Student 7", attendance: [true, false, true, false, true, false, true, false, true, false, true, false]},
        //     {name: "Student 8", attendance: [true, false, true, false, true, false, true, false, true, false, true, false]}
        // ]});
        // localStorage.attendance = attendances;
    },

    getAttendances: function() {
        return model.attendances;
    },

    getChecked: function(i, j) {
        var checked = false;
        if(model.attendances.students[i].attendance[j]) {
            checked = true;
        }
        return checked;
    },

    countMissing: function(i) {
        var numberOfMissing = 0;
        for(var j = 0; j < model.attendances.students[i].attendance.length; j++) {
            if(model.attendances.students[i].attendance[j]) {
                numberOfMissing++;
            }
        }
        return numberOfMissing;
    },

    updateAttendance: function(attendanceIndex, elemIndex) {
        if(model.attendances.students[attendanceIndex].attendance[elemIndex]) {
            model.attendances.students[attendanceIndex].attendance[elemIndex] = false;
        }
        else {
            model.attendances.students[attendanceIndex].attendance[elemIndex] = true;
        }
        localStorage.attendance = JSON.stringify(model.attendances);
        view.render();
    }
}

var view = {
    init: function() {
        this.thead = document.getElementById("thead");
        this.tbody = document.getElementById("tbody");

        var attendances = octopus.getAttendances();
        console.log(attendances);
        if(attendances != null && attendances.students != null && attendances.students.length > 0) {
            this.createTableHeader();
            this.cerateTableContent();
        }
    },

    createTableHeader: function() {
        //create header
        var attendances = octopus.getAttendances();
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.className = 'name-col'; 
        var textElem = document.createTextNode('Student name');
        th.appendChild(textElem);
        tr.appendChild(th);
        for(var i = 0; i < attendances.students[0].attendance.length; i++) {
            var th = document.createElement("th");
            var textElem = document.createTextNode(i);
            th.appendChild(textElem);
            tr.appendChild(th);
        }
        var th = document.createElement("th");
        var textElem = document.createTextNode('Days Missed');
        th.appendChild(textElem);
        th.className = 'missed-col'; 
        tr.appendChild(th);
        this.thead.appendChild(tr);
    },

    cerateTableContent: function() {
        var attendances = octopus.getAttendances();
        for(var i = 0; i < attendances.students.length; i++) {
            var tr = document.createElement("tr");
            tr.className = 'student'; 
            var td = document.createElement("td");
            td.className = 'name-col';
            var textElem = document.createTextNode(attendances.students[i].name);
            td.appendChild(textElem);
            tr.appendChild(td);
            for(var j = 0; j < attendances.students[i].attendance.length; j++) {
                var td = document.createElement("td");
                td.className = 'attend-col';
                var inputElem = document.createElement("input");
                inputElem.type = "checkbox";
                inputElem.checked = octopus.getChecked(i, j);
                inputElem.addEventListener("click", (function(attendanceIndex, elemIndex){
                    return function() {
                        octopus.updateAttendance(attendanceIndex, elemIndex);
                    }
                })(i, j));
                td.appendChild(inputElem);
                tr.appendChild(td);
            }
            var td = document.createElement("td");
            td.className = 'missed-col';
            var textElem = document.createTextNode(octopus.countMissing(i));
            td.appendChild(textElem);
            tr.appendChild(td);
            this.tbody.appendChild(tr);
        }
    },

    render: function() {
        while(this.thead.firstChild){
            this.thead.removeChild(this.thead.firstChild);
        }
        while(this.tbody.firstChild){
            this.tbody.removeChild(this.tbody.firstChild);
        }

        this.createTableHeader();
        
        this.cerateTableContent();
    }
}

octopus.init();
