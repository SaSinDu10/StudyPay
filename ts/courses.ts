function showCreateCourseDialog() {
  const createDialog = document.getElementById(
    "createDialog"
  ) as HTMLDialogElement;
  createDialog.showModal();
}

function closeCreateCourseDialog() {
  const createDialog = document.getElementById(
    "createDialog"
  ) as HTMLDialogElement;
  createDialog.close();
}

function createCourse() {
  const courseName = document.getElementById("courseName") as HTMLInputElement;
  closeCreateCourseDialog();
  addCourse(courseName.value);
  
}

async function getCourses() {
  try {
    const url = "http://155.248.246.152:8081/graphql";
    const query = `
            query Query {
                GetCourses {
                    name
                    _id
                    isActive
                    lastPaymentGeneration
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
      }),
    };
    const response = await fetch(url, options);
    const jsonResponse = await response.json();
    console.log("Received data:", jsonResponse);

    const data = jsonResponse.data;
    if (data.GetCourses) {
      const courses: {
        _id: string;
        isActive: boolean;
        name: string;
        lastPaymentGeneration: number;
      }[] = data.GetCourses;

      const coursesTableBody = document.getElementById("myTable")!.children[1];
      courses.forEach((course) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td><a href="courseDetails.html?courseId=${course._id}">${course._id}</a></td>
        <td>${course.name}</td>
        <td>${course.isActive}</td>
        <td>${new Date(course.lastPaymentGeneration).toLocaleString()}</td>
        
    `;
        coursesTableBody.appendChild(row);
      });

      console.log("Table loaded successfully.");
    } else {
      console.error("Data received is not in the expected format");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
getCourses();

async function addCourse(courseName: string) {
  try {
    const url = "http://155.248.246.152:8081/graphql";
    const query = `
      mutation Mutation($course: CourseInput!) {
        AddCourse(course: $course)
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
        variables: {
          course: { name: courseName },
        },
      }),
    };
    const response = await fetch(url, options);
    const jsonResponse = await response.json();
    console.log("Received data:", jsonResponse);
    location.reload();

    
  } catch (error) {
    console.error("Error:", error);
  } 
}
