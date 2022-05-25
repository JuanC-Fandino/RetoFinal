import {
    deleteEnrollment,
    getClass,
    getStudent,
    onGetClasses,
    onGetEnrollments,
    onGetStudents,
    saveEnrollment
} from "./firebase.js";

const matriculaForm = document.getElementById("matricula-form");
const studentsDropdown = document.getElementById("students-dropdown");
const classesDropdown = document.getElementById("classes-dropdown");
const enrollmentContainer = document.getElementById("enrollment-container");
const formButton = document.getElementById("btn-matricula-form");


window.addEventListener("DOMContentLoaded", async (e) => {

    onGetClasses((querySnapshot) => {
        
        if (querySnapshot.empty) {
            classesDropdown.disabled = true;
            classesDropdown.innerHTML = `<option value="">No hay clases</option>`;
            formButton.disabled = true;
            return;
        }

        querySnapshot.forEach((doc) => {
            const clase = doc.data();
            const option = document.createElement("option");
            option.value = doc.id;
            option.textContent = clase.title;
            classesDropdown.appendChild(option);
        });

    });

    onGetStudents((querySnapshot) => {
        if (querySnapshot.empty) {
            studentsDropdown.disabled = true;
            studentsDropdown.innerHTML = `<option value="">No hay estudiantes</option>`;
            formButton.disabled = true;
            return;
        }

        querySnapshot.forEach((doc) => {
            const student = doc.data();
            const option = document.createElement("option");
            option.value = doc.id;
            option.textContent = student.name + " " + student.lastName;
            studentsDropdown.appendChild(option);
        });

    });

    onGetEnrollments((querySnapshot) => {

        querySnapshot.forEach((docEnrollment) => {
            const enrollment = docEnrollment.data();
            // Get class name from class id
            getClass(enrollment.classId).then((doc) => {
                // Get student name from student id
                const className = doc.data().title;
                getStudent(enrollment.studentId).then((doc) => {
                    const studentName = doc.data().name + " " + doc.data().lastName;
                    enrollmentContainer.innerHTML += `
                <div class="card card-body mt-2 border-primary">
                    <h5 class="card-title">${className}</h5>
                    <p class="card-text">${studentName}</p>
                    <button class="btn btn-danger btn-delete" data-id="${docEnrollment.id}"">Eliminar</button>
                </div>
            `;
                    const btnsDelete = enrollmentContainer.querySelectorAll(".btn-delete");
                    btnsDelete.forEach((btn) =>
                        btn.addEventListener("click", async ({target: {dataset}}) => {
                            try {
                                await deleteEnrollment(dataset.id);
                                alert("Eliminado correctamente");
                                // Reload page
                                location.reload();
                            } catch (error) {
                                console.log(error);
                            }
                        })
                    );
                });
            });

        });
    });
});

matriculaForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const studentId = matriculaForm["student-id"].value;
    const classId = matriculaForm["class-id"].value;

    try {
        await saveEnrollment(studentId, classId);
        alert("Matricula realizada con éxito");
        matriculaForm.reset();
    } catch (error) {
        console.log(error);
    }
});