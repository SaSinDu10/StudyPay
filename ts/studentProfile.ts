async function getStudentDetails() {
    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams.get("studentId"));

    try {
        //const url = "http://155.248.246.152:8081/graphql"; 

        const response = await fetch("http://155.248.246.152:8081/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDlkZTQyZGMyYjI3Y2Q4ZjE0MDE3OTEiLCJpYXQiOjE3MDU5MjgxMjN9.k_vS11NYSfhaHHOl7jjUl2t7UCfdTGeythCsk0Hr89g",
        },
        body: JSON.stringify({
            query: `
            query GetStudent($getStudentId: ObjectId!) {
                GetStudent(id: $getStudentId) {
                    _id
                    isActive
                    name
                    courses {
                        _id
                        name
                        isActive
                        lastPaymentGeneration
                    }
                }
            }`,
            variables: {
                getStudentId: searchParams.get("studentId"),
                
            },
        }),
        });
        const jsonResponse = await response.json();
        console.log("Received data:", jsonResponse);

        const data = jsonResponse.data;
        console.log(data);

        if (data.GetStudent) {
        const studentProfile: {
            _id: string;
            isActive: boolean;
            name: string;
            courses: {
            _id: string;
            name: string;
            isActive: boolean;
            lastPaymentGeneration: number;
            }[];
        } = data.GetStudent;

        const studentName = document.getElementById("stName") as HTMLElement;
        studentName.textContent = studentProfile.name;

        const coursesTableBody = document.getElementById("coTable")!.children[1];
        studentProfile.courses.forEach((course) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${course._id}</td>
                <td>${course.name}</td>
                <td>${course.isActive}</td>
                <td>${new Date(course.lastPaymentGeneration).toLocaleString()}</td>
                
            `;
            coursesTableBody.appendChild(row);
        });

        const studentTableBody = document.getElementById("stTable")!.children[1];
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${studentProfile._id}</td>
            <td>${studentProfile.isActive}</td>  
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

async function getPaymentTable() {
    const response = await fetch("http://155.248.246.152:8081/graphql", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDlkZTQyZGMyYjI3Y2Q4ZjE0MDE3OTEiLCJpYXQiOjE3MDU5MjgxMjN9.k_vS11NYSfhaHHOl7jjUl2t7UCfdTGeythCsk0Hr89g",
    },
    body: JSON.stringify({
            query: `
            query GetPayment($studentId: ObjectId!, $courseId: ObjectId!) {
                GetPayments(studentId: $studentId, courseId: $courseId) {
                    _id
                    time {
                        added
                        payed
                    }
                }
            }`,
            variables: {
                studentId: "609de41012b27cd8f1401791",
                courseId: "609de41002b27cd8f1401791",
            },
        }),
    });
    const jsonResponse = await response.json();
        console.log("Received data:", jsonResponse);

        const data = jsonResponse.data;
        console.log(data);

        if (data.GetPayments) {
        const payments: {
            "_id": string,
            "time": {
                "added": number,
                "payed": number
            };
        }[] = data.GetPayments;

        const coursesTableBody = document.getElementById("paymentTable")!.children[1];
        payments.forEach((payment) => {
            const date = new Date(payment.time.added)
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${payment._id}</td>
                <td>${getMonthYear(date)}</td>
                <td>${payment.time.payed}</td>

            `;
            coursesTableBody.appendChild(row);
        });
    }
}
getStudentDetails();

function getMonthYear(date:Date) {
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
}
