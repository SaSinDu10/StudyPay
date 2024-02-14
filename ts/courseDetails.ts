async function getCourseDetails() {
    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams.get('courseId'));

    try {
    const url = "http://155.248.246.152:8081/graphql";
    const query = `
    query Query($getCourseId: ObjectId!) {
        GetCourse(id: $getCourseId) {
          _id
          isActive
          lastPaymentGeneration
          name
          students {
            _id
            isActive
            name
            courses {
              lastPaymentGeneration
            }
          }
        }
      }
          `;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDlkZTQyZGMyYjI3Y2Q4ZjE0MDE3OTEiLCJpYXQiOjE3MDU5MjgxMjN9.k_vS11NYSfhaHHOl7jjUl2t7UCfdTGeythCsk0Hr89g",
      },
      body: JSON.stringify({
        query: query,
        variables:{
            "getCourseId": searchParams.get('courseId')
          }
      }),
    };
    const response = await fetch(url, options);
    const jsonResponse = await response.json();
    console.log("Received data:", jsonResponse);

    const data = jsonResponse.data;
    if (data.GetCourse) {
      const courseDetails: {
        "_id": string,
        "isActive": boolean,
        "lastPaymentGeneration": number,
        "name": string,
        "students":
          {
            "_id": string,
            "isActive": boolean,
            "name": string
          }[],
          "courses": 
            {
              "lastPaymentGeneration": number
            }[]
        }= data.GetCourse;

      const courseName = document.getElementById("coName") as HTMLElement;
      courseName.textContent = courseDetails.name;

      const enrolledStudentTableBody = document.getElementById("coTable")!.children[1];
      courseDetails.students.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><a href="studentProfile.html?studentId=${student._id}">${student._id}</a></td>
          <td>${student.name}</td>
          <td>${student.isActive}</td>
          
      `;
        enrolledStudentTableBody.appendChild(row);
      });

      const studentTableBody = document.getElementById("courseDetailsTable")!.children[1];
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${courseDetails._id}</td>
          <td>${courseDetails.isActive}</td>  
      `;
        studentTableBody.appendChild(row);

      

      console.log("Table loaded successfully.");
    } else {
      console.error("Data received is not in the expected format");
    }
  } catch (error) {
    console.error("Error:", error);
  }

}
getCourseDetails()